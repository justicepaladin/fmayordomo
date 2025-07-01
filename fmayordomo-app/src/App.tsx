import './App.css';
import avatarImage from './assets/avatar.jpg'; // 1. Importa la imagen

function App() {
  return (
    <div className="container">
      {/* 2. Usa la variable importada en el atributo src */}
      <img src={avatarImage} alt="Avatar" className="avatar" />
      <h1 className="title">Website under construction</h1>
      <p className="subtitle">You just lost The Game</p>
    </div>
  );
}

export default App;