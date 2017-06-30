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


Last login: Tue Jun 27 11:17:24 2017 from 192.168.12.66
[root@localhost ~]# npm list --depth=0 -global
/mnt/app/node/lib
├── atool-build@0.9.3
├── babel-cli@6.18.0
├── case-sensitive-paths-webpack-plugin@1.1.4
├── clean-webpack-plugin@0.1.15
├── cnpm@4.5.0
├── express@4.14.0
├── mocha@3.1.2
├── npm@3.10.8
├── pm2@2.4.2
└── webpack@1.13.3

