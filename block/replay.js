const sha1 = require('sha1')
const { getuserData, XMLparser, formatting } = require('./index')
const documentType = require('./documentType')
const headresponse=require('./headresponse')
const {token}=require('../url/urlId')

module.exports = () => {
    return async (req, res) => {
        const { signature, echostr, timestamp, nonce } = req.query
        //sort() 方法用原地算法对数组的元素进行排序，
        const sha1Arr = sha1([token, timestamp, nonce].sort().join(''))

        //join()方法将数组中所有元素连接为一个字符串。
        if (req.method === 'GET') { //GET是wx服务器发给开发者服务器的 验证服务器有效性
            if (sha1Arr === signature) {
                res.end(echostr)
                //返回echostr给wx后台 wx才会承认
            } else {
                // console.log(sha1Arr,signature);
                
                console.log('error');

            }
        } else if (req.method === 'POST') {
            // console.log('1111111111');
            
            //POST是客户发给WX服务器 WX服务器转发给开发者服务器的
            if (sha1Arr !== signature) {
                res.end('error')
                return
            }

            //用来获取用户的消息 返回一个Promise对象
            const xmlData = await getuserData(req)

            //将XML解析为js对象
            const jsData = XMLparser(xmlData);

            //将js对象格式化
            const useData = formatting(jsData)
            // console.log(useData);

            //处理请求类型
            let options= headresponse(useData) //useData是请求得到是数据 将其传入  得到响应的数据
            
            // let Message=
            //返回响应
            console.log(options);
            
            res.send(documentType(options))

        } else {
            res.end('error')
        }

    }
}