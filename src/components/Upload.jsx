import React, { useContext } from 'react'
import AuthContext from "../context/AuthProvider"

const Upload = () => {
  const {auth,setAuth} = useContext(AuthContext)
  console.log(auth["token"]);
  return (
    <div>
      upload
    </div>
  )
}

export default Upload