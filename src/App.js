import React from 'react'
import Home from './components/Home'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Register from './components/Register'
import Login from './components/Login'
import Upload from './components/Upload'
import DataView from './components/Dataview'

const App = () => {
  return (
  
    <div>

        

        <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Register/>}/> 
          <Route path='/login1' element={<Login/>}/>
          <Route path= '/upload' element={<Upload/>}/>
          <Route path= '/Data' element={<DataView/>}/>

          
     
        </Routes>
       
    </div>
  
 
  )
}

export default App