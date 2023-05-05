import React, { useMemo, forwardRef } from 'react'
import Emoji from '../emoji2.json'
import {EmojiLoadFrames} from '../utils/index'
const context = require.context('../../../../assets/emoji/', true, /\.png$/);
const { Emotions } = Emoji;
export const frames = EmojiLoadFrames(Emotions,context).slice(0, 98);

const emojiToUnicode = (val) => {
    let Unicode = val?.codePointAt(0).toString(16).toLocaleUpperCase();
    return 'U+' + Unicode;
};
const FilterUnicode = (decoratedText) => {
    const Unicode = emojiToUnicode(decoratedText);
    return (
        frames?.filter(item => {
            return item.unicode.toUpperCase().includes(Unicode);
        })
    )
}

 // 针对emoji的修饰器
const findWithRegex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText();
    // text.codePointAt(0).toString(16)
    let matchArr;
    let start;
    console.log(text)
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
};
const createEmojiBlockPlugin =(CompositeDecorator)=>{
    return new CompositeDecorator([
        {
            strategy: (contentBlock, callback, contentState) => {
                const emojiRegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
                findWithRegex(emojiRegex, contentBlock, callback);
            },
            component: (props) => {
                const text = props.decoratedText.trim();
                let emojiData = FilterUnicode(text);
                console.log('decorated text', emojiData);
                if (emojiData && emojiData.length > 0) {
                    return (emojiData.map((item) => <span key={item.title} data-offset-key={props.offsetKey} className='emoji_icon' title={item.title} style={{ backgroundImage: `url(${item.context})` }} >
                        {props.children}
                    </span>));
                } else {
                    return <span data-offset-key={props.offsetKey}  >{props.children}</span>;
                }
            },
        },
    ]);
} 

export default createEmojiBlockPlugin;