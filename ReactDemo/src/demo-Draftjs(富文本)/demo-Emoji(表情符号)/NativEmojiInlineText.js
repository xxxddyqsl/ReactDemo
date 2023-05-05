import { toShort } from 'emoji-toolkit';
import React, { ReactElement } from 'react';

export default function NativeEmojiInlineText({
  decoratedText,
  children,
}) {
    {console.log( 'NativeEmojiInlineText==>',decoratedText,  decoratedText,)}
  return <span style={{color:'red',border:'1px solid '}} title={toShort(decoratedText)}>{children}</span>;
}
