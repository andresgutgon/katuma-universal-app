import express      from 'express';
import compressor   from 'compression';
import parser       from 'body-parser';
import cookies      from 'cookie-parser';
import path         from 'path';

import noCache      from './server/noCache';
import errors       from './server/errors';
import logger       from './server/log';
import request      from 'request';

export default (initter, config) => {

  global.__CLIENT__ = false;
  global.__SERVER__ = true;
  global.__DEV__    = config.env !== 'production';

  const app = express();

  const appEnv = app.get('env');

  const rails_url = 'localhost:3000'

  logger(app, appEnv, config.bundle);

  app.use(compressor());
  app.use(parser.json());
  app.use(parser.urlencoded({ extended: true }));
  app.use(cookies());
  app.use(express.static(path.join(__dirname, 'public')));

  app.post('/login', function (req, res) {
    // Call Rails
    request.post(`http://${rails_url}/login`, function (err, response, body) {
      if (err) {
        return res.sendStatus(403);
      }

      req.session.user_id = body;

      res.sendStatus(200);
    });
  })

  app.get('/api/*', function(req, res) {
    // Verify authentication / cookies
    if (!req.session.user_id) {
      return res.sendStatus(403);
    }

    // Call Rails
    var options = {
      method: req.method,
      url: `http://${rails_url}${req.path}`,
      headers: {
        'X-katuma-user-id': req.session.user_id
      }
    };

    request(options, function (err, response, body) {
      if (err) {
        return res.sendStatus(400);
      }

      // Respond with Rails response
      res.send(response.status, response.body);
    });
  });

  app.use('/', noCache, initter);

  app.set('view engine', 'jade');
  app.set('views', path.join(__dirname, 'app'));
  app.use(errors);

  app.set('port', config.appPort);
  app.listen(app.get('port'), function() {
    console.log(`=> 🚀  Express ${config.bundle} ${config.env} server is running on port ${this.address().port}`);  // eslint-disable-line no-console
  });

}
