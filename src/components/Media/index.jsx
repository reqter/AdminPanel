import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import { languageManager, utility } from "../../services";
import AssetBrowser from "./../AssetBrowser";

const MediaInput = props => {
  const currentLang = languageManager.getCurrentLanguage().name;
  const { field, formData } = props;
  const [assetBrowser, toggleAssetBrowser] = useState(false);
  const [files, setFiles] = useState([]);

  // set form value update time
  useEffect(() => {
    if (formData[field.name] && formData[field.name].length > 0) {
      if (field.isRequired === true) props.init(field.name, true);

      const d = formData[field.name].map(item => {
        item.id = Math.random();
        item.url = item;
        return item;
      });
      setFiles(d);
    } else {
      if (field.isRequired === true) props.init(field.name, false);
      if (files.length > 0) setFiles([]);
    }
  }, [formData]);

  useEffect(() => {
    // send value to form after updateing
    let result = files.map(item => item.url);
    if (result.length === 0) result = [];
    if (field.isRequired === true) {
      if (result === undefined || result.length === 0)
        props.onChangeValue(field, result, false);
      else props.onChangeValue(field, result, true);
    } else {
      props.onChangeValue(field, result, true);
    }
  }, [files]);

  function handleChooseAsset(asset) {
    toggleAssetBrowser(false);
    if (asset) {
      const obj = {
        id: Math.random(),
        url: field.isTranslate
          ? asset.url
          : {
              [currentLang]: asset.url[currentLang],
            },
      };
      if (field.isList !== undefined && field.isList) {
        const newFiles = [...files, obj];
        setFiles(newFiles);
      } else {
        let fs = [];
        fs[0] = obj;
        setFiles(fs);
      }
    }
  }

  function removeFile(f) {
    const fs = files.filter(file => file.id !== f.id);
    setFiles(fs);
  }
  function openAssetBrowser() {
    toggleAssetBrowser(true);
  }
  return (
    <>
      <div className="up-uploader">
        <span className="title">{field.title[currentLang]}</span>
        {field.description && field.description.length > 0 && (
          <span className="description">{field.description[currentLang]}</span>
        )}
        <div className="files">
          {files.map(file => (
            <div key={file.id} className="files-uploaded">
              {!props.viewMode && (
                <div
                  className="files-uploaded-icon"
                  onClick={() => removeFile(file)}
                >
                  <i className="icon-bin" />
                </div>
              )}
              <div className="updatedFileType">
                {field.mediaType === "image" ? (
                  <img src={file.url[currentLang]} alt="" />
                ) : field.mediaType === "video" ? (
                  <i className="icon-video" />
                ) : field.mediaType === "audio" ? (
                  <i className="icon-audio" />
                ) : field.mediaType === "pdf" ? (
                  <i className="icon-pdf" />
                ) : field.mediaType === "spreadsheet" ? (
                  <i className="icon-spreadsheet" />
                ) : (
                  utility.getAssetIconByURL(file.url[currentLang])
                )}
              </div>
            </div>
          ))}
          {!props.viewMode && (
            <div className="files-input" onClick={openAssetBrowser}>
              {field.mediaType === "file" ? (
                <i className="icon-file-plus-o" />
              ) : field.mediaType === "image" ? (
                <i className="icon-camera" />
              ) : (
                <i className="icon-file-plus-o" />
              )}
            </div>
          )}
        </div>
      </div>

      {assetBrowser && (
        <AssetBrowser
          isOpen={assetBrowser}
          onCloseModal={handleChooseAsset}
          mediaType={field.mediaType ? field.mediaType : "file"}
        />
      )}
    </>
  );
};

export default MediaInput;

// class MediaInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentLang: languageManager.getCurrentLanguage().name,
//       field: props.field,
//       formData: props.formData,
//       assetBrowser: false,
//       resetInputLocaly: true,
//       files: []
//     };
//     if (props.init && props.field.isRequired === true && !props.reset) {
//       if (props.formData[props.field.name] === undefined)
//         props.init(props.field.name);
//     }
//   }

//   static getDerivedStateFromProps(nextProps, prevState) {
//     if (
//       nextProps.formData[nextProps.field.name] &&
//       nextProps.formData[nextProps.field.name].length > 0
//     ) {
//       const d = nextProps.formData[nextProps.field.name].map(item => {
//         item.id = Math.random();
//         item.url = item;

//         return item;
//       });
//       return {
//         ...prevState,
//         files: d
//       };
//     }

//     return { ...prevState, files: [] };
//   }

//   handleChooseAsset = asset => {
//     this.setState(prevState => ({
//       ...prevState,
//       assetBrowser: false
//     }));
//     if (asset) {
//       const obj = {
//         id: Math.random(),
//         url: this.state.field.isTranslate
//           ? asset.url
//           : { [this.state.currentLang]: asset[this.state.currentLang] }
//       };
//       if (this.state.field.isList !== undefined && this.state.field.isList) {
//         this.setState(
//           prevState => ({
//             ...prevState,
//             files: [...prevState.files, obj]
//           }),
//           () => {
//             let result = this.state.files.map(item => item.url);
//             if (this.state.field.isRequired === true) {
//               if (result === undefined || result.length === 0)
//                 this.state.props.onChangeValue(this.state.field, result, false);
//               else this.props.onChangeValue(this.state.field, result, true);
//             } else this.props.onChangeValue(this.state.field, result, true);
//           }
//         );
//       } else {
//         this.setState(
//           prevState => ({
//             ...prevState,
//             files: [...[], obj]
//           }),
//           () => {
//             let result = this.state.files.map(item => item.url);
//             if (this.state.field.isRequired === true) {
//               if (result === undefined || result.length === 0)
//                 this.state.props.onChangeValue(this.state.field, result, false);
//               else this.props.onChangeValue(this.state.field, result, true);
//             } else this.props.onChangeValue(this.state.field, result, true);
//           }
//         );
//       }
//     }
//   };

//   removeFile = f => {
//     const fs = this.state.files.filter(file => file.id !== f.id);
//     this.setState(
//       prevState => ({
//         ...prevState,
//         files: fs
//       }),
//       () => {
//         let result = this.state.files.map(item => item.url);
//         if (this.state.field.isRequired === true) {
//           if (result === undefined || result.length === 0)
//             this.state.props.onChangeValue(this.state.field, result, false);
//           else this.props.onChangeValue(this.state.field, result, true);
//         }
//       }
//     );
//   };
//   openAssetBrowser = () => {
//     this.setState(prevState => ({
//       ...prevState,
//       assetBrowser: true
//     }));
//   };
//   render() {
//     return (
//       <>
//         <div className="up-uploader">
//           <span className="title">
//             {this.state.field.title[this.state.currentLang]}
//           </span>
//           <span className="description">
//             {this.state.field.description[this.state.currentLang]}
//           </span>

//           <div className="files">
//             {this.state.files.map(file => (
//               <div key={file.id} className="files-uploaded">
//                 <div
//                   className="files-uploaded-icon"
//                   onClick={() => this.removeFile(file)}
//                 >
//                   <i className="icon-bin" />
//                 </div>
//                 {this.state.field.mediaType === "file" ? (
//                   <div className="updatedFileType">
//                     <i className="icon-file-plus-o" />
//                   </div>
//                 ) : this.state.field.mediaType === "image" ? (
//                   <img src={file.url[this.state.currentLang]} alt="" />
//                 ) : (
//                   <div className="updatedFileType">
//                     <i className="icon-file-plus-o" />
//                   </div>
//                 )}
//               </div>
//             ))}
//             <div className="files-input" onClick={this.openAssetBrowser}>
//               {this.state.field.mediaType === "file" ? (
//                 <i className="icon-file-plus-o" />
//               ) : this.state.field.mediaType === "image" ? (
//                 <i className="icon-camera" />
//               ) : (
//                 <i className="icon-file-plus-o" />
//               )}
//             </div>
//           </div>
//         </div>

//         {this.state.assetBrowser && (
//           <AssetBrowser
//             isOpen={this.state.assetBrowser}
//             onCloseModal={this.handleChooseAsset}
//             mediaType={undefined}
//           />
//         )}
//       </>
//     );
//   }
// }

// export default MediaInput;
