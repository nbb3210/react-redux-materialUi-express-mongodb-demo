# pix

## 简介

这是一个图片分享的[Demo](http://182.92.122.144:8888/)采用了以下技术
* [Material-UI](https://github.com/callemall/material-ui/)
* [React](https://facebook.github.io/react/)
* [Redux](https://github.com/reactjs/redux/)
* [Express](http://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [cloudinary](http://cloudinary.com/)

有任何问题和建议欢迎联系
> nbb3210@gmail.com

## 安装

安装依赖项:
```sh
npm install
npm run build
```

启动服务（默认在端口3000）:
```sh
npm start
```

## 开发过程小记

开发工具

* [express应用生成器](http://www.expressjs.com.cn/starter/generator.html)
  
  通过应用生成器工具express可以快速创建一个应用的骨架

* [nodemon](https://github.com/remy/nodemon)

  监听项目代码，代码修改后，服务器自动重启

* [postman](https://www.getpostman.com/)

  模拟HTTP请求的数据发送至服务器

* git

服务端依赖项

前五个依赖项express应用生成器默认包含

* [express](http://expressjs.com/)

  Fast, unopinionated, minimalist web framework for Node.js

* [serve-favicon](https://github.com/expressjs/serve-favicon)

  Node.js middleware for serving a favicon

* [morgan](https://github.com/expressjs/morgan)

  Create a new morgan logger middleware function using the given format and options.

* [cookie-parser](https://github.com/expressjs/cookie-parser)

  Parse Cookie header and populate req.cookies with an object keyed by the cookie names. 

* [body-parser](https://github.com/expressjs/body-parser)

  Parse incoming request bodies in a middleware before your handlers, available under the `req.body` property.

* [mongoose](https://github.com/Automattic/mongoose)

  Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

* [client-sessions](https://github.com/mozilla/node-client-sessions)

  client-sessions is connect middleware that implements sessions in encrypted tamper-free cookies.

* [dotenv](https://github.com/motdotla/dotenv)

  Dotenv is a zero-dependency module that loads environment vaiables from a `.env` file into `process.env`.

* [bluebird](https://github.com/petkaantonov/bluebird)

  Bluebird is a fully featured promise library with focus on innovative features and performance.

* [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

  [How To Safely Store A Password](https://codahale.com/how-to-safely-store-a-password/)

前端依赖项

* [react](https://facebook.github.io/react/)

  React is a JavaScript library for building user interfaces.

* [material-ui](http://material-ui.com/)

  React Components that Implement Google's Material Design.

* [babel](https://github.com/babel/babel/tree/master/packages/babel)

  Turn ES6 code into readable vanilla ES5 with source maps

* [redux](http://redux.js.org/)

  Redux is a predictable state container for JavaScript apps.

* [superagent](https://github.com/visionmedia/superagent)

  SuperAgent is a small progressive client-side HTTP request library, and Node.js module with the same API, sporting many high-level HTTP client features.

* [sha1](https://github.com/pvorb/node-sha1)

  native js function for hashing messages with SHA-1

[Cloudinary](http://cloudinary.com/)

  Cloudinary is the image back-end for web and mobile developers.