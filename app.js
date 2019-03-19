const express = require('express');
const sha1 = require('sha1')
const app = express();
const { parseString } = require('xml2js')
const {getuserData,XMLparser,formatting}=require('./block/index')

//中间件 接收所有请求 
app.use(async (req, res) => {
    // console.log(req.query);
    /*
    { 
    signature://微信加密前面 'c4da27e5ccdbe150f59e413f5ca3130627acfb2a',
    echostr: '612966292251671551',//微信后台的随机字符串
    timestamp: '1552980228',//发送请求的时间
    nonce: '1439175072' }  //后台生成的随机数字
  */
    const { signature, echostr, timestamp, nonce } = req.query
    const token = "Tohka319";
    //sort() 方法用原地算法对数组的元素进行排序，
    const sha1Arr = sha1( [token, timestamp, nonce].sort().join(''))
    
    //join()方法将数组中所有元素连接为一个字符串。
    if (req.method === 'GET') { //GET是wx服务器发给开发者服务器的 验证服务器有效性
        if (sha1Arr === signature) {
            res.end(echostr)
            //返回echostr给wx后台 wx才会承认
        } else {
            console.log('error');

        }
    } else if (req.method === 'POST') {
        //POST是客户发给WX服务器 WX服务器转发给开发者服务器的
        if (sha1Arr !== signature) {
            res.end('error')
            return
        }

        const xmlData = await getuserData(req)
     
        const jsData = XMLparser(xmlData);
     
        const useData=formatting(jsData)




        let content = '没吃饭么?声音大点听不见';
        if (useData.Content === '1') {
            content = '你在说锤子?'
        } else if (useData.Content === '2') {
            content = '沟里挂机生死已'
        } else if (useData.Content === '3') {
            content = '批话多'

        }
        let Message = ` 
        <xml><ToUserName><![CDATA[${useData.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${useData.ToUserName}]]></FromUserName>
        <CreateTime>${Date.now()}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${content}]]></Content>
        <MsgId>22233516608304905</MsgId>
        </xml>
        `
        res.send(Message)
    }else{
        res.end('error')
    }

})
app.listen(3000, err => {
    if (!err) {
        console.log('服务器启动成功');
    } else {
        console.log(err);
    }
})