import { toImage } from 'emoji-toolkit';
import React, { ReactElement } from 'react';

export default function JoyPixelEmojiImage({
  emoji,
  theme,
}) {
  {console.log( 'JoyPixelEmojiImage==>',emoji,  theme,)}
  const imgTag = toImage(emoji);
  const path = /src="(.*)"/.exec(imgTag)?.[1];
  return (
    <img
      src={path}
      // src={require('../../../assets/emoji/e100.png')}
      className={theme.emojiSelectPopoverEntryIcon}
      title={emoji}
      draggable={false}
      role="presentation"
    />
  );
}

 