import React, { useState, useEffect } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
  AtomicBlockUtils,
  Entity,
  RichUtils,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "./../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./styles.scss";
import { languageManager, utility } from "../../services";
import AssetBrowser from "./../AssetBrowser";

const RichTextInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const { field, formData } = props;

  const [assetBrowser, toggleAssetBrowser] = useState(false);
  const [input, setInput] = useState(EditorState.createEmpty());

  //set default value to form data in parent
  useEffect(() => {
    if (field.isRequired !== undefined && field.isRequired) {
      if (formData[field.name] === undefined) props.init(field.name);
    }
    // if (field.defaultValue && !props.formData[field.name]) {
    //   setValueToParentForm(field.defaultValue);
    // }
  }, []);

  //  set value to input
  useEffect(() => {
    props.formData[field.name]
      ? field.isTranslate
        ? initValue(props.formData[field.name][currentLang])
        : initValue(props.formData[field.name])
      : initValue("<p></p>");
  }, [formData]);

  function initValue(content) {
    const blocksFromHtml = htmlToDraft(content);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    setInput(EditorState.createWithContent(contentState));
  }
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
    setInput(content);
    setValueToParentForm(
      draftToHtml(convertToRaw(content.getCurrentContent()))
    );
  }

  function openAssetBrowser() {
    toggleAssetBrowser(true);
  }
  function _addMedia(url) {
    const contentState = input.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      {
        src: url,
      }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(input, {
      currentContent: contentStateWithEntity,
    });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
  }
  function handleChooseAsset(asset) {
    toggleAssetBrowser(false);
    if (asset) {
      handleOnChange(_addMedia(asset.url[currentLang]));
    }
  }
  function mediaBlockRenderer(block) {
    if (block.getType() === "atomic") {
      return {
        component: Media,
        editable: false,
      };
    }
    return null;
  }

  return (
    <>
      <Editor
        readOnly={props.viewMode}
        toolbarHidden={props.viewMode}
        blockRendererFn={mediaBlockRenderer}
        editorState={input}
        onEditorStateChange={handleOnChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbarCustomButtons={[
          <div className="richText-header-customBtn" onClick={openAssetBrowser}>
            <i className="icon-images" />
          </div>,
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
            "history",
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: {},
          link: { inDropdown: true },
          history: {},
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

const Media = props => {
  const entity = Entity.get(props.block.getEntityAt(0));

  const { src } = entity.getData();
  const type = entity.getType();

  let media;
  if (type === "image") {
    media = <img src={src} alt="" />;
  }

  return media;
};
