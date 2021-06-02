const express = require('express');
const rendertron = require('rendertron-middleware');
const BOTS = rendertron.botUserAgents.concat(
  'googlebot',
  'baiduspider',
  'bingbot',
  'embedly',
  'facebookexternalhit',
  'linkedinbot',
  'outbrain',
  'pinterest',
  'quora link preview',
  'rogerbot',
  'showyoubot',
  'slackbot',
  'twitterbot',
  'vkShare',
  'W3C_Validator',
  'whatsapp'
);
const BOT_UA_PATTERN = new RegExp(BOTS.join('|'), 'i');
const app = express();
const DIST_FOLDER = process.cwd() + '/dist/nebularWok';
console.warn(DIST_FOLDER);
const PORT = process.env.PORT || 8080;
// Serve static assets (images, css, etc.)
app.get('*.*', express.static(DIST_FOLDER));
// Point all other URLs to index.html for our single page app
app.get('*', (req, res) => {
  res.sendFile(DIST_FOLDER + '/index.html');
});
app.use(rendertron.makeMiddleware({
  proxyUrl: 'https://my-rendertron-315600.rj.r.appspot.com/render',
  userAgentPattern: BOT_UA_PATTERN
}));
// Start Express Server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT} from ${DIST_FOLDER}`);
});
