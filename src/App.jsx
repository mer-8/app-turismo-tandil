import { useEffect, useState } from 'react';
import CityMap from './components/CityMap.jsx';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Filtros from './components/Filtros';
import CardLugar from './components/CardLugar';
import ModalDetalle from './components/ModalDetalle';
import AdminPanel from './components/AdminPanel';
import { eventosMock } from './eventsMock';
import logoAetermia from './assets/logo.png';
import { lugaresMock } from './lugaresMock';

function App() {
    const [busqueda, setBusqueda] = useState("");
    const [installPrompt, setInstallPrompt] = useState(null);
    const [vistaActiva, setVistaActiva] = useState('inicio');
    const [categoria, setCategoria] = useState("");
    const [subCategoria, setSubCategoria] = useState("");
    const [lugarSeleccionado, setLugarSeleccionado] = useState(null);
    
    // Lista de lugares y eventos
    const [listaLugares, setListaLugares] = useState([]);
    const [listaEventos, setListaEventos] = useState([]);
    const [, setCargando] = useState(true);

    const [favoritos, setFavoritos] = useState(() => {
        const guardados = localStorage.getItem('tandil_favoritos');
        return guardados ? JSON.parse(guardados) : [];
    });

    const [verFavoritos, setVerFavoritos] = useState(false);

    // Cargar datos al montar la app (con mocks prioritarios y base de datos comentada)
    useEffect(() => {
        // Cargamos los mocks de inmediato para que la demo funcione perfecta
        setListaEventos(eventosMock);
        setListaLugares(lugaresMock);
        setCargando(false);

        /* 
        // CÓDIGO ORIGINAL COMENTADO (Por si querés usarlo después con XAMPP)
        const cargarLugaresBD = async () => {
            try {
                const respuesta = await fetch('http://localhost/api-turismo-tandil/obtener_lugares.php');
                if (!respuesta.ok) throw new Error('Error al conectar con la API');
                const datos = await respuesta.json();
                setListaLugares(datos);
            } catch (error) {
                console.error('Error cargando base de datos (usando local):', error);
            } finally {
                setCargando(false);
            }
        };
        cargarLugaresBD();

        const cargarEventosBD = async () => {
            try {
                const respuesta = await fetch('http://localhost/api-turismo-tandil/obtener_eventos.php');
                if (!respuesta.ok) throw new Error('Error al conectar con la API de eventos');
                const datos = await respuesta.json();
                setListaEventos(datos);
            } catch (error) {
                console.error('Error cargando eventos:', error);
            }
        };
        cargarEventosBD();
        */
    }, []);

    // Sincronizar los favoritos en el LocalStorage
    useEffect(() => {
        localStorage.setItem('tandil_favoritos', JSON.stringify(favoritos));
    }, [favoritos]);

    // Manejo de la instalación de la PWA
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
        if (password === "admin123") {
            setVistaActiva('admin');
        } else if (password !== null) {
            alert("Contraseña incorrecta.");
        }
    };

    // Filtrado avanzado sobre la lista actual de lugares (con soporte para Recomendados y Subtipos)
    const lugaresFiltrados = listaLugares.filter(lugar => {
        const coincideBusqueda = lugar.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                                 lugar.tipo.toLowerCase().includes(busqueda.toLowerCase());
        
        const coincideCategoria = categoria === "" || lugar.tipo.toLowerCase() === categoria.toLowerCase();
        
        let coincideSubCategoria = true;
        if (subCategoria !== "") {
            if (subCategoria === "Recomendado") {
                coincideSubCategoria = lugar.recomendado === true;
            } else {
                coincideSubCategoria = lugar.subtipo && lugar.subtipo.toLowerCase() === subCategoria.toLowerCase();
            }
        }

        const coincideFavorito = !verFavoritos || favoritos.includes(lugar.id);

        return coincideBusqueda && coincideCategoria && coincideSubCategoria && coincideFavorito;
    });

    // Agrupar eventos por mes y año
    const eventosPorMes = listaEventos.reduce((acumulador, evento) => {
        const fechaObj = new Date(evento.fecha + 'T00:00:00');
        const mesAnio = fechaObj.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
        const mesFormateado = mesAnio.charAt(0).toUpperCase() + mesAnio.slice(1);

        if (!acumulador[mesFormateado]) {
            acumulador[mesFormateado] = [];
        }
        acumulador[mesFormateado].push(evento);
        return acumulador;
    }, {});

    return (
        <div style={{ background: '#efede6', minHeight: '100vh', paddingBottom: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

            <div>
                <Navbar 
                    vistaActiva={vistaActiva} 
                    setVistaActiva={setVistaActiva} 
                    verFavoritos={verFavoritos} 
                    setVerFavoritos={setVerFavoritos} 
                />

                {vistaActiva === 'inicio' && (
                    <>
                        <Hero busqueda={busqueda} setBusqueda={setBusqueda} />
                        <Filtros 
                            categoria={categoria} 
                            setCategoria={setCategoria} 
                            subCategoria={subCategoria} 
                            setSubCategoria={setSubCategoria} 
                        />

                        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 15px' }}>
                            <h3 style={{ fontSize: '22px', color: '#1a3322', marginBottom: '20px' }}>
                                {verFavoritos ? 'Tus Lugares Favoritos' : 'Puntos Destacados'}
                            </h3>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                                gap: '20px',
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
                                        width: '100%',
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

                {vistaActiva === 'eventos' && (
                    <main style={{ maxWidth: '1100px', margin: '100px auto 40px auto', padding: '0 15px' }}>
                        <h2 style={{ fontSize: '26px', color: '#1a3322', marginBottom: '30px' }}>
                            📅 Próximos Eventos en Tandil
                        </h2>
                        
                        {Object.keys(eventosPorMes).length > 0 ? (
                            Object.keys(eventosPorMes).map((mes) => (
                                <div key={mes} style={{ marginBottom: '40px' }}>
                                    <h3 style={{ 
                                        fontSize: '20px', 
                                        color: '#5d7d65', 
                                        borderBottom: '2px solid #5d7d65', 
                                        paddingBottom: '8px', 
                                        marginBottom: '20px',
                                        textTransform: 'capitalize'
                                    }}>
                                        {mes}
                                    </h3>

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                                        gap: '20px'
                                    }}>
                                        {eventosPorMes[mes].map((evento) => (
                                            <div key={evento.id} style={{
                                                background: '#e6efe9',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}>
                                                <div style={{
                                                    height: '140px',
                                                    background: '#c4d7cd',
                                                    backgroundImage: evento.imagen ? `url(${evento.imagen})` : 'none',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}></div>
                                                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                    <span style={{ fontSize: '13px', color: '#6d8a74', fontWeight: 'bold', marginBottom: '6px' }}>
                                                         {evento.fecha} •  {evento.lugar}
                                                    </span>
                                                    <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#1a3322' }}>
                                                        {evento.nombre}
                                                    </h4>
                                                    <p style={{ margin: 0, fontSize: '14px', color: '#4a5b51', lineHeight: '1.5' }}>
                                                        {evento.descripcion}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', color: '#888', fontSize: '16px' }}>
                                No hay eventos programados por el momento.
                            </p>
                        )}
                    </main>
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

            {/* Footer Institucional Profesional */}
            <footer style={{ 
                width: '100%',
                padding: '40px 50px', 
                background: '#e3dfd4', 
                color: '#4a5b51', 
                fontSize: '13px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '30px',
                alignItems: 'center',
                boxSizing: 'border-box',
                borderTop: '1px solid #d4cfc4',
                marginTop: '60px'
            }}>
                {/* Columna 1: Info Institucional */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <strong style={{ fontSize: '15px', color: '#1a3322' }}>Municipio de Tandil</strong>
                    <p style={{ margin: 0, color: '#6d8a74', lineHeight: '1.4' }}>
                        Dirección de Turismo • Sistema Oficial de Gestión e Información Turística.
                    </p>
                    <span style={{ fontSize: '11px', color: '#888' }}>
                        Expediente N° NO-2026-00039427-MUNITAN-SSG#SG
                    </span>
                </div>

                {/* Columna 2: Copyright y Acceso Oculto */}
                <div style={{ textAlign: 'center' }}>
                    <p 
                        onDoubleClick={abrirAdminSecreto}
                        style={{ cursor: 'default', userSelect: 'none', margin: '0 0 5px 0', fontWeight: '600', color: '#1a3322' }}
                        title="Panel municipal"
                    >
                        © 2026 Tandil Turismo. Todos los derechos reservados.
                    </p>
                    <span style={{ fontSize: '12px', color: '#777' }}>
                        Desarrollado bajo estándares PWA Offline-First.
                    </span>
                </div>

                {/* Columna 3: Logo de la desarrolladora con su tamaño original destacado */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <img 
                        src={logoAetermia} 
                        alt="Aetermia Logo" 
                        style={{ 
                            height: '65px',        
                            maxWidth: '240px',    
                            objectFit: 'contain'
                        }} 
                    />
                </div>
            </footer>
        </div>
    );
}

export default App;