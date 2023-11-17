import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NavigationBar from './components/NavigationBar'
import RegisterEvent from './pages/RegisterEvent'
import RegisterAttendance from './pages/RegisterAttendance'
import AuthAttendance from './pages/AuthAttendance'


function App() {
  return (
    <BrowserRouter>
    {" "}
    <Routes>
      {" "}
      <Route path="/" element={<NavigationBar />}>
        {" "}
        <Route index element={<Home />} />{" "}
        <Route path="/register-event" element={<RegisterEvent />} />{" "}
        <Route path="/register-attendance" element={<RegisterAttendance />} />{" "}
        <Route path="/auth-attendance" element={<AuthAttendance />} />{" "}

       {" "}
      </Route>{" "}
      
    </Routes>{" "}
  </BrowserRouter>
  
  )
}

export default App
