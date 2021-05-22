import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, first, shareReplay, tap} from 'rxjs/operators';
import {SERVER_API_URL} from '../../app.constants';

@Injectable()
export class CachingInterceptorService implements HttpInterceptor {
  dontCache = ['account'];
  public store: Record<string, Observable<HttpEvent<any>>> = {};

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const dontAccept = this.dontCache.some((url) => {
      return req.url === SERVER_API_URL + url;
    });
    // console.warn(req.url, (Boolean(req.headers.get('force')) === true));
    // console.warn(req.url, Boolean(req.headers.get('force')));
    if (req.method !== 'GET' || dontAccept || req.headers.get('force') === 'true') {
      if (req.method !== 'GET') {
        this.store = {};
      }
      return next.handle(req);
    }

    // Check if observable is in cache, otherwise call next.handle
    const cachedObservable = this.store[req.urlWithParams] ||
      (this.store[req.urlWithParams] = next.handle(req).pipe(
        // Filter since we are interested in caching the response only, not progress events
        filter((res) => res instanceof HttpResponse),
        // Share replay will cache the response
        shareReplay(1),
      ));
    return cachedObservable.pipe(first());
  }
}

/**
 * Get server response observable by sending request to `next()`.
 * Will add the response to the cache on the way out.
 */
function sendRequest(
  req: HttpRequest<any>,
  next: HttpHandler,
  cache: Map<HttpRequest<any>, HttpResponse<any>>): Observable<HttpEvent<any>> {

  // No headers allowed in npm search request
  // const noHeaderReq = req.clone({headers: new HttpHeaders()});

  return next.handle(req).pipe(
    tap(event => {
      // There may be other events besides the response.
      if (event instanceof HttpResponse) {
        console.warn('oii');
        cache.set(req, event); // Update the cache.
      }
    })
  );
}

function isCacheable(req: HttpRequest<any>): boolean {
  return req.method === 'GET';
}
