import React, { useState, useRef, useMemo, useCallback } from 'react';
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from '@draft-js-plugins/mention';
import Editor from '@draft-js-plugins/editor';
import {
  EditorState,
  Modifier,
  ContentBlock,
  CompositeDecorator,
} from 'draft-js';
//
import editorStyles from './SimpleMentionEditor.module.css';
// @ 列表数据
import mentions from "./mentions";
// @ 列表 样式
import './MentionsStyles.css';
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
const handleeTagStrategy = (block, callback, contentState) => {
  const text = block.getText();
  // {[]} 包含的
  const regRule = /{[^}]+}/g;
  // const regRule = /@/g;
  let matchArr = regRule.exec(text), start;
  while (matchArr !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
    matchArr = regRule.exec(text);
  }
};

const TagTagStrategyComponent = (props) => {
  return (
    <>
    {/* <img src={require('../../../assets/emoji/e100.png')} style={ {width:'24px',height:'24px'} } alt='' title='插槽：复用性'></img> */}
    <span   style={{color:'red'}}>
    {props.children}
    </span>
    </>
  );
}

export default function MyEditor() {
  /** 
    * 编辑器state
    * 初始值为空
    * */
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const editorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(mentions);
  const { MentionSuggestions, plugins } = useMemo(() => {
    // mention 组件 @ 提及 配置部分
    const mentionPlugin = createMentionPlugin({
      // theme - mention组件@列表的主题配置
      theme: {
        // 'mentionSuggestionsEntryText' 配置的自定义class名
        mentionSuggestionsEntryText: 'mentionSuggestionsEntryText',
        mentionSuggestionsEntryAvatar: 'mentionSuggestionsEntryAvatar',
        mentionSuggestionsEntry: 'mentionSuggestionsEntry',
        mentionSuggestionsEntryFocused: 'mentionSuggestionsEntryFocused',
        mentionSuggestions: 'mentionSuggestions'
      },
      entityMutability: 'IMMUTABLE',
      mentionPrefix: '@',
      // mentionTrigger: '@',
      // mentionRegExp:'[\\w@\\._]',
      supportWhitespace: true
    });
    // eslint-disable-next-line no-shadow
    const { MentionSuggestions } = mentionPlugin;
    const TagDecoratorPlugin = {
      decorators: [
        new CompositeDecorator([
          {
            strategy: handleeTagStrategy,
            component: props => <TagTagStrategyComponent {...props} />,
          }
        ]),
      ],
    };
    // eslint-disable-next-line no-shadow
    const plugins = [mentionPlugin, TagDecoratorPlugin];
    // 返回 plugins, MentionSuggestions 
    return { plugins, MentionSuggestions };
  }, [])
  const onOpenChange = useCallback((_open) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);
  const handleKeyCommand = (command) => {
    console.log(command)
    // if (command === 'enter_command') {
    //     handleSendMessage();
    //     return 'handled';
    // }else if (command === 'split-block') {
    //     handleEnter();
    //     // return 'handled';
    // }
    // return 'not-handled';
};

  const onChange = (val) => {
    //  变更前的 editorState
    const oldState = editorState;
    //  变更后的 editorState
    const newState = val;
    // 方式1：修改block 列表对应key的数据
    // const MentionsEditorState=setMentions(val);
    // 方式2：@前面 插入 空格
    // const MentionsEditorState = setInsertText(val);
    // 方式3：通过 Modifier.replaceText 将@替换为空格+@
    const MentionsEditorStateData = setReplaceText(val);

    if (MentionsEditorStateData) {
      // MentionsEditorState 返回的editorState  返回的  anchorOffset的光标的位置
      const { MentionsEditorState, Selection } = MentionsEditorStateData;
      console.log(MentionsEditorState.getCurrentContent().getBlockForKey(MentionsEditorState.getSelection().getStartKey()).getText());
      // 修改当前 MentionsEditorState 的光标位置 selectionState
      val = EditorState.set(MentionsEditorState, {
        selection: MentionsEditorState.getSelection().merge({
          anchorOffset: Selection.anchorOffset,
          focusOffset: Selection.focusOffset,
        })
      });
    }
    console.log('更新前editorState==>', editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getText())
    console.log('最新的editorState==>', newState.getCurrentContent().getBlockForKey(newState.getSelection().getStartKey()).getText())
    // 更新 editorState
    setEditorState(val);

    // 变更前后 文字变化的情况下才触发 - 缺陷 光标位置发生变化时 无法取到最新正确的光标位置
    // const oldText=oldState.getCurrentContent().getPlainText();
    // const newText=newState.getCurrentContent().getPlainText();
    // if(oldText !== newText){
    // 更新 editorState
    // setEditorState(val)
    // }
  }
  return (
    <>
      <div className={editorStyles.editor} onClick={() => editorRef.current?.focus()}>
        <Editor
          editorKey={'editor'}
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          handleKeyCommand={handleKeyCommand}
          ref={editorRef}
        />
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          suggestions={suggestions}
          onSearchChange={onSearchChange}
          onAddMention={() => {
            // get the mention object selected
          }}
        />
      </div>
      <button onClick={(element) => {
        // console.log(element)
        let newEditorState = insertText(editorState, '{微笑}');
        onChange(newEditorState);
        //阻止事件冒泡
        element?.stopPropagation();
      }}>insertText-插入文字段落</button>
    </>
  )
}
/*
  文字中间 @ 无法触发弹出Mentions @前增加空格 满足组件弹出Mentions显示@成员列表的格式( @是首位 或 空格+@ )

  方式1： 通过修改 block 列表的方式
*/
const setMentions = (editorState) => {
  // block的数据格式'{"blocks":[{"key":"5btff","text":"测2试11","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
  const HANDLE_REGEX = /@/g;
  // 获取当前 editorState 内容
  const currentContent = editorState.getCurrentContent();
  // 获取当前光标位置
  const currentSelection = editorState.getSelection();
  // 根据 当前光标位置 找到光标所在位置的 Key
  const blockKey = currentSelection.getAnchorKey();
  // 根据 Key 找到段落
  const currentBlock = currentContent.getBlockForKey(blockKey);
  // 获取当前的文本
  var currentText = currentBlock.getText();
  // 当前的文本 不等于 空 并且存在 @
  if (currentText !== '' && HANDLE_REGEX.test(currentText) === true) {
    // 光标开始位置
    const SelectionStart = currentSelection.getStartOffset();
    // 光标结束位置
    const SelectionEnd = currentSelection.getEndOffset();
    // 开始光标  和 结束光标中间的内容
    // var selectedText = currentBlock.getText().slice(SelectionStart, SelectionEnd);
    // 光标位置之前的内容
    let startStr = currentText.slice(0, SelectionStart);
    // 光标位置之后的内容
    let endStr = currentText.slice(SelectionStart);
    // 获取光标位置前一位的内容 是不是 @
    let isKey = /@/g.test(startStr.split('')[SelectionStart - 1]);
    // @不是首位 并且 光标前一位是 @
    if ((SelectionStart - 1) !== 0 && isKey) {
      //获取@前一位内容
      let key = startStr.slice(SelectionStart - 2, SelectionStart - 1);
      // @下标前一位不是空格
      if ((/\s/.test(key) === false)) {
        //  在@前面 插入空格 的获取光标位置
        const insertOffset = SelectionStart - 1;
        let str = startStr.split("");
        // @下标前一位拼接上空格
        //    str[start-1]=' '+str[start-1];
        str[insertOffset] = " @";
        currentText = str.join("") + endStr;
        // console.log(currentText);
        const block = new ContentBlock({
          key: blockKey,
          type: "unstyled",
          text: currentText,
        });
        const blockMap = currentContent.getBlockMap().set(block.key, block);
        // @前面插入了空格 光标需要向右边偏移1位
        const anchorOffset = SelectionStart + 1;
        // 返回一个对象
        return {
          //  通过EditorState.push到老的newState生成新的EditorState
          MentionsEditorState: EditorState.push(
            editorState,
            currentContent.set("blockMap", blockMap),
            'change-block-data'
          ),
          Selection: {
            // 返回光标需要偏移的开始位置
            anchorOffset: anchorOffset,
            // 返回光标需要偏移的结束位置
            focusOffset: anchorOffset,
          }
        };
      }
    }
  }
  return false;
}

/*
  文字中间 @ 无法触发弹出Mentions @前增加空格 满足组件弹出Mentions显示@成员列表的格式( @是首位 或 空格+@ )

  方式2：通过 Modifier.InsertText 在@前面 插入 空格
*/
const setInsertText = (newState) => {
  //  变更前的 editorState
  //  const oldState=editorState;
  //  变更后的 editorState
  //  const newState=val;

  const HANDLE_REGEX = /@/g;
  const content = newState.getCurrentContent();
  const block = content.getBlockForKey(newState.getSelection().getStartKey());
  // 获取当前的文本
  let text = block.getText();
  if (text !== '' && HANDLE_REGEX.test(text) === true) {

    // 获取当前 光标位置
    var selectionState = newState.getSelection();
    var anchorKey = selectionState.getAnchorKey()
    const contentState = newState.getCurrentContent();
    var currentContentBlock = contentState.getBlockForKey(anchorKey);
    // 光标开始位置 
    var start = selectionState.getStartOffset();
    // 光标结束位置 
    var end = selectionState.getEndOffset();
    // 开始光标  和 结束光标中间的内容
    // var selectedText = currentContentBlock.getText().slice(start, end);
    // console.log(start,end)
    // 光标位置之前的内容
    let startStr = text.slice(0, start);
    // 光标位置之后的内容
    let endStr = text.slice(start);
    // 获取光标位置前一位的内容 是不是 @
    let isKey = /@/g.test(startStr.split('')[start - 1]);
    // @不是首位 并且 光标前一位是 @
    if ((start - 1) !== 0 && isKey) {
      //获取@前一位内容
      let key = startStr.slice(start - 2, start - 1);
      // console.log(/\s/.test(key))
      // @下标前一位不是空格
      if ((/\s/.test(key) === false)) {
        let str = startStr.split('');
        // @下标前一位拼接上空格
        //    str[start-1]=' '+str[start-1];
        str[start - 1] = ' @';
        text = str.join('') + endStr;
        console.log(text)

        //  在@前面 插入空格 的光标位置
        const insertOffset = start - 1;

        const insertSelection = newState.getSelection().merge({
          anchorOffset: insertOffset,
          focusOffset: insertOffset,
        });
        // 插入的内容
        const insertStr = ' ';
        // 插入方式1 ： 直接空格或文字以后产生的新 ContentState
        // const stateWithText = Modifier.insertText(
        //     contentState,
        //     insertSelection,
        //     insertStr,
        // );
        // 插入方式2 ： newState.getCurrentContent() 获取当前内容 通过 createEntity 创建一个新的实体
        const stateWithEntity = newState.getCurrentContent().createEntity(
          'mention',//3种参数类型  'LINK', 'MENTION', 'PHOTO'
          'IMMUTABLE', // 3种参数类型 'IMMUTABLE' , 'Mutable' ,'Segmented'
          {
            mention: {},
          },//数据
        );
        // 通过 createEntity 创建一个新的实体 存在一个新的 key
        const entityKey = stateWithEntity.getLastCreatedEntityKey()
        //   通过 createEntity 创建一个新的实体 stateWithEntity   insertSelection插入的位置
        const stateWithText = Modifier.insertText(stateWithEntity, insertSelection, insertStr, null, entityKey);
        // @前面插入了空格 光标需要向右边偏移1位
        const anchorOffset = start + 1;
        // 返回一个对象
        return {
          // 将stateWithText= Modifier.insertText 返回的新 ContentState 通过EditorState.push到老的newState生成新的EditorState
          MentionsEditorState: EditorState.push(newState, stateWithText),
          Selection: {
            // 返回光标需要偏移的开始位置
            anchorOffset: anchorOffset,
            // 返回光标需要偏移的结束位置
            focusOffset: anchorOffset,
          }
        };

      }
    }

  }
  return false;
}
/*
  文字中间 @ 无法触发弹出Mentions @前增加空格 满足组件弹出Mentions显示@成员列表的格式( @是首位 或 空格+@ )

  方式3：通过 Modifier.replaceText 将@替换为空格+@
*/
const setReplaceText = (newState) => {
  //  变更前的 editorState
  //  const oldState=editorState;
  //  变更后的 editorState
  //  const newState=val;

  const HANDLE_REGEX = /@/g;
  const content = newState.getCurrentContent();
  const block = content.getBlockForKey(newState.getSelection().getStartKey());
  // 获取当前的文本
  let text = block.getText();
  if (text !== '' && HANDLE_REGEX.test(text) === true) {

    // 获取当前 光标位置
    var selectionState = newState.getSelection();
    var anchorKey = selectionState.getAnchorKey()
    const contentState = newState.getCurrentContent();
    var currentContentBlock = contentState.getBlockForKey(anchorKey);
    // 光标开始位置 
    var start = selectionState.getStartOffset();
    // 光标结束位置 
    var end = selectionState.getEndOffset();
    // 开始光标  和 结束光标中间的内容
    // var selectedText = currentContentBlock.getText().slice(start, end);
    // console.log(start,end)
    // 光标位置之前的内容
    let startStr = text.slice(0, start);
    // 光标位置之后的内容
    let endStr = text.slice(start);
    // 获取光标位置前一位的内容 是不是 @
    let isKey = /@/g.test(startStr.split('')[start - 1]);
    // @不是首位 并且 光标前一位是 @
    if ((start - 1) !== 0 && isKey) {
      //获取@前一位内容
      let key = startStr.slice(start - 2, start - 1);
      // console.log(/\s/.test(key))
      // @下标前一位不是空格
      if ((/\s/.test(key) === false)) {
        let str = startStr.split('');
        // @下标前一位拼接上空格
        //    str[start-1]=' '+str[start-1];
        str[start - 1] = ' @';
        text = str.join('') + endStr;
        console.log(text)

        //  在@前面 插入空格 的光标位置
        const insertOffset = start - 1;

        const insertSelection = newState.getSelection().merge({
          //光标开始的位置 在@前面
          anchorOffset: insertOffset,
          //光标结束的位置 在@后面
          focusOffset: start,
        });
        // 插入的内容
        const insertStr = ' @';
        // 插入方式1 ： 直接空格或文字以后产生的新 ContentState
        const stateWithText = Modifier.replaceText(
          contentState,
          insertSelection,
          insertStr,
        );
        const anchorOffset = start + 1;

        return {
          // 将stateWithText= Modifier.insertText 返回的新 ContentState 通过EditorState.push到老的newState生成新的EditorState
          MentionsEditorState: EditorState.push(newState, stateWithText),
          Selection: {
            // 返回光标需要偏移的开始位置
            anchorOffset: anchorOffset,
            // 返回光标需要偏移的结束位置
            focusOffset: anchorOffset,
          }
        };
        // 修改光标位置方式1  forceSelection：
        // const updatedSelection = newEditorState.getSelection().merge({
        //   anchorOffset:anchorOffset,
        //   focusOffset:anchorOffset,
        // });
        // return EditorState.forceSelection(newEditorState, updatedSelection);

        // 修改光标位置方式2 ：当前 newEditorState 的  selectionState
        // return EditorState.set(newEditorState, {
        //     selection: newEditorState.getSelection().merge({
        //         anchorOffset: anchorOffset,
        //         focusOffset: anchorOffset,
        //     })
        // });

      }
    }

  }
  return false;
}
// const setItemBlock = (newState) => {
//     //  变更前的 editorState
//     //  const oldState=editorState;
//     //  变更后的 editorState
//     //  const newState=val;

//     const HANDLE_REGEX = /@/g;
//     const content = newState.getCurrentContent();
//     const block = content.getBlockForKey(newState.getSelection().getStartKey());
//     // 获取当前的文本
//     let text = block.getText();
//     if (text !== "" && HANDLE_REGEX.test(text) === true) {
//       // 获取当前 光标位置
//       var selectionState = newState.getSelection();
//       var anchorKey = selectionState.getAnchorKey();
//       const contentState = newState.getCurrentContent();
//       var currentContentBlock = contentState.getBlockForKey(anchorKey);
//       // 光标开始位置
//       var start = selectionState.getStartOffset();
//       // 光标结束位置
//       var end = selectionState.getEndOffset();
//       // 开始光标  和 结束光标中间的内容
//       // var selectedText = currentContentBlock.getText().slice(start, end);
//       // console.log(start,end)
//       // 光标位置之前的内容
//       let startStr = text.slice(0, start);
//       // 光标位置之后的内容
//       let endStr = text.slice(start);
//       // 获取光标位置前一位的内容 是不是 @
//       let isKey = /@/g.test(startStr.split("")[start - 1]);
//       // @不是首位 并且 光标前一位是 @
//       if (start - 1 !== 0 && isKey) {
//         //获取@前一位内容
//         let key = startStr.slice(start - 2, start - 1);
//         // console.log(/\s/.test(key))
//         // @下标前一位不是空格
//         if (/\s/.test(key) === false) {
//           let str = startStr.split("");
//           // @下标前一位拼接上空格
//           //    str[start-1]=' '+str[start-1];
//           str[start - 1] = " @";
//           text = str.join("") + endStr;
//           console.log(text);
//           const block = new ContentBlock({
//             key: newState.getSelection().getStartKey(),
//             type: "unstyled",
//             text
//           });
//           const blockMap = contentState.getBlockMap().set(block.key, block);
//           return EditorState.push(
//             newState,
//             contentState.set("blockMap", blockMap),
//             "redo"
//           );
//         }
//       }
//     }
//     return false;
//   };
// 优化：修改当前光标位置前一位是否是@ 增加空格
// const setItemBlock = (text,newState) => {
//      // 获取当前 光标位置
//     var selectionState = newState.getSelection();
//     var anchorKey = selectionState.getAnchorKey()
//     const contentState = newState.getCurrentContent();
//     var currentContentBlock = contentState.getBlockForKey(anchorKey);
//     // 光标开始位置
//     var start = selectionState.getStartOffset();
//     // 光标结束位置
//     var end = selectionState.getEndOffset();
//     // 开始光标  和 结束光标中间的内容
//     // var selectedText = currentContentBlock.getText().slice(start, end);
//      console.log(start,end)
//         // 光标位置之前的内容
//         let startStr=text.slice(0,start);
//         // 光标位置之后的内容
//         let endStr=text.slice(start);
//         // 获取光标位置前一位的内容 是不是 @
//         let isKey = /@/g.test(startStr.split('')[start-1]);
//         // @不是首位 并且 光标一位是 @
//         if((start-1)!==0 && isKey){
//             //获取@前一位内容
//             let key= startStr.slice(start-2,start-1);
//             // console.log(/\s/.test(key))
//             // @下标前一位不是空格
//             if((/\s/.test(key) === false)){
//                 let str=startStr.split('');
//                 // @下标前一位拼接上空格
//                 str[start-2]=str[start-2]+' ';
//                 text = str.join('') + endStr;
//                 console.log(text)
//                 const block = new ContentBlock({
//                     key: newState.getSelection().getStartKey(),
//                     type: 'unstyled',
//                     text,
//                 });
//                 // getBlockMap()  获取blocks列表  修改  blocks 列表指定key的内容
//                 const blockMap = contentState.getBlockMap().set(block.key, block);
//                 const newEditorState = EditorState.push(newState, contentState.set('blockMap', blockMap),'change-block-data');

//                  // @前+空格 光标向右边偏移一位
//                 const anchorOffset =start+1;

//                 const  updatedSelection  = newEditorState.getSelection().merge({
//                     anchorOffset,
//                     focusOffset: anchorOffset,
//                 });
//                 const  newUpdatedSelection  = EditorState.forceSelection(newEditorState, updatedSelection);

//                 // const raw = convertToRaw(newUpdatedSelection.getCurrentContent());
//                 setEditorState(newUpdatedSelection);
//                 onSearchChange('');
//                 // // 首次渲染覆盖执行问题
//                 // setTimeout(() => {
//                 //     setDraftMessageMap({ chatId: currentChat.id, editorState: JSON.stringify(raw), msgContent: getMsgContent() });
//                 // });
//                 // onChange(newUpdatedSelection);
//             }
//         }
//   }
// //   获取文本最后一位是否是@ 增加空格
// const setItemBlock = (text,newState) => {
//     // '{"blocks":[{"key":"5btff","text":"测2试11","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
//         // console.log('text===>',text,text!=='',HANDLE_REGEX.test(text));
//         // 获取最后一个@下标
//         let StartIndex=text.lastIndexOf("@");
//         // console.log('StartIndex===>',StartIndex)
//         // 不是首位
//         if(StartIndex!==0){
//             //获取@前一位内容
//         let key= text.slice(StartIndex-1,StartIndex);
//         // console.log(/\s/.test(key))
//             // @下标前一位是否是空格
//             if((/\s/.test(key) === false)){
//                 let str=text.split('');
//                 str[StartIndex-1]=str[StartIndex-1]+' ';
//                 text= str.join('');
//                 console.log(text)
//                 const block = new ContentBlock({
//                     key: newState.getSelection().getStartKey(),
//                     type: 'unstyled',
//                     text,
//                 });
//                 const contentState = newState.getCurrentContent();
//                 // getBlockMap()  获取blocks列表  修改  blocks 列表指定key的内容
//                 const blockMap = contentState.getBlockMap().set(block.key, block);
//                 const newEditorState = EditorState.push(newState, contentState.set('blockMap', blockMap),'change-block-data');

//                 // 获取当前 光标位置
//                 const currentSelection = newEditorState.getSelection();
//                  // @前+空格 光标向右边偏移一位
//                 const anchorOffset = currentSelection.getAnchorOffset()+1;

//                 const  updatedSelection  = newEditorState.getSelection().merge({
//                     anchorOffset: anchorOffset,
//                     focusOffset: anchorOffset,
//                 });
//                 const  newUpdatedSelection  = EditorState.forceSelection(newEditorState, updatedSelection);

//                 // const raw = convertToRaw(newUpdatedSelection.getCurrentContent());
//                 setEditorState(newUpdatedSelection);
//                 onSearchChange('');
//                 // // 首次渲染覆盖执行问题
//                 // setTimeout(() => {
//                 //     setDraftMessageMap({ chatId: currentChat.id, editorState: JSON.stringify(raw), msgContent: getMsgContent() });
//                 // });
//                 // onChange(newUpdatedSelection);
//             }
//         }
//   }