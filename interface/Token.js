
//获取凭据
const rp = require('request-promise-native')
const { writeFile, readFile } = require('fs')
//    node文件系统  

//设置和保存Token
async function getInterface() {
    const appId = "wx023de7de289138fc"
    const secret = 'ef3a25ce909caa4cff1941a02ad8c85c'
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${secret}`

    const options = {
        method: 'GET', url, json: true //url必须小写
    }

    let result = await rp(options)

    result.expires_in = Date.now() + 7200000 - 300000

    writeFile('./test.txt', JSON.stringify(result), (err) => {
        if (!err) {
            console.log("文件保存成功");

        } else {
            console.log(err);
        }
    })
    return result
}

//得到最终有效的token
module.exports = function fetchAccessToken() {
    return new Promise((resolve, reject) => {
        readFile('./test.txt', (err, data) => {
            if (!err) {
                resolve(JSON.parse(data.toString()))
            } else {
                reject(err)
            }
        })
    })
            //在已有token文件的情况下 查看有没有过期
        .then(res => {
          if( res.expires_in>Date.now()){
            return res
          }else{
          return  getInterface()
          }
        })

            //处理没有token文件的情况 并创建一个新的
        .catch(err=>{
            return  getInterface()
        })
}


