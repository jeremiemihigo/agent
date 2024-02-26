import './App.css'
import Operations from './Operations.jsx'
import Login from './Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
 
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="*" element={<Login />} />
          <Route path="/operation" element={<Operations />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
