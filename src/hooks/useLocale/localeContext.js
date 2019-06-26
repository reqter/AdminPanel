import React, { useState } from 'react'
import en from './locales/en'
import fa from './locales/fa'
const LocaleContext = React.createContext([{}, () => {}])
const LocaleProvider = props => {
  const { lang } = props
  const [state, setState] = useState({
    appLocale: lang === 'fa' ? fa : en,
    currentLang: lang
  })
  return (
    <LocaleContext.Provider value={[state, setState]}>
      {props.children}
    </LocaleContext.Provider>
  )
}

export { LocaleContext, LocaleProvider }
