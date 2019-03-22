
//获取凭据
const rp = require('request-promise-native')
const { writeFile, readFile } = require('fs')
//    node文件系统  
const {  FNreadFile,FNwriteFile}=require('../communal/writereadFile')
const {appId,secret}=require('../url/urlId')

//设置和保存Token
async function getInterface() {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${secret}`

    const options = {
        method: 'GET', url, json: true //url必须小写
    }

    let result = await rp(options)

    result.expires_in = Date.now() + 7200000 - 300000

    await FNwriteFile('./test.txt',result)

    // writeFile('./test.txt', JSON.stringify(result), (err) => {
    //     if (!err) {
    //         console.log("文件保存成功");

    //     } else {
    //         console.log(err);
    //     }
    // })
    return result
}

//得到最终有效的token
 function fetchAccessToken() {
    return FNreadFile('./test.txt')
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
fetchAccessToken()
module.exports =fetchAccessToken

