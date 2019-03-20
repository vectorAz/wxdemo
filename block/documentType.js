module.exports = (useData) => {
    let Message = `<xml>
    <ToUserName><![CDATA[${useData.toUserName}]]></ToUserName>
    <FromUserName><![CDATA[${useData.fromUserName}]]></FromUserName>
    <CreateTime>${useData.createTime}</CreateTime>
    <MsgType><![CDATA[${useData.type}]]></MsgType>`;

    //    if (useData.type === 'text') {
    //         Message += ` 
    //         <Content><![CDATA[${useData.content}]]></Content>
    //         `
    //     }
    //   else if (useData.type === 'image') {
    //         Message += `<Image>
    //             <MediaId><![CDATA[${useData.mediaId}]]></MediaId>
    //           </Image>`;
    //       } 
    //     else if (useData.type === 'voice') {
    //         Message += ` 
    //         <Voice>
    //          <MediaId><![CDATA[${useData.mediaId}]]></MediaId>
    //          </Voice
    //         `
    //     }
    //     else if (useData.type === 'video') {
    //         Message += ` 
    //         <Video>
    //         <MediaId><![CDATA[${useData.mediaId}]]></MediaId>
    //         <Title><![CDATA[${useData.title}]]></Title>
    //         <Description><![CDATA[${useData.description}]]></Description>
    //       </Video>
    //         `
    //     }
    //     else if (useData.type === 'music') {
    //         Message += ` 
    //         <Music>
    //         <Title><![CDATA[${useData.title}]]></Title>
    //         <Description><![CDATA[${useData.description}]]></Description>
    //         <MusicUrl><![CDATA[${useData.musicUrl}]]></MusicUrl>
    //         <HQMusicUrl><![CDATA[${useData.hqMusicUrl}]]></HQMusicUrl>
    //         <ThumbMediaId><![CDATA[${useData.thumbMediaId}]]></ThumbMediaId>
    //       </Music>
    //         `
    //     }
    //     else if (useData.type === 'news') {
    //         Message += ` 
    //         <ArticleCount>${useData.content.length}</ArticleCount>
    //         <Articles>
    //         `
    //         Message += useData.content.reduce((prev, curr) => {
    //             return prev + `
    //             <item>
    //             <Title><![CDATA[${curr.title}]]></Title>
    //             <Description><![CDATA[${curr.description}]]></Description>
    //             <PicUrl><![${curr.picUrl}]]></PicUrl>
    //             <Url><![CDATA[${curr.url}]]></Url>
    //           </item>
    //             `
    //         }, '')

    //         Message += ` </Articles>`
    //     }

    switch (useData.type) {
        case 'text':
            Message += ` 
        <Content><![CDATA[${useData.content}]]></Content>
        ` ;
            break

        case 'image':
            Message += `<Image>
        <MediaId><![CDATA[${useData.mediaId}]]></MediaId>
        </Image>`;
            break

        case 'voice':
            Message += ` 
        <Voice>
         <MediaId><![CDATA[${useData.mediaId}]]></MediaId>
         </Voice
        `;
            break

        case 'video':
            Message += ` 
        <Video>
        <MediaId><![CDATA[${useData.mediaId}]]></MediaId>
        <Title><![CDATA[${useData.title}]]></Title>
        <Description><![CDATA[${useData.description}]]></Description>
         </Video>
        `; break

        case 'music':
            Message += ` 
            <Music>
            <Title><![CDATA[${useData.title}]]></Title>
            <Description><![CDATA[${useData.description}]]></Description>
            <MusicUrl><![CDATA[${useData.musicUrl}]]></MusicUrl>
            <HQMusicUrl><![CDATA[${useData.hqMusicUrl}]]></HQMusicUrl>
            <ThumbMediaId><![CDATA[${useData.thumbMediaId}]]></ThumbMediaId>
            </Music>
            `

        case 'news':
            Message += ` 
        <ArticleCount>${useData.content.length}</ArticleCount>
        <Articles>
        `
            Message += useData.content.reduce((prev, curr) => {
                return prev + `
            <item>
            <Title><![CDATA[${curr.title}]]></Title>
            <Description><![CDATA[${curr.description}]]></Description>
            <PicUrl><![${curr.picUrl}]]></PicUrl>
            <Url><![CDATA[${curr.url}]]></Url>
            </item>
            `
            }, '')

            Message += ` </Articles>`;
            break
    }



    Message += `</xml>`

    return Message


}