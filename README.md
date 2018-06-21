# component-loading
前端loading组件，具有播放Loading动画效果

使用方法，在你想要播放loading动画的dom上面`new Loading()`绑定一下就好了

Example:

```html
<body>
    .......
    <span id="loading-span"></span>
    ...
</body>
```
js:

```javascript
//创建并绑定dom
let loading = new Loading('#loading-span');

//加载loading动画
loading.show();

//结束loading
setTimeout( loading.hide(), 10000);
```

## 1.1.0

[下载地址(download)](https://github.com/jtiiii/component-loading/releases/download/untagged-0ee4ae58228b49e66be9/loading-1.1.0RLS.zip)
43.9 KB loading-1.1.0RLS.zip

+ 原先的构造方法参数为`new Loading({el: ..})`改为`new Loading(el)`去掉了一层对象包裹部分多余的操作
+ 增加Loading.setJQuery方法
+ 增加loading.bundle.js文件。该文件由webpack打包过，直接附带image和css

## 1.0.0

[下载地址(download)](https://github.com/jtiiii/component-loading/releases/download/v1.0.0RLS/loading-1.0.0RLS.zip)
9.89 KB loading-1.0.0RLS.zip

将组件实现了npm模块化
若是浏览器环境下，引入loading.min.js文件则同时需要引入css和image