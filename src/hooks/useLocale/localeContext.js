import React, { useState } from 'react'
import en from './locales/en'
const LocaleContext = React.createContext([{}, () => {}])
const LocaleProvider = props => {
  const [state, setState] = useState({ direction: 'ltr', appLocale: en })
  return (
    <LocaleContext.Provider value={[state, setState]}>
      {props.children}
    </LocaleContext.Provider>
  )
}

export { LocaleContext, LocaleProvider }
