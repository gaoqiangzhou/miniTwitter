import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './pages/Post';
import NavBar from './components/NavBar';
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
            <Route exact path="/post/:id" element = {<Post/>}/>
          </Routes>
        </Router>
      </div>
  )
}

export default App
