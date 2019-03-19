const { parseString } = require('xml2js')
module.exports = {


    //用来获取用户的消息 返回一个Promise对象
    getuserData(req) {
        return new Promise((resolve, reject) => {
            let xmlData = '';
            req             //data方法可以拿到req上的数据
                //该方法可能触发多次
                .on('data', data => {
                    // console.log(data);

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

                    resolve(xmlData) //返回出去给xmlData 是一个xml数据
                })
        })
    },

    //将XML解析为js对象
    XMLparser(xmlData) {
        let jsData = null;
        parseString(xmlData, { trim: true }, (err, resule) => {
            //去掉首尾空格
            if (!err) {
                jsData = resule
            } else {
                jsData = {}
            }
        })
        return jsData

    },

    //将js对象格式化
    formatting(jsData) {
        const { xml } = jsData;
        let useData = {};
        for (let key in xml) {
            const value = xml[key] //每次遍历都会获得一个对应key的values数组
            useData[key] = value[0]; //去掉[]
            // console.log(value);
        }
        return useData
    }
}