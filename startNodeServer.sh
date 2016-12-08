#!/bin/bash
set -x

#install nodejs
#check node -v and npm -v
echo "install taobao images for npm"
npm install -g cnpm --registry=https://registry.npm.taobao.org

echo "install presetting for nodejs"
npm install -g babel-cli
npm install -g express
npm install -g mocha
npm install -g mocha-cli
npm install -g should
npm install -g webpack

#check installed commponents
npm list --depth=0 -global

echo "starting node server now............."
cnpm i &&

npm run dll &&
npm run pro &&
npm run server &&

ls
echo "started node server ..."
read -n 1
#end
