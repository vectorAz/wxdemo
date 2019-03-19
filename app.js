const express = require('express');
const sha1 = require('sha1')
const app = express();
const  {parseString}=require('xml2js')
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
    const sortArr = [token, timestamp, nonce].sort();
    //sort() 方法用原地算法对数组的元素进行排序，
    const sha1Arr = sha1(sortArr.join(''))
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

        //接收到用户发过来的信息
        const xmlData = await new Promise((resolve, reject) => {
            let xmlData = '';
            req             //data方法可以拿到req上的数据
                //该方法可能触发多次
                .on('data', data => {
                    // console.log(data.toString());
                    /*              
                    <xml>
                    <ToUserName><![CDATA[gh_274090634324]]></ToUserName> 开发者微信号
                    <FromUserName><![CDATA[o5xKa1AYe__v8_wz2JlPHts3ZTOY]]  ></FromUserName>                        用户的opeid
                    <CreateTime>1552982620</CreateTime>    发送消息的时间戳
                    <MsgType><![CDATA[text]]></MsgType>    发送消息的类型
                    <Content><![CDATA[1]]></Content>       发送的具体内容
                    <MsgId>22233363259128192</MsgId>       发送消息的id  默认保留三天
                    </xml>
                    */
                    xmlData += data.toString()
                })
                .on('end', () => {
                    console.log(xmlData);

                    resolve(xmlData) //返回出去给xmlData 是一个xml数据
                })
        })
        //将xml格式的xmlData转换为js对象
        let jsData=null;
        parseString(xmlData,{trim:true},(err,resule)=>{

        })


    }

})
app.listen(3000, err => {
    if (!err) {
        console.log('服务器启动成功');
    } else {
        console.log(err);
    }
})