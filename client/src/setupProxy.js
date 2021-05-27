/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(proxy('/api', { target: 'http://localhost:5000' }));
};