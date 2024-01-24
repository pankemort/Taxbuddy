import React from 'react'
import {AuthContext} from "../context/AuthProvider"

const Upload = () => {
  const {auth, setAuth} = AuthContext();
  console.log(auth);
  return (
    <div>
      upload
    </div>
  )
}

export default Upload