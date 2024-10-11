import Navbar from './Components/Navbar'
import Amiibos from './Components/Amiibos'
import Series from './Components/Series'
import About from './Components/About'
import { Routes ,Route } from 'react-router-dom'
// import { useState } from 'react'

function App() {
  // const [count, setCount] = useState(0)

  return <>
    <Navbar/>
    <Routes>
      <Route path="/*" element={<Amiibos/>} />
      <Route path="/Amiibos" element={<Amiibos/>} />
      <Route path="/Series" element={<Series/>} />
      <Route path="/About" element={<About/>} />
    </Routes>
    </>
}

export default App
