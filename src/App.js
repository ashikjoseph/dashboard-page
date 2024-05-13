import logo from './logo.svg';
import './App.css';
import Auth from './Pages/Auth';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Analytics from './Pages/Analytics';
import Performance from './Pages/Performance';
import Settings from './Pages/Settings';

function App() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Auth/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/analytics' element={<Analytics/>} />
      <Route path='/performance' element={<Performance/>} />
      <Route path='/settings' element={<Settings/>} />
      </Routes>
    </div>
  );
}

export default App;
