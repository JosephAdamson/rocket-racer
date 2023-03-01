import React from 'react';
import PracticeSession from './pages/PracticeSession';
import HeaderContainer from './components/HeaderContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <HeaderContainer>
        <Routes>
          <Route path={"/practice"} element={<PracticeSession/>}/>
          {/* <Route path={"/play"} element={}/> */}
        </Routes>
      </HeaderContainer>
    </BrowserRouter>
  );
}

export default App;
