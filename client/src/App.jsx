import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
      <div>
        <Router>
          <NavBar/>
          <Routes>
            <Route exact path="/" element = {<Home/>}/>
            <Route exact path="/login" element = {<Login/>}/>
            <Route exact path="/register" element = {<Register/>}/>
            <Route exact path="/profile/:id" element = {<Profile/>}/>
          </Routes>
        </Router>
      </div>
  )
}

export default App
