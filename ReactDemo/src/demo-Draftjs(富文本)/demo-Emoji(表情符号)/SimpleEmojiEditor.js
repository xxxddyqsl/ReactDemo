import React, { Component, useState,useEffect, useMemo, useRef } from 'react';
import {
    EditorState,
    Modifier,
    ContentState,
    ContentBlock,
    SelectionState,
    CompositeDecorator,
} from 'draft-js';
import Editor, { createEditorStateWithText, MultiDecorator ,composeDecorators} from '@draft-js-plugins/editor';
import editorStyles from './editorStyles.module.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
import createCustomEmojiPlugin,{frames} from './plugins/emojiPlugin';

import NativeEmojiImage from './NativeEmojiImage'
import NativEmojiInlineText from './NativEmojiInlineText'
import JoyPixelEmojiImage from './JoyPixelEmojiImage'
import JoyPixelEmojiInlineText from './JoyPixelEmojiInlineText'

import { defaultTheme } from './theme';
// const emojiPlugin = createEmojiPlugin();
// const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
import EmojiList from './Emoji'
/**
* 插入文字
* @param editorState 当前的EditorState
* @param text 被插入的文字
*/
const insertText = (editorState, text) => {
    // 当前的ContentState
    let currentContent = editorState?.getCurrentContent();
    // 当前的富文本的光标位置 SelectionState
    let currentSelection = editorState?.getSelection();
    // 光标开始位置
    let SelectionStart = currentSelection.getStartOffset();
    // 光标结束位置
    let SelectionEnd = currentSelection.getEndOffset();
    console.log(SelectionStart, SelectionEnd);
    // 插入文字以后产生的新ContentState
    let newContent = Modifier.insertText(
        currentContent,
        currentSelection,
        text,
    );
    // 生成新的EditorState
    return EditorState.push(
        editorState,
        newContent,
        'insert-characters'
    );
}
/**
 * 标签扫描策略
 * @param block 被扫描的段落
 * @param callback 提供给装饰器的回调
 * @param contentState 
 */
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

const TagTagStrategyComponent = (props) => {
    return (
        <>
            {/* <img src={require('../../../assets/emoji/e100.png')} style={ {width:'24px',height:'24px'} } alt='' title='插槽：复用性'></img> */}
            <span className='emoji_icon' style={{ backgroundImage: `url(${require('../../../assets/emoji/e100.png')})` }}>
                {props.children}
            </span>
        </>
    );
}
const text = `🙈1`;
const isuSeNativeArt = false;
// const EmojiData=[
//         { "unicode": "U+1F642", "emoji": "🙂" ,"title":"[微笑]","src":"e100"},
//         { "unicode": "U+1F615", "emoji": "😕" ,"title":"[撇嘴]","src":"e101"},
//         { "unicode": "U+1F60D", "emoji": "😍" ,"title":"[喜欢]","src":"e102"},
//         { "unicode": "U+1F622", "emoji": "😢" ,"title":"[发呆]","src":"e103"},
//         { "unicode": "U+1F60F", "emoji": "😏" ,"title":"[得意]","src":"e104"},
//         { "unicode": "U+1F62D", "emoji": "😭" ,"title":"[流泪]","src":"e105"},
//         { "unicode": "U+1F633", "emoji": "😳" ,"title":"[害羞]","src":"e106"},
//         { "unicode": "U+1F910", "emoji": "🤐" ,"title":"[闭嘴]","src":"e107"},
//         { "unicode": "U+1F634", "emoji": "😴" ,"title":"[睡]","src":"e108"},
//         { "unicode": "U+1F972", "emoji": "🥲" ,"title":"[大哭]","src":"e109"},
//         { "unicode": "U+1F605", "emoji": "😅" ,"title":"[尴尬]","src":"e110"},
//         { "unicode": "U+1F621", "emoji": "😡" ,"title":"[发怒]","src":"e111"},
//         { "unicode": "U+1F61D", "emoji": "😝" ,"title":"[调皮]","src":"e112"},
//         { "unicode": "U+1F604", "emoji": "😄" ,"title":"[大笑]","src":"e113"},
//         { "unicode": "U+1F632", "emoji": "😲" ,"title":"[惊讶]","src":"e114"},
//         { "unicode": "U+1F626", "emoji": "😦" ,"title":"[难过]","src":"e115"},
//         { "unicode": "U+1F61F", "emoji": "😟" ,"title":"[囧]","src":"e116"},
//         { "unicode": "U+1F606", "emoji": "😆" ,"title":"[抓狂]","src":"e117"},
//         { "unicode": "U+1F92E", "emoji": "🤮" ,"title":"[吐]","src":"e118"},
//         { "unicode": "U+1F92D", "emoji": "🤭" ,"title":"[偷笑]","src":"e119"},
//         { "unicode": "U+263A", "emoji": "☺" ,"title":"[愉快]","src":"e120"},
//         { "unicode": "U+1F61B", "emoji": "😛" ,"title":"[吐舌]","src":"e121"},
//         { "unicode": "U+1F644", "emoji": "🙄" ,"title":"[傲慢]","src":"e122"},
//         { "unicode": "U+1F62A", "emoji": "😪" ,"title":"[困]","src":"e123"},	
//         { "unicode": "U+1F628", "emoji": "😨" ,"title":"[惊恐]","src":"e124"},
//         { "unicode": "U+1F613", "emoji": "😓" ,"title":"[流汗]","src":"e125"},
//         { "unicode": "U+1F60E", "emoji": "😎" ,"title":"[悠闲]","src":"e126"},
//         { "unicode": "U+270A", "emoji": "✊" ,"title":"[奋斗]","src":"e127"},
//         { "unicode": "U+1F92C", "emoji": "🤬" ,"title":"[咒骂]","src":"e128"},
//         { "unicode": "U+1F608", "emoji": "😈" ,"title":"[恶魔]","src":"e129"},
//         { "unicode": "U+1F47F", "emoji": "👿" ,"title":"[邪恶]","src":"e130"},
//         { "unicode": "U+1F47D", "emoji": "👽" ,"title":"[外星人]","src":"e131"},
//         { "unicode": "U+1F9DF", "emoji": "🧟" ,"title":"[僵尸]","src":"e132"},
//         { "unicode": "U+1F916", "emoji": "🤖" ,"title":"[机器人]","src":"e133"},
//         { "unicode": "U+1F4A9", "emoji": "💩" ,"title":"[大便]","src":"e134"},
//         { "unicode": "U+1F914", "emoji": "🤔" ,"title":"[疑问]","src":"e135"},
//         { "unicode": "U+1F92B", "emoji": "🤫" ,"title":"[嘘]","src":"e136"},
//         { "unicode": "U+1F635", "emoji": "😵" ,"title":"[晕]","src":"e137"},
//         { "unicode": "U+1F630", "emoji": "😰" ,"title":"[衰]","src":"e138"},
//         { "unicode": "U+1F480", "emoji": "💀" ,"title":"[骷髅]","src":"e139"},	
//         { "unicode": "U+1F623", "emoji": "😣" ,"title":"[打击]","src":"e140"},
//         { "unicode": "U+1F44B", "emoji": "👋" ,"title":"[再见]","src":"e141"},
//         { "unicode": "U+1F443", "emoji": "👃" ,"title":"[抠鼻]","src":"e142"},
//         { "unicode": "U+1F44F", "emoji": "👏" ,"title":"[鼓掌]","src":"e143"},
//         { "unicode": "U+1F600", "emoji": "😀" ,"title":"[坏笑]","src":"e144"},
//         { "unicode": "U+1F617", "emoji": "😗" ,"title":"[哼]","src":"e145"},
//         { "unicode": "U+1F971", "emoji": "🥱" ,"title":"[哈欠]","src":"e146"},
//         { "unicode": "U+1F595", "emoji": "🖕" ,"title":"[鄙视]","src":"e147"},
//         { "unicode": "U+1F614", "emoji": "😔" ,"title":"[委屈]","src":"e148"},
//         { "unicode": "U+1F629", "emoji": "😩" ,"title":"[快哭了]","src":"e149"},
//         { "unicode": "U+1F63C", "emoji": "😼" ,"title":"[阴险]","src":"e150"},
//         { "unicode": "U+1F618", "emoji": "😘" ,"title":"[亲亲]","src":"e151"},
//         { "unicode": "U+1F47E", "emoji": "👾" ,"title":"[怪物]","src":"e152"},
//         { "unicode": "U+1F47B", "emoji": "👻" ,"title":"[幽灵]","src":"e153"},
//         { "unicode": "U+1F637", "emoji": "😷" ,"title":"[感冒]","src":"e154"},
//         { "unicode": "U+1F602", "emoji": "😂" ,"title":"[苦笑]","src":"e155"},
//         { "unicode": "U+1F440", "emoji": "👀" ,"title":"[瞪眼]","src":"e156"},
//         { "unicode": "U+1F631", "emoji": "😱" ,"title":"[尖叫]","src":"e157"},
//         { "unicode": "U+1F61E", "emoji": "😞" ,"title":"[遗憾]","src":"e158"},
//         { "unicode": "U+1F612", "emoji": "😒" ,"title":"[斜眼]","src":"e159"},
//         { "unicode": "U+1F923", "emoji": "🤣" ,"title":"[嘿哈]","src":"e160"},
//         { "unicode": "U+1F926", "emoji": "🤦" ,"title":"[捂脸]","src":"e161"},
//         { "unicode": "U+1F638", "emoji": "😸" ,"title":"[奸笑]","src":"e162"},
//         { "unicode": "U+1F609", "emoji": "😉" ,"title":"[眨眼]","src":"e163"},
//         { "unicode": "U+1F978", "emoji": "🥸" ,"title":"[机智]","src":"e164"},
//         { "unicode": "U+1F64D", "emoji": "🙍" ,"title":"[皱眉]","src":"e165"},
//         { "unicode": "U+1F973", "emoji": "🥳" ,"title":"[耶]","src":"e166"},
//         { "unicode": "U+1F52A", "emoji": "🔪" ,"title":"[菜刀]","src":"e167"},
//         { "unicode": "U+1F349", "emoji": "🍉" ,"title":"[西瓜]","src":"e168"},
//         { "unicode": "U+1F37A", "emoji": "🍺" ,"title":"[啤酒]","src":"e169"},
//         { "unicode": "U+2615", "emoji": "☕" ,"title":"[咖啡]","src":"e170"},
//         { "unicode": "U+1F437", "emoji": "🐷" ,"title":"[猪头]","src":"e171"},
//         { "unicode": "U+1F339", "emoji": "🌹" ,"title":"[玫瑰]","src":"e172"},
//         { "unicode": "U+1F940", "emoji": "🥀" ,"title":"[凋谢]","src":"e173"},
//         { "unicode": "U+1F444", "emoji": "👄" ,"title":"[嘴唇]","src":"e174"},
//         { "unicode": "U+2764", "emoji": "❤" ,"title":"[爱心]","src":"e175"},
//         { "unicode": "U+1F494", "emoji": "💔" ,"title":"[心碎]","src":"e176"},
//         { "unicode": "U+1F382", "emoji": "🎂" ,"title":"[蛋糕]","src":"e177"},
//         { "unicode": "U+1F4A3", "emoji": "💣" ,"title":"[炸弹]","src":"e178"},
//         { "unicode": "U+1F31B", "emoji": "🌛" ,"title":"[晚安]","src":"e179"},
//         { "unicode": "U+1F31E", "emoji": "🌞" ,"title":"[太阳]","src":"e180"},
//         { "unicode": "U+1F917", "emoji": "🤗" ,"title":"[抱抱]","src":"e181"},
//         { "unicode": "U+1F44D", "emoji": "👍" ,"title":"[强]","src":"e182"},
//         { "unicode": "U+1F44E", "emoji": "👎" ,"title":"[弱]","src":"e183"},
//         { "unicode": "U+1F91D", "emoji": "🤝" ,"title":"[握手]","src":"e184"},
//         { "unicode": "U+270C", "emoji": "✌️" ,"title":"[胜利]","src":"e185"},
//         { "unicode": "U+1F44A", "emoji": "👊" ,"title":"[抱拳]","src":"e186"},
//         { "unicode": "U+1FAF1", "emoji": "🫱" ,"title":"[勾引]","src":"e187"},
//         { "unicode": "U+1F91B", "emoji": "🤛" ,"title":"[拳头]","src":"e188"},
//         { "unicode": "U+1F44C", "emoji": "👌" ,"title":"[OK]","src":"e189"},
//         { "unicode": "U+261D", "emoji": "☝" ,"title":"[不对]","src":"e190"},
//         { "unicode": "U+1F64F", "emoji": "🙏" ,"title":"[双手合十]","src":"e191"},
//         { "unicode": "U+1F4AA", "emoji": "💪" ,"title":"[加油]","src":"e192"},
//         { "unicode": "U+1F389", "emoji": "🎉" ,"title":"[庆祝]","src":"e193"},
//         { "unicode": "U+1F381", "emoji": "🎁" ,"title":"[礼物]","src":"e194"},
//         { "unicode": "U+1F375", "emoji": "🍵" ,"title":"[茶]","src":"e195"},
//         { "unicode": "U+1F9E7", "emoji": "🧧" ,"title":"[红包]","src":"e196"},
//         { "unicode": "U+1F56F", "emoji": "🕯" ,"title":"[蜡烛]","src":"e197"},
// ];
export default function SimpleEmojiEditor() {
    /**
  * 编辑器state
  * 初始值为空
  * */
    // const [editorState, setEditorState] = useState(() => createEditorStateWithText(text));
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const editorRef = useRef(null);
    // emoji 组件  配置部分
    // const { EmojiSuggestions, EmojiSelect, plugins } = useMemo(() => {
    const {   plugins } = useMemo(() => {
        const customEmojiPlugin =  { decorators: [createCustomEmojiPlugin(CompositeDecorator)]}
        
    //     const filterUnicode=(decoratedText)=>{
    //         const Unicode=emojiToUnicode(decoratedText);
    //         return (
    //           EmojiData.filter(item => {
    //             return item.unicode.toUpperCase().includes(Unicode);
    //           })
    //         )
    //      }

    //     const draftDecorator = { decorators: [new CompositeDecorator([
    //         {
    //             strategy: (contentBlock, callback, contentState) => {
    //                 console.log(contentBlock)
    //                 // const emojiRegex = /\[[^\[\]]+\]/g;
    //                 // const emojiRegex = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g
    //                 // const emojiRegex = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi
    //                 const emojiRegex =/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
    //                 findWithRegex(emojiRegex, contentBlock, callback);
    //             },
    //             component: (props) => {
    //                 const text = props.decoratedText.trim();
    //                 let  emojiData = filterUnicode(text);
    //                 console.log('decorated text', emojiData );
    //                 if(emojiData && emojiData.length>0){
    //                     return (emojiData.map((item)=><span key={item.title} data-offset-key={props.offsetKey} className='emoji_icon'  title={item.title} style={{ backgroundImage: `url(${require('../../../assets/emoji/'+item.src+'.png')})` }} >
    //                         {props.children}
    //                     </span>));
    //                 }else{
    //                     return <span data-offset-key={props.offsetKey}  >{props.children}</span>;
    //                 }
    //             },
    //         },
    //     ])
    // ]};
      
        // const { EmojiSuggestions, EmojiSelect } = EmojiPlugin
        // const plugins = [EmojiPlugin, draftDecorator,customEmojiPlugin];
        const plugins = [ customEmojiPlugin];
        // 返回 plugins, MentionSuggestions 
        // return { plugins, EmojiSuggestions, EmojiSelect };
        return { plugins };
    }, [])
    const onChange = (editorState) => {
        setEditorState(editorState);
    };
    const focus = () => { 
        editorRef.current?.focus()
    };
    // useEffect(()=>{
    //     const regex = /\[[^\[\]]+\]/g;
    //     const selectionsToReplace = [];
    //     const blockMap = editorState.getCurrentContent().getBlockMap();
    //     console.log(blockMap);
    //     blockMap.forEach((contentBlock) => {
    //         console.log(contentBlock.getText());
    //         findWithRegex(regex, contentBlock, (start, end) => {
    //           const blockKey = contentBlock.getKey();
    //           const blockSelection = SelectionState
    //             .createEmpty(blockKey)
    //             .merge({
    //               anchorOffset: start,
    //               focusOffset: end,
    //             });
        
    //           selectionsToReplace.push(blockSelection)
    //         })
    //     });
    //       console.log(selectionsToReplace)
    //       let contentState = editorState.getCurrentContent();
    //       selectionsToReplace.forEach(selectionState => {
    //         contentState = Modifier.replaceText(
    //           contentState,
    //           selectionState,
    //           '🙂',
    //         )
    //       });
         
    //       onChange(EditorState.push(editorState, contentState))
    // },[editorState])
    const emojiToUnicode=(val)=>{
        let Unicode = val?.codePointAt(0).toString(16).toLocaleUpperCase();
        return 'U+'+Unicode;
  };
  const UnicodeToEmoji=(val)=>{
    let str = val |'0x1F615';
    let emoji = String.fromCodePoint(val);
    return emoji;
  }
    const appendEmoji = (emojiText) => {
        console.log('emoji', emojiText);
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        const ncs = Modifier.insertText(contentState, selection, emojiText);
        const newEditorState = EditorState.push(editorState, ncs, 'insert-fragment');
        onChange(newEditorState);
    //    setTimeout(()=>{ editorRef.current?.focus();},)
    }
    const FilterEmoji = (arr,emojiRegex) => {
        let html='';
        let is=false;
        arr.map(item=>{
            if(emojiRegex.test(item)){
                try {
                    frames.map(k=>{
                        if(k.title.includes(item)){
                            is=false;
                            throw html+=k.emoji;
                        }else{
                            is=true;
                        }
                    });
                }catch(e){}
            }else{
                html+=item;
            };
            if(is){
                html+=item;
            }
        })
        return html;
    }
    const handlePastedText = (text,html) => {
        if (!text) return 'handled';
        // 粘贴 是否是 emoji 表情快捷格式:[微笑]
        const emojiRegex = /(\[.*?\])/g;
        if(emojiRegex.test(text)){
            // 字符串切割 正则切割规则[]
            let arr = text.split(emojiRegex);
            let emoji = FilterEmoji(arr,emojiRegex);
            console.log(text,emoji)
            text = emoji;
        }
        const selection = editorState.getSelection();
        const pastedBlocks = ContentState.createFromText(text).blockMap;
        const newState = Modifier.replaceWithFragment(editorState.getCurrentContent(), selection, pastedBlocks);
        const newEditorState = EditorState.push(editorState, newState, 'insert-fragment');
        onChange(newEditorState);
        return 'handled';
    };
    return (
            <div className='app-assembly'>
                <h1>demo-02-Draftjs富文本-Emoji(表情符号)</h1>
            <div className={editorStyles.editor} onClick={focus}>
                <Editor
                    handlePastedText={handlePastedText}
                    editorState={editorState}
                    onChange={onChange}
                    plugins={plugins}
                    ref={editorRef}
                />
                {/* <EmojiSuggestions onSearchChange={(val)=>{console.log(val)}}/> */}
                <EmojiList callback={(element,item) => {
                    if(!item){return false}
                    appendEmoji(' '+item.emoji+' ');
                    //阻止事件冒泡
                    element?.stopPropagation();
                }}/>
                <button onClick={(element) => {
                    // console.log(element)
                    appendEmoji(' 🙂 ');
                    //阻止事件冒泡
                    element?.stopPropagation();
                }}>insertText-插入表情</button>
            </div>
            <div className={editorStyles.options}>
                {/* <EmojiSelect /> */}
            </div>
        </div>
    );
}
