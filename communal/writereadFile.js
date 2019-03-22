const { writeFile, readFile } = require('fs')
const {resolve}=require('path')
function FNreadFile(url) {
    return new Promise((resolve, reject) => {
        readFile(url, (err, data) => {
            if (!err) {
                resolve(JSON.parse(data.toString()));
            }
            else {
                reject(err);
            }
        });
    });
}
function FNwriteFile(url, data) {
    url=resolve(__dirname,'../interface',url)
   return new Promise((resolve,reject)=>{
    writeFile(url, JSON.stringify(data), (err) => {
        if (!err) {
            console.log("文件保存成功");
            resolve()
        } else {
            console.log(err);
        }
    })
   })
}

module.exports = {
    FNreadFile,
    FNwriteFile
}