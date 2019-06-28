import React, { useState } from 'react'
import en from './locales/en'
import fa from './locales/fa'
const LocaleContext = React.createContext([{}, () => {}])
const LocaleProvider = props => {
  const fa_lang = {
    appLocale: fa,
    currentLang: 'fa',
    direction: 'rtl'
  }
  const en_lang = {
    appLocale: en,
    currentLang: 'en',
    direction: 'ltr'
  }

  const [state, setState] = useState(() => {
    return props.lang === 'fa' ? fa_lang : en_lang
  })
  return (
    <LocaleContext.Provider value={[state, setState]}>
      {props.children}
    </LocaleContext.Provider>
  )
}

export { LocaleContext, LocaleProvider }
