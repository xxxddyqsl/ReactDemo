
/**
 * 批量加载帧表情图片
 * @param {Function} context require.context创建的函数
 * @returns {Array<string>} 返回的所有图片
 */
export function EmojiLoadFrames(Emotions,context) {
    const frames = [];
    Emotions.map(item=>{
        context.keys().forEach((k) => {
            if(k.indexOf(item.src) != -1){
                frames.push({
                    path: k,
                    context: context(k),
                    title:item.title,
                    emoji:item.emoji,
                    unicode:item.unicode,
                });
            }
        });
    })
    return frames;
}
