import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'; 

const App = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App