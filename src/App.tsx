import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Button } from './components/Button';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" Component={Home} />
        <Route path="/rooms/new" Component={ NewRoom}/>
      </Routes>
    </BrowserRouter>
  )
}
