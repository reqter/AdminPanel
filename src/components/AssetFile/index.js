import React from 'react'
import { useLocale } from './../../hooks'
import { Image } from './../../components'

const AssetFile = props => {
  const { appLocale, t, currentLang } = useLocale()
  const imgs = ['jpg', 'jpeg', 'gif', 'bmp', 'png']
  const videos = ['mp4', '3gp', 'ogg', 'wmv', 'flv', 'avi']
  const audios = ['wav', 'mp3', 'ogg']
  const ext = props.file.name.split('.')[1]
  const cls = 'unkownFileType ' + props.class

  if (!ext) {
    return (
      <div className={cls}>
        <i className='icon-folder un-icon' />
        <span className='un-text'>uknown</span>
      </div>
    )
  } else {
    if (imgs.indexOf(ext.toLowerCase()) !== -1) {
      return (
        <Image
          url={
            props.file.url[currentLang]
              ? props.file.url[currentLang]
              : props.file.url
          }
        />
      )
    } else if (videos.indexOf(ext.toLowerCase()) !== -1) {
      return <i className='icon-video' />
    } else if (audios.indexOf(ext.toLowerCase()) !== -1) {
      return <i className='icon-audio' />
    } else {
      return (
        <div className={cls}>
          <i className='icon-file-text un-icon' />
          <span className='un-text'>{props.file.name}</span>
        </div>
      )
    }
  }
}

export default AssetFile
