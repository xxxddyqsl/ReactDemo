import React, { useState } from 'react'
import Editor from './MyEditor'
export default function Test() {
 
    return (
        <div className='app-assembly'>
        <h1>demo-02-Draftjs富文本测试</h1>
            <div style={{border:'1px solid red',}}>
                <Editor/>
            </div>
        </div>
    )
}
// const setItemBlock = (newState) => {
//     // return new Promise(resolve=>{
       
//      //  变更前的 editorState
//     //  const oldState=editorState;
//      //  变更后的 editorState
//     //  const newState=val;

//      const HANDLE_REGEX = /@/g;
//      const content = newState.getCurrentContent();
//      const block = content.getBlockForKey(newState.getSelection().getStartKey());
//      // 获取当前的文本
//      let  text = block.getText();
//     //  console.log('onChange===>','newState===>',text,'oldState==>',editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getText())
//      if( text!=='' && HANDLE_REGEX.test(text) === true){
          
//     // 获取当前 光标位置
//    var selectionState = newState.getSelection();
//    var anchorKey = selectionState.getAnchorKey()
//    const contentState = newState.getCurrentContent();
//    var currentContentBlock = contentState.getBlockForKey(anchorKey);
//    // 光标开始位置 
//    var start = selectionState.getStartOffset();
//    // 光标结束位置 
//    var end = selectionState.getEndOffset();
//    // 开始光标  和 结束光标中间的内容
//    // var selectedText = currentContentBlock.getText().slice(start, end);
//     // console.log(start,end)
//        // 光标位置之前的内容
//        let startStr=text.slice(0,start);
//        // 光标位置之后的内容
//        let endStr=text.slice(start);
//        // 获取光标位置前一位的内容 是不是 @
//        let isKey = /@/g.test(startStr.split('')[start-1]);
//        // @不是首位 并且 光标前一位是 @
//        if((start-1)!==0 && isKey){
//            //获取@前一位内容
//            let key= startStr.slice(start-2,start-1);
//            // console.log(/\s/.test(key))
//            // @下标前一位不是空格
//            if((/\s/.test(key) === false)){
//                let str=startStr.split('');
//                // @下标前一位拼接上空格
//             //    str[start-1]=' '+str[start-1];
//                str[start-1]=' @';
//                text = str.join('') + endStr;
//                console.log(text)

//                //  在@前面 插入空格 的光标位置
//                const insertOffset =start-1;

//                const  insertSelection  = newState.getSelection().merge({
//                    anchorOffset:insertOffset,
//                    focusOffset: insertOffset,
//                });
//                 // 插入空格或文字以后产生的新 ContentState
//                 // const newContent = Modifier.insertText(
//                 //     contentState,
//                 //     insertSelection,
//                 //     ' ',
//                 //     null,
//                 //     newState.getLastCreatedEntityKey()
//                 // );

//                 const stateWithEntity = newState.getCurrentContent().createEntity(
//                     'mention',
//                     'IMMUTABLE',
//                     {
//                       mention: {},
//                     },
//                   )
//                   const entityKey = stateWithEntity.getLastCreatedEntityKey()
//                   const insertStr=' ';
//                   const stateWithText = Modifier.insertText(stateWithEntity, insertSelection, insertStr, null, entityKey);
//                    // 生成新的EditorState
//                   return  EditorState.push(newState, stateWithText)
//                 //   resolve(EditorState.push(newState, stateWithText))

//            }
//        }

//      }
//      return false;
//     //   resolve(false)
//     // })
//  }

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
