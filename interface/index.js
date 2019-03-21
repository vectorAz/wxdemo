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
    // console.log(access_token);

    const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`
    //https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
    const options = {
        method: 'POST', url, json: true, body: menu//url必须小写
    }
    const resulet = await rp(options)
    return resulet

}
async function deletemenu() {
    const { access_token } = await Token()

    const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${access_token}`

    const options = {
        method: 'GET', url, json: true//url必须小写
    }
    const resulet = await rp(options)
    return resulet

}
(async () => {
    let resulet = await deletemenu()
    console.log(resulet);
    resulet = await creatmenu()
    console.log(resulet);

})()

//创建标签
async function createtags(name) {
    const { access_token } = await Token()
    const url = `https://api.weixin.qq.com/cgi-bin/tags/create?access_token=${access_token}`

    return resulet = await rp({
        method: 'POST',
        url,
        json: true,
        body: {
            tag: {
                'name': name
            }
        }
    })

}

//所有获取标签
async function gettags() {
    const { access_token } = await Token()
    const url = `https://api.weixin.qq.com/cgi-bin/tags/get?access_token=${access_token}`

    return resulet = await rp({
        method: 'GET',
        url,
        json: true,

    })

}
//给用户打标签
async function gitusertags(openid_list,tagid) {
    const { access_token } = await Token()
    const url = `https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging?access_token=${access_token}`
    return resulet = await rp({
        method: 'POST',
        url,
        json: true,
        body:
        {
            openid_list,
            "tagid": tagid
        }

    })

}
//查看用户所属分组
async function lookusers(id) {
    const { access_token } = await Token()
    const url = `https://api.weixin.qq.com/cgi-bin/tags/getidlist?access_token=${access_token}
    `

    return resulet = await rp({
        method: 'POST',
        url,
        json: true,
        body:{
               "openid" : id
        }
    })

}

(async () => {
    // let app1 = await createtags(11111218)
    // console.log(app1);   
    // let app2 = await gettags()
    //  console.log(app2.tags[0]);
    // let app3=await gitusertags([
        // 'o5xKa1I1LsjbG29muTabj-VcVyo0'
    // ],app2.tags[2].id)
    // console.log(app3);
   const app4=await lookusers(
    'o5xKa1I1LsjbG29muTabj-VcVyo0'
   )
//    console.log(app4);
   
})()


async function gettags(openid) {
    const { access_token } = await Token()
    const url = `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${access_token}&openid=${openid}`

    return resulet = await rp({
        method: 'GET',
        url,
        json: true,
        body:{
            "user_list": [
                {
                    "openid": openid,
                    "lang": "zh_CN"
                }, 
            ]
        }
    })

}
(async ()=>{
    const app5=await gettags(
        'o5xKa1I1LsjbG29muTabj-VcVyo0'
    ) 
    console.log(app5);
    
})()