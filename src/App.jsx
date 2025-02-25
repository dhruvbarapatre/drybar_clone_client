import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Service'
import Navbar from './Components/Navbar'
import Allroutes from './Routes/Allroutes'
import First_line from './Components/First_line'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <First_line />
      <Allroutes />
    </>
  )
}

export default App
