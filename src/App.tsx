// Importaciones necesarias
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Importa correctamente Router, Routes y Route
import { Navbar } from './components/Navbar'; // Asegúrate de que el nombre coincide con el export del componente
import {Inicio} from './components/Inicio'; // Importa tus componentes
import {ListaLibros} from './components/ListaLibros'; // Importa tus componentes
import {ListaAutores} from './components/ListaAutores'; // Importa tus componentes
import kbg from './assets/react.gif';
function App() {
  return (
    <Router>
      <Navbar />
      <div className='App-header'>
        <img src={kbg} alt="Logo Aplications"/>
          
      </div>
      <Routes>
        <Route path="Inicio" element={<Inicio />} />
        <Route path="/libro" element={<ListaLibros />} />
        <Route path="/autor" element={<ListaAutores />} />
      </Routes>
    </Router>
  );
}

export default App;
