module.exports = (useData) => {
    let options = {
        toUserName: useData.FromUserName,
        fromUserName: useData.ToUserName,
        createTime: Date.now(),
        type: 'text',
        content: '你在说什么？我听不懂'
    }



    if (useData.MsgType === 'text') {
        if (useData.Content === '1') {
            options.content = '你在说锤子?'
        } else if (useData.Content === '2') {
            options.content = '沟里挂机生死已'
        } else if (useData.Content === '3') {
            options.content = '批话多'

        }

    }

    else if (useData.MsgType === 'image') {
        //将用户发送的图片，返回回去
        options.mediaId = useData.MediaId;
        options.type = 'image';
    }
    else if (useData.MsgType === 'voice') {
        options.content = useData.Recognition
    }
    else if (useData.MsgType === 'location') {
        options.content = `
           地理纬度为${useData.Location_X}\n
           地理精度为${useData.Location_Y}\n
           地图缩放比例为${useData.Scale}\n
           详细位置为${useData.Label}\n
        `
    }
    else if (useData.MsgType === 'link') {
        options.content='点击跳转连接'
        options.Title = '点击跳转'
        options.Description ='那你是真的牛批'
        options.Url = 'www.bilibili.com'
        // options.type='link'
    }
    else if (useData.MsgType === 'event') {
        if (useData.Event === 'subscribe') {
            options.content = '多谢关注~'
        }
        else if (useData.Event === 'unsubscribe') {
            options.content = ''
            console.log('被取关了');
        }
        else if(useData.Event ==='CLICK'){  
            options.content = ''
            console.log('菜单被点击');
            
        }
        else if(useData.Event ==='SCAN'){  
            options.content = '请扫描带参二维码'
        }

    }






    return options
}