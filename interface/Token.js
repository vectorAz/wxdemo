const rp = require('request-promise-native')
const {writeFile}=require('fs')

async function getInterface() {
    const appId = "wx023de7de289138fc"
    const secret = 'ef3a25ce909caa4cff1941a02ad8c85c'
    const url =`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${secret}`

    const options = {
         method: 'GET', url, json:true //url必须小写
    }
    let result= await rp(options)
    result.Maxage=Date.now()+7200000-300000
    writeFile('./test.txt',JSON.stringify(result),(err)=>{
        if(!err){
            console.log("文件保存成功");

        }else{
            console.log(err);

        }
    })

    console.log(result);
    return result

}
getInterface()
