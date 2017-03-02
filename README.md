# react-redux-materialUi-express-mongodb-demo

## 简介

这是一个图片分享的[Demo](http://182.92.122.144:8888/)，功能为
* 注册，登录和注销
* 上传图片，查看原图，评论图片，用户可以删除自己上传的图片

采用以下技术
* [Material-UI](https://github.com/callemall/material-ui/)
* [React](https://facebook.github.io/react/)
* [Redux](https://github.com/reactjs/redux/)
* [Express](http://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Cloudinary](http://cloudinary.com/)

Demo尽量采用Restful API

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

  [Express入门教程：一个简单的博客](http://www.tuicool.com/articles/jueARjE)

* [nodemon](https://github.com/remy/nodemon)

  监听项目代码，代码修改后，服务器自动重启

* [postman](https://www.getpostman.com/)

  模拟HTTP请求的数据发送至服务器

* git 

Express框架

* 可以设置中间件来响应HTTP请求

* 定义了路由表用于执行不同的HTTP请求动作

* 可以通过向模板传递参数来动态渲染HTML页面

Express中间件

**中间件**是一个可访问请求对象(`req`)和响应对象(`res`)的**函数**，在Express应用的请求-响应循环里，下一个内联的中间件通常用变量`next`表示。中间件的功能包括:

* 执行任何代码

* 修改请求和响应对象

* 终结请求-响应循环

* 调用堆栈中的下一个中间件

中间件的使用过程中:

* 如果当前中间件没有终结请求-响应循环，则必须调用`next()`方法将控制权交给下一个中间件。

* 没有挂载路径的中间件，应用的每个请求都会执行该中间件

* 中间件是按顺序执行的

服务端依赖项，前五个依赖项express应用生成器默认包含

* [express](http://expressjs.com/)

  Fast, unopinionated, minimalist web framework for Node.js

  基于Node.js 平台,快速、开放、极简的 web 开发框架

* [serve-favicon](https://github.com/expressjs/serve-favicon)

  Node.js middleware for serving a favicon

  处理图标的中间件，将图标缓存于内存中

* [morgan](https://github.com/expressjs/morgan)

  Create a new morgan logger middleware function using the given format and options.

  处理日志的中间件，在控制台输出信息，生产模式下需调整参数

* [cookie-parser](https://github.com/expressjs/cookie-parser)

  Parse Cookie header and populate req.cookies with an object keyed by the cookie names. 

  解析cookie的中间件

* [body-parser](https://github.com/expressjs/body-parser)

  Parse incoming request bodies in a middleware before your handlers, available under the `req.body` property.

  HTTP请求体解析的中间件

* [mongoose](https://github.com/Automattic/mongoose)

  Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

  操作mongodb数据库

* [client-sessions](https://github.com/mozilla/node-client-sessions)

  client-sessions is connect middleware that implements sessions in encrypted tamper-free cookies.

  客户端sessions中间件，加密

* [dotenv](https://github.com/motdotla/dotenv)

  Dotenv is a zero-dependency module that loads environment vaiables from a `.env` file into `process.env`.

  管理环境变量

* [bluebird](https://github.com/petkaantonov/bluebird)

  Bluebird is a fully featured promise library with focus on innovative features and performance.

  实现回调Promise的库

* [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

  [How To Safely Store A Password](https://codahale.com/how-to-safely-store-a-password/)

  用于密码加密的库

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

  ajax API

  ajax的替代品[fetch](https://developer.mozilla.org/en/docs/Web/API/Fetch_API)

* [sha1](https://github.com/pvorb/node-sha1)

  native js function for hashing messages with SHA-1

  sha1加密

云端图片存储[Cloudinary](http://cloudinary.com/)

  Cloudinary is the image back-end for web and mobile developers.

  项目实现中，将图片存储于云端

## 开发心得

react的官方文档摘要

> An element describes what you want to see on the screen.Elements are what components are "made of".

> Components are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.

> All React components must act like pure functions with respect to their props.

> Application UIs are dynamic and change over time. State allows React components to change their output over time in response to user actions, network responses, and anything else.

> state is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it.

> A component may choose to pass its state down as props to its child components

> This is commonly called a "top-down" or "unidirectional" data flow. Any state is always owned by some specific component, and any data or UI derived from that state can only affect components "below" them in the tree.

项目中，将组件分为三种，view，container和layout，

view中大都是无状态的UI组件，参考materialUI，采用function的方式写

container包裹UI组件，负责用户交互，网络响应等，将状态以属性的方式传递给UI组件

layout将各种container以一定的方式进行布局