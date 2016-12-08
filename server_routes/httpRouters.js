// import UserControll from '../controlls/userControll';

export default function httpRouterHandle(app) {
  // 所有的get操作都指向到index.html页面
  app.get('*', function(req, res, next) {
    res.sendfile('./index.html');
  });
}
