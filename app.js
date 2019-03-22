const express = require('express');
const app = express();
const replay = require('./block/replay')
const fetchAccessticket = require('./interface/ticket')
const sha1 = require('sha1')
const {url}=require('./url/urlId')
//中间件 接收所有请求 

//使用ejs将数据展示到页面上
app.set('views', 'views')
app.set('view engine', 'ejs')
app.get('/index', async (req, res) => {
    const {ticket} = await fetchAccessticket()
    const noncestr = Math.random().toString().slice(2) //必填，生成签名的随机串  toString把数字转为字符串 然后slice截取 掉小数
    const timestamp = Math.round(Date.now() / 1000) //向上取整到秒
    const arr = [
        `noncestr=${noncestr}`, // 必填，生成签名的随机串
        `url=${url}/index`,
        `timestamp=${timestamp}'`, // 必填，生成签名的时间戳
        `jsapi_ticke=${ticket}` // 必填，需要使用的JS接口列表
    ]

    const signature = sha1(arr.sort().join('&'))
    // 必填，签名
    res.render('index', {
        noncestr,
        timestamp,
        signature
    })
})



app.use(replay()) //模块化中间件函数

app.listen(3000, err => {
    if (!err) {
        console.log('服务器启动成功');
    } else {
        console.log(err);
    }
})