/* eslint no-process-env: 0 */

const config = {};

config.env          = process.env.NODE_ENV  || 'development';

config.devPort      = 3001;

config.apiName      = 'katuma-universal';
config.apiVersion   = 'v1';

config.apiPath      = `/api/${config.apiVersion}`;

config.loginCookie  = 'api_login';
config.tokenCookie  = 'api_token';

config.loginHeader  = 'X-User-Email';
config.tokenHeader  = 'X-User-Token';


export default config;
