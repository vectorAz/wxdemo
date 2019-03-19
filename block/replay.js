const sha1 = require('sha1')
const { getuserData, XMLparser, formatting } = require('./index')
const documentType = require('./documentType')
module.exports = () => {
    return async (req, res) => {
        const { signature, echostr, timestamp, nonce } = req.query
        const token = "Tohka319";
        //sort() 方法用原地算法对数组的元素进行排序，
        const sha1Arr = sha1([token, timestamp, nonce].sort().join(''))

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

            //用来获取用户的消息 返回一个Promise对象
            const xmlData = await getuserData(req)

            //将XML解析为js对象
            const jsData = XMLparser(xmlData);

            //将js对象格式化
            const useData = formatting(jsData)
            // console.log(useData);


            let options = {
                toUserName: useData.FromUserName,
                fromUserName: useData.ToUserName,
                createTime: Date.now(),
                type: 'text',
                content: '你在说什么？我听不懂'
            }

            if (useData.Content === '1') {
                content = '你在说锤子?'
            } else if (useData.Content === '2') {
                content = '沟里挂机生死已'
            } else if (useData.Content === '3') {
                content = '批话多'

            }
            if (useData.MsgType === 'image') {
                //将用户发送的图片，返回回去
                options.mediaId = useData.MediaId;
                options.type = 'image';
            }


            
            const Message = documentType(options)
            console.log(Message);

            res.send(Message)




        } else {
            res.end('error')
        }

    }
}