
//获取凭据
const rp = require('request-promise-native')
const { writeFile, readFile } = require('fs')
const fetchAccessToken=require('./Token')
const {  FNreadFile,FNwriteFile}=require('../communal/writereadFile')

//设置和保存Token
async function getticket() {
    const {access_token}=await fetchAccessToken()
   
    // console.log(access_token);
    
    const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`

    const options = {
        method: 'GET', url, json: true //url必须小写
    }

    let result = await rp(options)

    result.expires_in = Date.now() + 7200000 - 300000
    console.log( FNwriteFile('./ticket.txt',result));
    // const ticket={
    //     ticket=result.ticket,

    //     expires_in=result.expires_in
    // }

    await FNwriteFile('./ticket.txt',result)
    // writeFile('./ticket.txt', JSON.stringify(result), (err) => {
    //     if (!err) {
    //         console.log("文件保存成功");

    //     } else {
    //         console.log(err);
    //     }
    // })
    return result

}
function fetchAccessticket() {
    // new Promise((resolve, reject) => {
    //     readFile('./ticket.txt', (err, data) => {
    //         if (!err) {
    //             resolve(JSON.parse(data.toString()))
    //         } else {
    //             reject(err)
    //         }
    //     })
    // })
   return  FNreadFile('./ticket.txt')
        .then(res => {
          if( res.expires_in>Date.now()){
            return res
          }else{
          return  getticket()
          }
        })
        .catch(err=>{
            return  getticket()
        })
}
fetchAccessticket()
module.exports =fetchAccessticket
