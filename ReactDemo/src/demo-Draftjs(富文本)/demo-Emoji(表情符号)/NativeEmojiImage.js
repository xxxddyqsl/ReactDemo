import React, { ReactElement } from 'react';

export default function NativeEmojiImage({ unicode,  emoji,}) {
    {console.log( 'NativeEmojiImage==>',unicode,  emoji,)}
  return <span title={emoji} style={{color:'red',border:'1px solid red'}} >{unicode}</span>;
}
