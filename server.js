import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// http路由配置
import routerHandle from './server_routes/httpRouters';

const cookieSecret = "zhaoxiang";
const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'html');

console.log(path.join(__dirname, 'Views'));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(cookieSecret));
app.use(express.static(path.join(__dirname, 'build')));
app.use(favicon(path.join(__dirname, '/build/media/', 'favicon.ico')));

routerHandle(app);

// 处理404请求
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 处理500请求

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log('err',err.message);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.log('err2',err.message);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(port);
