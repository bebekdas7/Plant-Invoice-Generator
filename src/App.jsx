import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Home from './Components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Invoice from './Components/Invoice'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/invoice' element={<Invoice />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
