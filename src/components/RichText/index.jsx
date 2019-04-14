import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import "./../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.scss";
import { languageManager, utility } from "../../services";
import AssetBrowser from "./../AssetBrowser";

const RichTextInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const { field, formData } = props;

  const sampleMarkup =
    "<b>Bold text</b>, <i>Italic text</i><br/ ><br />" +
    '<a href="http://www.facebook.com">Example link</a>';

  const blocksFromHTML = convertFromHTML(sampleMarkup);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  const [assetBrowser, toggleAssetBrowser] = useState(false);
  //const [input, setInput] = useState(EditorState.createWithContent(state));
  const [input, setInput] = useState("");

  if (field.isRequired !== undefined && field.isRequired) {
    if (formData[field.name] === undefined) props.init(field.name);
  }

  // set default value to form data in parent
  useEffect(() => {
    if (field.defaultValue && !props.formData[field.name]) {
      setValueToParentForm(field.defaultValue);
    }
  }, []);

  // set value to input
  useEffect(() => {
    props.formData[field.name]
      ? field.isTranslate
        ? setInput(props.formData[field.name][currentLang])
        : setInput(props.formData[field.name])
      : setInput("");
  }, [formData]);

  function setValueToParentForm(inputValue) {
    let value;
    if (field.isTranslate) value = utility.applyeLangs(inputValue);
    else value = inputValue;

    if (field.isRequired) {
      let isValid = false;
      if (inputValue.length > 0) {
        isValid = true;
      }
      props.onChangeValue(field, value, isValid);
    } else props.onChangeValue(field, value, true);
  }
  function handleOnChange(content) {
    //setInput(e.target.value);
    //setValueToParentForm(e.target.value);
  }
  function openAssetBrowser() {
    toggleAssetBrowser(true);
  }
  function handleChooseAsset(asset) {
    toggleAssetBrowser(false);
    if (asset) {
    }
  }
  return (
    <>
      <Editor
        initialContentState={input}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbarCustomButtons={[
          <div className="richText-header-customBtn" onClick={openAssetBrowser}>
            <i className="icon-images" />
          </div>
        ]}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            //"image",
            "remove",
            "history"
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: {},
          link: { inDropdown: true },
          history: {}
        }}
      />
      {assetBrowser && (
        <AssetBrowser
          isOpen={assetBrowser}
          onCloseModal={handleChooseAsset}
          mediaType={"image"}
        />
      )}
    </>
  );
};

export default RichTextInput;

// import React, { Component } from "react";
// import { EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";

// export default class ControlledEditor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editorState: EditorState.createEmpty()
//     };
//   }

//   onEditorStateChange = editorState => {
//     this.setState(
//       {
//         editorState
//       },
//       () => console.log(this.state.editorState)
//     );
//   };

//   render() {
//     const { editorState } = this.state;
//     return (
//       <Editor
//         editorState={editorState}
//         wrapperClassName="demo-wrapper"
//         editorClassName="editor-class"
//         onEditorStateChange={this.onEditorStateChange}
//         toolbarCustomButtons={[<>

//         </>]}
//       />
//     );
//   }
// }
