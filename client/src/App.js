import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

function App() {

  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate replace to='/posts' />} />
          <Route path='/posts' element={<Home />} />
          <Route path='/posts/search' element={<Home />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
