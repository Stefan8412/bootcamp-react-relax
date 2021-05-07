import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

export const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({})

  const logOut = useCallback(() => setUser({}), [])
  return (
    <AuthContext.Provider
      value={{
        user,
        logOut,
        logIn: setUser,
        signUp: setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}
