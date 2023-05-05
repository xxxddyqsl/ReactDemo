import React,{useState} from 'react'
import EmojiData from './emoji2.json'
import {EmojiLoadFrames} from './utils/index'
const context = require.context('../../../assets/emoji', true, /\.png$/);
const { Emotions } = EmojiData;
const frames = EmojiLoadFrames(Emotions,context).slice(0, 98);
console.log(frames)
export default function Emoji(props) {
  
  return (
    <div>
    <ul className='Emoji-box'>
       {frames.map((item,index)=>
        <li key={item.unicode} onClick={(element)=>{props.callback(element,item)}}>
            <img  src={item.context} style={{width:'24px',height:'24px'}} emoji={item.emoji}  title={item.title}  draggable={false}  />
        </li>)}
    </ul>
    </div>
  )
}
