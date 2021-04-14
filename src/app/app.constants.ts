// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application



import {environment} from '../environments/environment';


export const SERVER_API_URL = environment.API_URL;
// export const SERVER_API_KEY = environment.SERVER_API_KEY;
export const SERVER_API_IMAGE_URL = environment.IMAGES_URL;
