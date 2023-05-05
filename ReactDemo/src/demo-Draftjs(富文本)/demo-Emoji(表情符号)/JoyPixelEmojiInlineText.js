import React, { ReactElement } from 'react';
import { shortnameToImage, toShort } from 'emoji-toolkit';
import clsx from 'clsx';
import NativeEmojiInlineText from './NativEmojiInlineText';
const EmojiData=[{ "unicode": "U+1F642", "name":":slight_smile:","emoji": "🙂" ,"title":"[微笑]","src":"e100"},
{ "unicode": "U+1F615", "name":":curl one's lip:","emoji": "😕" ,"title":"[撇嘴]","src":"e101"},
{ "unicode": "U+1F60D", "name":":confused face:","emoji": "😍" ,"title":"[喜欢]","src":"e102"},
{ "unicode": "U+1F622", "name":":stare blankly:","emoji": "😢" ,"title":"[发呆]","src":"e103"},
{ "unicode": "U+1F60E", "name":":sunglasses:","emoji": "😎" ,"title":"[得意]","src":"e104"},
{ "unicode": "U+1F62D", "name":":sob:","emoji": "😭" ,"title":"[流泪]","src":"e105"},
{ "unicode": "U+1F633", "name":":flushed:","emoji": "😳" ,"title":"[害羞]","src":"e106"},
{ "unicode": "U+1F910", "name":":shut up:","emoji": "🤐" ,"title":"[闭嘴]","src":"e107"},
{ "unicode": "U+1F634", "name":":sleeping:","emoji": "😴" ,"title":"[睡]","src":"e108"}];
export default function JoyPixelEmojiInlineText({
  decoratedText,
  theme,
  children,
  className,
}) {
  const shortName = toShort(decoratedText);
  const imgTag = shortnameToImage(shortName);
  const path = /src="(.*)"/.exec(imgTag)?.[1];
  const emojiToUnicode=(val)=>{ 
        let Unicode = val.codePointAt(0).toString(16).toLocaleUpperCase();
        return 'U+'+Unicode;
  }
 
 console.log(path)
 const filterUnicode=(decoratedText)=>{
    const Unicode=emojiToUnicode(decoratedText);
    return (
      EmojiData.filter(item => {
        return item.unicode.toUpperCase().includes(Unicode);
      })
    )
 }
 const data = filterUnicode(decoratedText);
 console.log(data)

  if (!data||data.length<=0) {
    return (
      <NativeEmojiInlineText decoratedText={decoratedText} theme={theme}>
        {children}
      </NativeEmojiInlineText>
    );
  }
  let {src,title} =data[0];
  let url = require(`../../../assets/emoji/${src}.png`)
  const backgroundImage = `url(${url})`;
  // const combinedClassName = clsx(theme.emoji, className); 

  return (
    <span
      className='emoji_icon'
      title={title}
      style={{ backgroundImage }}
    >
      {children}
    </span>
  );
}
