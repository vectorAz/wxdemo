const express = require('express');
const sha1 = require('sha1')
const app = express();
//中间件 接收所有请求 
app.use((req, res) => {
    console.log(req.query);
    /*
    { 
    signature://微信加密前面 'c4da27e5ccdbe150f59e413f5ca3130627acfb2a',
    echostr: '612966292251671551',//微信后台的随机字符串
    timestamp: '1552980228',//发送请求的时间
    nonce: '1439175072' }  //后台生成的随机数字
  */ 
    const { signature,echostr, timestamp, nonce } = req.query
    const token="Tohka319";
    const sortArr=[token, timestamp, nonce ].sort();
    //sort() 方法用原地算法对数组的元素进行排序，
    const sha1Arr=sha1(sortArr.join(''))
    //join()方法将数组中所有元素连接为一个字符串。
    if(req.method==='GET'){ //GET是wx服务器转发给开发者服务器的
        if(sha1Arr===signature){
            res.end(echostr)
            //返回echostr给wx后台 wx才会承认
        }else{
            console.log('error');
            
        }
    }



})
app.listen(3000, err => {
        if (!err) {
            console.log('服务器启动成功');
        } else {
            console.log(err);
        }
    })