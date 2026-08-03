import { lugaresTandil } from './data/tandilData';
import './App.css';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Turismo y Servicios de Tandil</h1>
      <p>Bienvenidos a su primer labubu!! lunghi puto.</p>
      
      <h2>Puntos de Interés Destacados</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {lugaresTandil.map((lugar) => (
          <div key={lugar.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3>{lugar.nombre}</h3>
            <span style={{ background: '#e0e0e0', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{lugar.tipo}</span>
            <p style={{ marginTop: '10px' }}>{lugar.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;