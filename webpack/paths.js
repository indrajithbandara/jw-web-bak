var path = require('path');
var fs = require('fs');

// 获取项目根目录
var appDirectory = fs.realpathSync(process.cwd());
// 根据参数生成地址
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

var nodePaths = (process.env.NODE_PATH || '').split(process.platform === 'win32'
  ? ';'
  : ':').filter(Boolean).map(resolveApp);

// 导出webpack打包需要得路径
module.exports = {
  appBuild: resolveApp('build'),
  appRoot: appDirectory,
  appHtml: resolveApp('temphtml.html'),
  appIndexJs: {
    'app': resolveApp('src/app.js'),
    // 'react': ['react','react-dom', 'react-router','react-redux','react-router-redux','redux','iscroll','react-iscroll']
  },
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveApp('node_modules'),
  nodePaths: nodePaths
};
