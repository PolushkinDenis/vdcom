import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Clients from './pages/clients/Clients';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {contactsSlice} from './store/slices/contactsSlice';
import { contacts } from './data/contacts';

function App() {
  const state = useSelector(state => state.authReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(contactsSlice.actions.initContacts(contacts))
  })

  console.log(state)
  return (
    <div className='app'>
      <BrowserRouter basename='/vdcom'>
        <Routes>
          <Route path="/clients" element={<Clients />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
