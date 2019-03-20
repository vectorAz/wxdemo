const rp = require('request-promise-native')
const Token = require('./Token')
//Tohka为一个函数  需要调用才能得到其内部包含TOken的对象
const menu = {
    "button": [
        {
            "type": "click",
            "name": "每日推荐",
            "key": "V1001_TODAY_MUSIC"
        },
        {
            "name": "菜单",
            "sub_button": [
                {
                    "type": "view",
                    "name": "搜索",
                    "url": "http://www.soso.com/"
                },
                {
                    "type": "click",
                    "name": "vector",
                    "key": "V1001_GOOD"
                },
                {
                    "type": "click",
                    "name": "赞一下我们",
                    "key": "V1001_GOOD"
                }]
        },
        {
            'name': '下拉列表',
            'sub_button': [
                {
                    'type': 'scancode_waitmsg',
                    'name': '扫码带提示',
                    "key": "rselfmenu_0_0",
                },
                {
                    'type': 'location_select',
                    'name': '发送位置',
                    "key": "rselfmenu_2_0",
                },
                {
                    'type': 'pic_photo_or_album',
                    'name': '拍照或相册发图',
                    "key": "rselfmenu_1_1",
                    "sub_button": []
                }
            ]

        }
    ]
}


// creatmenu()
async function creatmenu() {
    const { access_token } = await Token()
    console.log(access_token );
    
    const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`
    //https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
    const options = {
        method: 'POST', url, json: true, body: menu//url必须小写
    }
    const resulet = await rp(options)
    return resulet

}
async function deletemenu() {
    const { access_token } =await Token()
    
    const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${access_token}`

    const options = {
        method: 'GET', url, json: true//url必须小写
    }
    const resulet = await rp(options)
    return resulet

}
(async ()=>{
    let resulet=await deletemenu()
    console.log(resulet);
    resulet=await creatmenu()
    console.log(resulet);
    
})()