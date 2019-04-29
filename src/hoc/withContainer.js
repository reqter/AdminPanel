// import React, { useState } from 'react'
// import { languageManager, useGlobalState } from '../services'
// import { getUserInfo } from '../Api/account-api'
// const withContainer = (WrappedComponent, ...props) => {
//   // ...and returns another component...
//   return function () {
//     const [{ userInfo }, dispatch] = useGlobalState()
//     const [hasUserInfo, toggleUserInfo] = useState(false)
//     if (!userInfo) {
//       getUserDetail()
//     }
   
//     return <WrappedComponent />
//     return hasUserInfo ? <WrappedComponent {...props} /> : null
//   }
// }

// export default withContainer
