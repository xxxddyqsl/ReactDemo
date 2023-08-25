import React, { Component } from 'react';
import { convertFromRaw, EditorState, Entity, AtomicBlockUtils } from 'draft-js';

import Editor, { composeDecorators } from '@draft-js-plugins/editor';

import createImagePlugin from '@draft-js-plugins/image'
import createAlignmentPlugin from '@draft-js-plugins/alignment';

import createFocusPlugin from '@draft-js-plugins/focus';

import createResizeablePlugin from '@draft-js-plugins/resizeable';

import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';

import createDragNDropUploadPlugin from '@draft-js-plugins/drag-n-drop-upload';
import editorStyles from './editorStyles.module.css';
import mockUpload from './mockUpload';
 
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload,
  addImage: imagePlugin.addImage,
});

const plugins = [
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
];

/* eslint-disable */
const initialState = {
  entityMap: {
    0: {
      type: 'IMAGE',
      mutability: 'IMMUTABLE',
      data: {
        src: require('../../../assets/emoji/e100.png'),
      },
    },
  },
  blocks: [
    // {
    //   key: '9gm3s',
    //   text:
    //     'You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.',
    //   type: 'unstyled',
    //   depth: 0,
    //   inlineStyleRanges: [],
    //   entityRanges: [],
    //   data: {},
    // },
    {
      key: 'ov7r',
      text: ' 1',
      type: 'atomic',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0,
        },
      ],
      data: {},
    },
    // {
    //   key: 'e23a8',
    //   text: 'See advanced examples further down …',
    //   type: 'unstyled',
    //   depth: 0,
    //   inlineStyleRanges: [],
    //   entityRanges: [],
    //   data: {},
    // },
  ],
};
/* eslint-enable */

export default class CustomImageEditor extends Component {
  state = {
    // editorState: EditorState.createWithContent(convertFromRaw(initialState)),
    editorState: EditorState.createEmpty(),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };
  appendImage = () => {
    const url = require('../../../public/logo192.png');
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      { src: url },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    const with_atomic = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
    this.onChange(with_atomic);
  }
  handlePastedFiles = (files) => {
    console.log(files);
    files.forEach((blob) => {
   
      if (blob.type.startsWith('image/')) {
        console.log(blob);
        // clipboard  electro提供的模块
        // const image = clipboard.readImage();

        // const url = image.isEmpty()? '': image.toDataURL();
        // console.log(url)
        // this.appendImage({
        //   data: url,
        // });
      }
    });
  }
  render() {
    return (
      <div className='app-assembly'>
        <h1>demo-02-Draftjs富文本-image(图片)</h1>
        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            handlePastedFiles={this.handlePastedFiles}
            ref={(element) => {
              this.editor = element;
            }}
          />
          <AlignmentTool />
          <button onClick={(element) => {
            // console.log(element)
            this.appendImage();
            //阻止事件冒泡
            element?.stopPropagation();
          }}>insertText-插入图片</button>
        </div>
      </div>
    );
  }
}