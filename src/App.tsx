import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { AuthContextProvider } from './contexts/AuthContext';

export default function App() {  
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes >
          <Route path="/" Component={Home} />
          <Route path="/rooms/new" Component={ NewRoom}/>
        </Routes>
      </AuthContextProvider> 
    </BrowserRouter>
  )
}
