import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>


    )
}
// Create a custom hook for using the context
const useMyContext = () => {   return AuthProvider(AuthContext); };
export {AuthContext ,useMyContext};


// MyContext.js
// import React, { createContext, useContext, useState } from 'react';
 
// // Create a context
// const MyContext = createContext();
 
// // Create a provider component
// const MyContextProvider = ({ children }) => {
//   const [globalVariable, setGlobalVariable] = useState('initialValue');
 
//   return (
// <MyContext.Provider value={{ globalVariable, setGlobalVariable }}>
//       {children}
// </MyContext.Provider>
//   );
// };
 
// // Create a custom hook for using the context
// const useMyContext = () => {
//   return useContext(MyContext);
// };
 
// export { MyContextProvider, useMyContext }