// 测试react配置
// import React, { Component } from "react";
// import ReactDom from "react-dom";
// class App extends Component {
//     render() {
//         return <div>hello world</div>;
//     }
// }
// ReactDom.render(<App />, document.getElementById("app"));



// 测试babel/pollyfill
// const arr = [new Promise(() => { }), new Promise(() => { })];
// arr.map(item => {
//     console.log(item);
// });

// 测试引入图片文件
// import { add } from "@/add";// 因为有resolve.extensions（有默认值），所以不写后缀名也OK
// import logo from "./assets/logo.png";

// const image = new Image();
// image.src = logo;
// console.log(logo);
// document.body.append(image);

// import "./index.less";

// console.log('aaa', add, add(1, 2));

// 测试js tree shaking
import { add } from "./add.js";
add(1, 2);
add(2, 2);
add(3, 2);

