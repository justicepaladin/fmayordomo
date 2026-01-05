import './App.css';
import avatarImage from './assets/avatar.jpg'; // 1. Importa la imagen
import calcularDiferenciaEntreFechas from './utils/dayCounter';

function App() {
  return (
    <div className="container">
      <h1 className="title">Facundo Mayordomo</h1>
      {/* 2. Usa la variable importada en el atributo src */}
      <img src={avatarImage} alt="Avatar" className="avatar" />
      <h1 className="title">Website under construction</h1>
      <p className="subtitle">You just lost The Game</p>
      <p className="subtitle">Página {calcularDiferenciaEntreFechas()} de 365</p>
    </div>
  );
}

export default App;

