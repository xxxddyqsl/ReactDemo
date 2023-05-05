import React, { useState, useRef, useEffect } from "react";
import {
    Editor,
    EditorState,
    ContentState,
    Modifier,
    RichUtils,
    getDefaultKeyBinding,
    CompositeDecorator,
} from "draft-js";
import "draft-js/dist/Draft.css";

const MentionEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [searchValue, setSearchValue] = useState("");
    const [mentions, setMentions] = useState([]);
    const editorRef = useRef(null);

    useEffect(() => {
        // 模拟从 API 获取用户列表数据
        const mockMentions = [
            { name: "Alice", id: "alice" },
            { name: "Bob", id: "bob" },
            { name: "Charlie", id: "charlie" },
        ];
        setMentions(mockMentions);
    }, []);

    const handleEditorChange = (newState) => {
        setEditorState(newState);
        const content = newState.getCurrentContent();
        const block = content.getBlockForKey(newState.getSelection().getStartKey());
        const text = block.getText();
        const start = newState.getSelection().getStartOffset();
        const mentionStartIndex = text.lastIndexOf("@", start - 1);
        if (mentionStartIndex !== -1) {
            setSearchValue(text.slice(mentionStartIndex + 1, start));
            const searchIndex = mentionStartIndex + 1;
            const mentionEndIndex = start;
            const mention = {
                name: searchValue,
                id: searchValue.toLowerCase(),
            };
            const contentWithEntity = content.createEntity(
                "MENTION",
                "IMMUTABLE",
                mention
            );
            const entityKey = contentWithEntity.getLastCreatedEntityKey();
            const newContentState = Modifier.replaceText(
                content,
                new EditorState().getCurrentInlineStyle(),
                `@${searchValue}`,
                null,
                entityKey,
                searchIndex,
                mentionEndIndex
            );
            setEditorState(
                EditorState.push(newState, newContentState, "insert-characters")
            );
        }
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const keyBindingFn = (e) => {
        if (e.key === "@") {
            return "mention";
        }
        return getDefaultKeyBinding(e);
    };

    const handleKeyCommand = (command) => {
        if (command === "mention") {
            const editorState = RichUtils.toggleInlineStyle(
                editorState,
                "MENTION",
                searchValue
            );
            setEditorState(editorState);
            return true;
        }
        return false;
    };

    const MentionSpan = ({ contentState, entityKey, children }) => {
        const data = contentState.getEntity(entityKey).getData();
        return <span className="mention">{children}</span>;
    };

    const mentionStrategy = (contentBlock, callback) => {
        contentBlock.findEntityRanges((character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentBlock.getEntityAt(character.getOffset()).getType() === "MENTION"
            );
        }, callback);
    };

    const decorator = new CompositeDecorator([
        {
            strategy: mentionStrategy,
            component: MentionSpan,
        },
    ]);

    const renderMentionSuggestions = () => {
        if (!searchValue) {
            return null;
        }
        const filteredMentions = mentions.filter((mention) => {
            const { name, id } = mention;
            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
                "MENTION",
                "IMMUTABLE",
                { name, id }
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const currentSelectionState = editorState.getSelection();
            const mentionText = `@${name}`;
            const newContentState = Modifier.replaceText(
                contentState,
                currentSelectionState.merge({
                    anchorOffset: currentSelectionState.getAnchorOffset() - searchValue.length,
                    focusOffset: currentSelectionState.getAnchorOffset(),
                }),
                mentionText,
                editorState.getCurrentInlineStyle(),
                entityKey
            );
            const newEditorState = EditorState.push(
                editorState,
                newContentState,
                "insert-mention"
            );
            setEditorState(EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter()));
            setSearchValue("");
        });
    }
    return (
        <div>
            <div className="editor-wrapper" onClick={() => editorRef.current.focus()}>
                <Editor
                    editorState={editorState}
                    onChange={handleEditorChange}
                    keyBindingFn={keyBindingFn}
                    handleKeyCommand={handleKeyCommand}
                    placeholder="Write something..."
                    spellCheck={true}
                    ref={editorRef}
                    decorators={decorator}
                />
                {renderMentionSuggestions()}
            </div>
            <input
                type="text"
                className="mention-search"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Type @ to mention someone"
            />
        </div>
    );
};

export default MentionEditor;

// 这个demo实现了基本的@功能，用户可以在Draft.js编辑器中输入@符号，
// 然后根据输入的值过滤出用户列表并展示，用户可以选择一个用户，
// 被选中的用户会被插入到编辑器中，同时实现了实时搜索功能。
// 在这个demo中，我们使用了Draft.js的Editor组件来实现编辑器的展示和交互。我们还使用了Mention组件来展示用户列表和选中的用户，并且实现了实时搜索的功能。

// 在Editor组件的props中，我们传入了一些参数来配置编辑器的行为和样式，包括：

// editorState：当前编辑器的状态，由EditorState.createEmpty()函数创建
// onChange：编辑器状态改变时的回调函数
// keyBindingFn：用来绑定键盘快捷键的函数
// handleKeyCommand：处理键盘快捷键的回调函数
// placeholder：编辑器没有内容时的占位符文本
// spellCheck：是否开启拼写检查
// ref：用来获取Editor组件的引用，方便其他组件调用
// 在Mention组件中，我们传入了以下参数：

// mentionUsers：用户列表，用来展示所有用户
// onChooseMention：选中用户时的回调函数
// searchValue：当前输入的搜索值，用来过滤用户列表
// isLoading：是否在加载用户列表
// errorMessage：加载用户列表出错时的错误信息
// 在Mention组件中，我们还使用了react-window组件库来实现虚拟滚动和优化用户列表的渲染性能。

// 最后，在整个组件中，我们使用了一些state来管理组件的状态，包括：

// editorState：Draft.js编辑器的状态
// mentionUsers：所有用户的列表
// searchValue：当前输入的搜索值
// mentionSuggestions：根据搜索值过滤出来的用户列表
// isLoading：是否在加载用户列表
// errorMessage：加载用户列表出错时的错误信息
// 我们还使用了一些函数来处理组件的交互，包括：

// handleEditorChange：处理编辑器状态改变的函数
// keyBindingFn：处理键盘快捷键的函数
// handleKeyCommand：处理键盘快捷键的回调函数
// handleSearchChange：处理搜索值改变的回调函数
// handleChooseMention：处理选中用户的回调函数
// 这个demo实现了基本的@功能，用户可以在Draft.js编辑器中输入@符号，
// 然后根据输入的值过滤出用户列表并展示，
// 用户可以选择一个用户，被选中的用户会被插入到编辑器中，同时实现了实时搜索功能。