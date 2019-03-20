module.exports=(useData)=>{
    let options = {
        toUserName: useData.FromUserName,
        fromUserName: useData.ToUserName,
        createTime: Date.now(),
        type: 'text',
        content: '你在说什么？我听不懂'
    }

    if (useData.Content === '1') {
        options.content = '你在说锤子?'
    } else if (useData.Content === '2') {
        options .content = '沟里挂机生死已'
    } else if (useData.Content === '3') {
        options.  content = '批话多'

    }
    if(useData.Event==='subscribe'){
        options.  content = '多谢关注~'
    }
    if(useData.Event==='unsubscribe'){
            console.log('被取关了');
            
    }

    if (useData.MsgType === 'image') {
        //将用户发送的图片，返回回去
        options.mediaId = useData.MediaId;
        options.type = 'image';
    }

    return options
}