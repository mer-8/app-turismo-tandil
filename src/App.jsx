import { useEffect, useState } from 'react';
//import { lugaresTandil } from './data/tandilData';
import CityMap from './components/CityMap.jsx';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Filtros from './components/Filtros';
import CardLugar from './components/CardLugar';
import ModalDetalle from './components/ModalDetalle';
import AdminPanel from './components/AdminPanel';

function App() {
    const [busqueda, setBusqueda] = useState("");
    const [installPrompt, setInstallPrompt] = useState(null);
    const [vistaActiva, setVistaActiva] = useState('inicio');
    const [categoria, setCategoria] = useState("");
    const [subCategoria, setSubCategoria] = useState("");
    const [lugarSeleccionado, setLugarSeleccionado] = useState(null);
    
    // Lista de lugares (puedes agregar nuevos desde el admin)
    const [listaLugares, setListaLugares] = useState([]);
    const [, setCargando] = useState(true);

    const [favoritos, setFavoritos] = useState(() => {
        const guardados = localStorage.getItem('tandil_favoritos');
        return guardados ? JSON.parse(guardados) : [];
    });

    const [verFavoritos, setVerFavoritos] = useState(false);

    //Cargar la base de datos desde PHP al montar la app
    useEffect(() => {
        const cargarLugaresBD = async () => {
            try {
                const respuesta = await fetch('http://localhost/api-turismo-tandil/obtener_lugares.php');
                if (!respuesta.ok) throw new Error('Error al conectar con la API');
                
                const datos = await respuesta.json();
                setListaLugares(datos); // Guardamos la lista de MySQL en el estado
            } catch (error) {
                console.error('Error cargando base de datos:', error);
            } finally {
                setCargando(false);
            }
        };

        cargarLugaresBD();
    }, []);

    //Sincronizar los favoritos en el LocalStorage
    useEffect(() => {
        localStorage.setItem('tandil_favoritos', JSON.stringify(favoritos));
    }, [favoritos]);

    //Manejo de la instalación de la PWA
    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setInstallPrompt(event);
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
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

    const toggleFavorito = (idLugar) => {
        if (favoritos.includes(idLugar)) {
            setFavoritos(favoritos.filter(id => id !== idLugar));
        } else {
            setFavoritos([...favoritos, idLugar]);
        }
    };

    const agregarLugar = (nuevoLugar) => {
        setListaLugares([nuevoLugar, ...listaLugares]);
    };

    const eliminarLugar = (idLugar) => {
        setListaLugares(listaLugares.filter(lugar => lugar.id !== idLugar));
    };

    
    const abrirAdminSecreto = () => {
        const password = prompt("Ingresá la contraseña de administración:");
        if (password === "admin123") { // TODO: ELIMINAR CONTRASEÑA Haganme ACORDAR
            setVistaActiva('admin');
        } else if (password !== null) {
            alert("Contraseña incorrecta.");
        }
    };

    // Filtrado avanzado sobre la lista actual de lugares
    const lugaresFiltrados = listaLugares.filter(lugar => {
        const coincideBusqueda = lugar.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                                 lugar.tipo.toLowerCase().includes(busqueda.toLowerCase());
        
        const coincideCategoria = categoria === "" || lugar.tipo.toLowerCase() === categoria.toLowerCase();
        const coincideSubCategoria = subCategoria === "" || (lugar.subtipo && lugar.subtipo.toLowerCase() === subCategoria.toLowerCase());
        const coincideFavorito = !verFavoritos || favoritos.includes(lugar.id);

        return coincideBusqueda && coincideCategoria && coincideSubCategoria && coincideFavorito;
    });

    return (
        <div style={{ background: '#efede6', minHeight: '100vh', paddingBottom: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

            <div>
                {/* Navbar Componente (Sin botón de admin visible) */}
                <Navbar 
                    vistaActiva={vistaActiva} 
                    setVistaActiva={setVistaActiva} 
                    verFavoritos={verFavoritos} 
                    setVerFavoritos={setVerFavoritos} 
                />

                {/* Renderizado según la vista activa */}
                {vistaActiva === 'inicio' && (
                    <>
                        <Hero busqueda={busqueda} setBusqueda={setBusqueda} />
                        <Filtros 
                            categoria={categoria} 
                            setCategoria={setCategoria} 
                            subCategoria={subCategoria} 
                            setSubCategoria={setSubCategoria} 
                        />

                        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
                            <h3 style={{ fontSize: '22px', color: '#1a3322', marginBottom: '20px' }}>
                                {verFavoritos ? 'Tus Lugares Favoritos' : 'Puntos Destacados'}
                            </h3>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                gap: '25px',
                                marginBottom: '50px'
                            }}>
                                {lugaresFiltrados.length > 0 ? (
                                    lugaresFiltrados.map((lugar) => (
                                        <CardLugar 
                                            key={lugar.id}
                                            lugar={lugar}
                                            onVerDetalle={(l) => setLugarSeleccionado(l)}
                                            esFavorito={favoritos.includes(lugar.id)}
                                            onToggleFavorito={toggleFavorito}
                                        />
                                    ))
                                ) : (
                                    <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888', fontSize: '16px' }}>
                                        {verFavoritos ? 'No tenés lugares guardados en favoritos todavía.' : 'No se encontraron lugares.'}
                                    </p>
                                )}
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <button
                                    onClick={instalarApp}
                                    style={{
                                        maxWidth: '600px',
                                        padding: '16px 20px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        background: '#5d7d65',
                                        color: '#ffffff',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(93, 125, 101, 0.3)',
                                        transition: 'background 0.3s'
                                    }}
                                >
                                    Instalar app en el celular
                                </button>
                            </div>
                        </main>
                    </>
                )}

                {vistaActiva === 'mapa' && (
                    <div style={{ paddingTop: '100px' }}>
                        <CityMap lugares={listaLugares}/>
                    </div>
                )}

                {vistaActiva === 'admin' && (
                    <AdminPanel 
                        listaLugares={listaLugares} 
                        onAgregarLugar={agregarLugar} 
                        onEliminarLugar={eliminarLugar} 
                    />
                )}
            </div>

            {/* Modal de Detalle */}
            <ModalDetalle 
                lugar={lugarSeleccionado} 
                onClose={() => setLugarSeleccionado(null)} 
            />

            {/* Footer con Acceso Oculto (Doble clic para entrar al admin) */}
            <footer style={{ textAlign: 'center', padding: '30px 20px 10px 20px', color: '#777', fontSize: '13px' }}>
                <p 
                    onDoubleClick={abrirAdminSecreto}
                    style={{ cursor: 'default', userSelect: 'none', margin: 0 }}
                    title="Panel municipal"
                >
                    © 2026 Tandil Turismo - Todos los derechos reservados.
                </p>
            </footer>
        </div>
    );
}

export default App;