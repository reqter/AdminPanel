import { useContext } from 'react'
import { LocaleContext } from './localeContext'
import en from './locales/en'
import fa from './locales/fa'

const useLocale = () => {
  const [state, setState] = useContext(LocaleContext)

  function setLocale (locale) {
    switch (locale) {
      case 'en':
        setState(state => ({ ...state, appLocale: en }))
        break
      case 'fa':
        setState(state => ({ ...state, appLocale: fa }))
        break
      default:
        setState(state => ({ ...state, appLocale: en }))
        break
    }
  }

  return {
    setLocale,
    appLocale: state.appLocale
  }
}

export default useLocale
