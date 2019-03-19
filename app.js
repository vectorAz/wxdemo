const express = require('express');
const app = express();
const replay=require('./block/replay')
//中间件 接收所有请求 

app.use(replay()) //模块化中间件函数


app.listen(3000, err => {
    if (!err) {
        console.log('服务器启动成功');
    } else {
        console.log(err);
    }
})