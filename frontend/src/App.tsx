import PracticeSession from './pages/PracticeSession';
import HeaderContainer from './components/HeaderContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './components/NotFound';
import PlaySession from './pages/PlaySession';

function App() {
  return (
    <BrowserRouter>
      <HeaderContainer>
        <Routes>
          <Route path="/practice" element={<PracticeSession/>}/>
          <Route path={"/play"} element={<PlaySession/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </HeaderContainer>
    </BrowserRouter>
  );
}

export default App;
