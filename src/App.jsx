import { useEffect, useState } from 'react';
import { lugaresTandil } from './data/tandilData';
import './App.css';
//tengan en cuenta q x usar vite la pagina se actualiza sola ni bien guardas sin recargar
function App() {
  const [busqueda, setBusqueda] = useState("");
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const instalarApp = async () => {
    if (!installPrompt) {
      alert('Si no aparece la instalación automática, podés agregar la app desde el menú del navegador.');
      return;
    }

    installPrompt.prompt();

    const resultado = await installPrompt.userChoice;

    if (resultado.outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  const lugaresFiltrados = lugaresTandil.filter(lugar =>
    lugar.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    lugar.tipo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f4f6f8', minHeight: '100vh', paddingBottom: '40px' }}>
      
      <header style={{ background: '#ffffff', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '20px' }}>Tandil Turismo 🌲</h2>
        <nav style={{ display: 'flex', gap: '15px', fontSize: '14px', color: '#555', fontWeight: 'bold' }}>
          <span style={{ cursor: 'pointer', color: '#007bff' }}>Inicio</span>
          <span style={{ cursor: 'pointer' }}>Mapa</span>
          <span style={{ cursor: 'pointer' }}>Ayuda</span>
        </nav>
      </header>

      {/* 2. Cmedio */}
      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        
        {/* Buscador */}
        <div style={{ marginBottom: '25px' }}>
          <input 
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="¿a donde vamos?"
            style={{ width: '100%', padding: '12px 15px', borderRadius: '25px', border: '1px solid #ccc', fontSize: '14px', outline: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
          />
        </div>

       {/* es lo de abajo qsy sumen o borren pero fijense de q si cambian el diseño modifiquen todas jaja */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', overflowX: 'auto' }}>
          <div style={{ flex: 1, background: '#d4edda', padding: '10px 15px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer', border: '1px solid #c3e6cb', color: '#155724', fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap' }}>
            paseos
          </div>
          <div style={{ flex: 1, background: '#d4edda', padding: '10px 15px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer', border: '1px solid #c3e6cb', color: '#155724', fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap' }}>
             Gastronomía
          </div>
          <div style={{ flex: 1, background: '#d4edda', padding: '10px 15px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer', border: '1px solid #c3e6cb', color: '#155724', fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap' }}>
             Cultura
          </div>
        </div>

        {/* lugares estan en tandildata borren o hagan lo q quieran */}
        <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '15px' }}>Puntos Destacados</h3>
        
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {lugaresFiltrados.length > 0 ? (
                lugaresFiltrados.map((lugar) => (
                  <div key={lugar.id} style={{ background: '#9fd8b5', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '16px', color: '#2c3e50' }}>{lugar.nombre}</h4>
                      <span style={{ background: '#eef2f7', color: '#555', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>
                        {lugar.tipo}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.4' }}>{lugar.descripcion}</p>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', color: '#888', fontSize: '14px' }}>No se encontraron lugares con ese nombre.</p>
              )}
            </div>
            
            <button
              onClick={instalarApp}
              style={{
                width: '100%',
                marginTop: '30px',
                padding: '14px 18px',
                border: 'none',
                borderRadius: '25px',
                background: '#2c3e50',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 3px 8px rgba(0,0,0,0.15)'
              }}
            >
              Instalar app en el celular
            </button>

          </main>
        </div>
      );

}

export default App; //esto implica q es princiapl esta pagina