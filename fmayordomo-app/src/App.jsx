import { Routes, Route } from 'react-router-dom';
import './App.css';
import avatarImage from './assets/avatar.jpg'; // 1. Importa la imagen
import calcularDiferenciaEntreFechas from './utils/dayCounter';
import { PRIMERO_DE_ENERO, DIAS_EN_EL_ANIO, MI_NACIMIENTO } from './utils/dates';
import LovePage from './components/LovePage';

function Home() {
  return (
    <div className="container">
      <h1 className="title">Facundo Mayordomo</h1>
      {/* 2. Usa la variable importada en el atributo src */}
      <img src={avatarImage} alt="Avatar" className="avatar" />
      <h1 className="title">Website under construction</h1>
      <p className="subtitle">You just lost The Game</p>
      <p className="subtitle">Página {calcularDiferenciaEntreFechas(PRIMERO_DE_ENERO)} de {DIAS_EN_EL_ANIO}</p>
      <p className="subtitle">{calcularDiferenciaEntreFechas(MI_NACIMIENTO)}</p>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/e" element={<LovePage />} />
    </Routes>
  );
}

export default App;

