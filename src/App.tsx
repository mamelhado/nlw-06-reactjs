import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

export default function App() {  
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes >
          <Route path="/" Component={Home} />
          <Route path="/rooms/new" Component={ NewRoom}/>
          <Route path="/rooms/:id" Component={ Room}/>
          <Route path="/admin/rooms/:id" Component={ AdminRoom}/>
        </Routes>
      </AuthContextProvider> 
    </BrowserRouter>
  )
}
