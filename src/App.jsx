import { useEffect, useState } from 'react';
import CityMap from './components/CityMap.jsx';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Filtros from './components/Filtros';
import CardLugar from './components/CardLugar';
import ModalDetalle from './components/ModalDetalle';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import AsistenteIA from './components/AsistenteIA';
import ModalQR from './components/ModalQR';
import { lugaresMock } from './lugaresMock';
import { eventosMock } from './eventsMock';

function App() {
    const [busqueda, setBusqueda] = useState("");
    const [installPrompt, setInstallPrompt] = useState(null);
    const [vistaActiva, setVistaActiva] = useState('inicio'); // 'inicio', 'alojamiento', 'eventos', 'mapa', 'favoritos', 'admin'
    const [categoria, setCategoria] = useState("");
    const [subCategoria, setSubCategoria] = useState("");
    const [soloRecomendados, setSoloRecomendados] = useState(false);
    const [lugarSeleccionado, setLugarSeleccionado] = useState(null);
    
    // Modales y widgets interactivos
    const [mostrarAsistenteIA, setMostrarAsistenteIA] = useState(false);
    const [mostrarModalQR, setMostrarModalQR] = useState(false);
    const [mostrarAvisoPush, setMostrarAvisoPush] = useState(true);

    // Lista de lugares: Inicializado con lugaresMock + persistencia local / API
    const [listaLugares, setListaLugares] = useState(() => {
        const guardados = localStorage.getItem('tandil_catalogo_lugares');
        if (guardados) {
            try {
                return JSON.parse(guardados);
            } catch (_) {
                return lugaresMock;
            }
        }
        return lugaresMock;
    });

    // Lista de eventos
    const [listaEventos, setListaEventos] = useState(() => {
        const eventosGuardados = localStorage.getItem('tandil_eventos');
        if (eventosGuardados) {
            try {
                return JSON.parse(eventosGuardados);
            } catch (_) {
                return eventosMock;
            }
        }
        return eventosMock;
    });

    // Favoritos persistentes en LocalStorage
    const [favoritos, setFavoritos] = useState(() => {
        const guardados = localStorage.getItem('tandil_favoritos');
        return guardados ? JSON.parse(guardados) : [];
    });

    // Sincronizar catálogo y favoritos en LocalStorage
    useEffect(() => {
        localStorage.setItem('tandil_catalogo_lugares', JSON.stringify(listaLugares));
    }, [listaLugares]);

    useEffect(() => {
        localStorage.setItem('tandil_eventos', JSON.stringify(listaEventos));
    }, [listaEventos]);

    useEffect(() => {
        localStorage.setItem('tandil_favoritos', JSON.stringify(favoritos));
    }, [favoritos]);

    // Registrar visita y cargar API si está disponible
    useEffect(() => {
        if (!sessionStorage.getItem('visita_registrada')) {
            fetch('http://localhost/api-turismo-tandil/registrar_visita.php')
                .catch(() => {});
            sessionStorage.setItem('visita_registrada', 'true');
        }

        const sincronizarConAPI = async () => {
            try {
                const respuesta = await fetch('http://localhost/api-turismo-tandil/obtener_lugares.php');
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    if (Array.isArray(datos) && datos.length > 0) {
                        setListaLugares(datos);
                    }
                }
            } catch (_) {
                // Modo offline o sin backend PHP local - lugaresMock ya está activo
            }
        };

        sincronizarConAPI();
    }, []);

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
            alert('Podés instalar la aplicación oficial tocando "Agregar a la pantalla principal" en el menú de tu navegador.');
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

    const agregarEvento = (nuevoEvento) => {
        setListaEventos([nuevoEvento, ...listaEventos]);
    };

    const abrirAdminSecreto = () => {
        const password = prompt("Ingresá la clave institucional de administración municipal:");
        if (password === "admin123") {
            setVistaActiva('admin');
        } else if (password !== null) {
            alert("Clave incorrecta. Acceso restringido al personal municipal.");
        }
    };

    // Si el usuario elige la vista "Alojamiento" desde el navbar
    const categoriaEfectiva = vistaActiva === 'alojamiento' ? 'Alojamiento' : categoria;

    // Filtrado de lugares según búsqueda, categoría, subcategoría, recomendados y favoritos
    const lugaresFiltrados = listaLugares.filter(lugar => {
        const coincideBusqueda = 
            lugar.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            lugar.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
            (lugar.subtipo && lugar.subtipo.toLowerCase().includes(busqueda.toLowerCase())) ||
            (lugar.descripcion && lugar.descripcion.toLowerCase().includes(busqueda.toLowerCase()));

        const coincideCategoria = 
            categoriaEfectiva === "" || 
            lugar.tipo.toLowerCase() === categoriaEfectiva.toLowerCase();

        const coincideSubCategoria = 
            subCategoria === "" || 
            (lugar.subtipo && lugar.subtipo.toLowerCase() === subCategoria.toLowerCase());

        const coincideRecomendado = 
            !soloRecomendados || Boolean(lugar.recomendado);

        const coincideFavorito = 
            vistaActiva !== 'favoritos' || favoritos.includes(lugar.id);

        return coincideBusqueda && coincideCategoria && coincideSubCategoria && coincideRecomendado && coincideFavorito;
    });

    // Agrupar eventos por mes y año cronológico
    const eventosPorMes = listaEventos.reduce((acumulador, evento) => {
        const fechaObj = new Date(evento.fecha + 'T00:00:00');
        const mesAnio = isNaN(fechaObj.getTime())
            ? 'Próximamente'
            : fechaObj.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
        const mesFormateado = mesAnio.charAt(0).toUpperCase() + mesAnio.slice(1);

        if (!acumulador[mesFormateado]) {
            acumulador[mesFormateado] = [];
        }
        acumulador[mesFormateado].push(evento);
        return acumulador;
    }, {});

    return (
        <div style={{ background: '#efede6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            
            {/* Barra de Navegación Institucional */}
            <Navbar 
                vistaActiva={vistaActiva} 
                setVistaActiva={(vista) => {
                    setVistaActiva(vista);
                    if (vista === 'alojamiento') {
                        setCategoria('Alojamiento');
                        setSubCategoria('');
                    } else if (vista === 'inicio') {
                        setCategoria('');
                        setSubCategoria('');
                    }
                }} 
                cantidadFavoritos={favoritos.length}
                onAbrirAsistenteIA={() => setMostrarAsistenteIA(true)}
            />

            {/* Banner de Notificaciones Push / Alertas Oficiales (Roadmap Item #1) */}
            {mostrarAvisoPush && (
                <div style={{
                    marginTop: '70px',
                    background: '#1a3322',
                    color: '#adddbd',
                    padding: '10px 20px',
                    fontSize: '13px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: '600'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span><strong>Aviso Oficial de Temporada:</strong> ¡Próxima Fiesta del Queso Tandilero en Diagonal Illia! Consultá la agenda de eventos.</span>
                    </div>
                    <button
                        onClick={() => setMostrarAvisoPush(false)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#adddbd',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* VISTA 1: INICIO & CATÁLOGO */}
            {vistaActiva === 'inicio' && (
                <main style={{ flex: 1, paddingBottom: '50px' }}>
                    <Hero busqueda={busqueda} setBusqueda={setBusqueda} />
                    
                    <Filtros 
                        categoria={categoria} 
                        setCategoria={setCategoria} 
                        subCategoria={subCategoria} 
                        setSubCategoria={setSubCategoria}
                        soloRecomendados={soloRecomendados}
                        setSoloRecomendados={setSoloRecomendados}
                    />

                    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                            <h3 style={{ fontSize: '22px', color: '#1a3322', margin: 0, fontWeight: '800' }}>
                                {soloRecomendados ? 'Puntos Recomendados Oficiales' : categoria ? `${categoria} en Tandil` : 'Puntos Destacados'}
                            </h3>
                            <span style={{ fontSize: '13px', color: '#6d8a74', fontWeight: '700' }}>
                                {lugaresFiltrados.length} {lugaresFiltrados.length === 1 ? 'establecimiento' : 'establecimientos encontrados'}
                            </span>
                        </div>

                        {/* Grilla de Prestadores */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '24px',
                            marginBottom: '40px'
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
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px 20px', background: '#fff', borderRadius: '12px', border: '1px dashed #ccc' }}>
                                    <p style={{ color: '#666', fontSize: '16px', margin: '0 0 10px 0' }}>
                                        No se encontraron lugares con los filtros seleccionados.
                                    </p>
                                    <button
                                        onClick={() => { setCategoria(''); setSubCategoria(''); setBusqueda(''); setSoloRecomendados(false); }}
                                        style={{ background: '#5d7d65', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        Restablecer todos los filtros
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Banner PWA Instalación */}
                        <div style={{
                            background: 'linear-gradient(135deg, #ffffff 0%, #f4f7f5 100%)',
                            borderRadius: '16px',
                            padding: '30px',
                            border: '1px solid #dce4de',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '20px'
                        }}>
                            <div>
                                <h4 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#1a3322', fontWeight: '800' }}>
                                    Llevá la Guía Oficial de Tandil en tu Teléfono
                                </h4>
                                <p style={{ margin: 0, fontSize: '13px', color: '#55655c' }}>
                                    Accedé sin conexión a los mapas, circuitos serranos y prestadores sin consumir datos.
                                </p>
                            </div>
                            <button
                                onClick={instalarApp}
                                style={{
                                    padding: '14px 24px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: '#5d7d65',
                                    color: '#ffffff',
                                    fontSize: '15px',
                                    fontWeight: '800',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(93, 125, 101, 0.35)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <span>Instalar App Oficial</span>
                            </button>
                        </div>
                    </div>
                </main>
            )}

            {/* VISTA 2: SECCIÓN ESPECÍFICA DE ALOJAMIENTO */}
            {vistaActiva === 'alojamiento' && (
                <main style={{ flex: 1, maxWidth: '1100px', margin: '90px auto 40px auto', padding: '0 15px', width: '100%', boxSizing: 'border-box' }}>
                    <div style={{ background: '#ffffff', borderRadius: '16px', padding: '25px', marginBottom: '25px', border: '1px solid #e1ded3' }}>
                        <h2 style={{ fontSize: '24px', color: '#1a3322', margin: '0 0 6px 0', fontWeight: '800' }}>
                             Guía Oficial de Alojamiento en Tandil
                        </h2>
                        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 20px 0' }}>
                            Cabañas en las sierras, hoteles céntricos de categoría y posadas de campo habilitadas.
                        </p>

                        <Filtros 
                            categoria="Alojamiento"
                            setCategoria={setCategoria}
                            subCategoria={subCategoria}
                            setSubCategoria={setSubCategoria}
                            soloRecomendados={soloRecomendados}
                            setSoloRecomendados={setSoloRecomendados}
                        />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '24px'
                    }}>
                        {lugaresFiltrados.map((lugar) => (
                            <CardLugar 
                                key={lugar.id}
                                lugar={lugar}
                                onVerDetalle={(l) => setLugarSeleccionado(l)}
                                esFavorito={favoritos.includes(lugar.id)}
                                onToggleFavorito={toggleFavorito}
                            />
                        ))}
                    </div>
                </main>
            )}

            {/* VISTA 3: AGENDA DE EVENTOS OFICIALES */}
            {vistaActiva === 'eventos' && (
                <main style={{ flex: 1, maxWidth: '1100px', margin: '90px auto 40px auto', padding: '0 15px', width: '100%', boxSizing: 'border-box' }}>
                    <div style={{ marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '26px', color: '#1a3322', fontWeight: '800', margin: '0 0 8px 0' }}>
                            Agenda Oficial de Eventos y Festividades
                        </h2>
                        <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                            Calendario de fiestas regionales, festivales gastronómicos y actividades culturales en Tandil.
                        </p>
                    </div>

                    {Object.keys(eventosPorMes).length > 0 ? (
                        Object.keys(eventosPorMes).map((mes) => (
                            <div key={mes} style={{ marginBottom: '40px' }}>
                                <h3 style={{
                                    fontSize: '20px',
                                    color: '#5d7d65',
                                    borderBottom: '2px solid #5d7d65',
                                    paddingBottom: '8px',
                                    marginBottom: '20px',
                                    fontWeight: '800'
                                }}>
                                    {mes}
                                </h3>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                    gap: '24px'
                                }}>
                                    {eventosPorMes[mes].map((evento) => (
                                        <div key={evento.id} style={{
                                            background: '#ffffff',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            border: '1px solid #e2ded2'
                                        }}>
                                            <div style={{
                                                height: '160px',
                                                backgroundImage: evento.imagen ? `url(${evento.imagen})` : 'none',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                background: '#c4d7cd'
                                            }} />
                                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                    <span style={{ fontSize: '12px', color: '#5d7d65', fontWeight: '800', background: '#e6efe9', padding: '3px 8px', borderRadius: '4px' }}>
                                                         {evento.fecha}
                                                    </span>
                                                    {evento.horario && (
                                                        <span style={{ fontSize: '12px', color: '#666' }}>
                                                             {evento.horario}
                                                        </span>
                                                    )}
                                                </div>

                                                <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#1a3322', fontWeight: '700' }}>
                                                    {evento.nombre}
                                                </h4>

                                                <p style={{ margin: '0 0 14px 0', fontSize: '14px', color: '#55655c', lineHeight: '1.5', flex: 1 }}>
                                                    {evento.descripcion}
                                                </p>

                                                <div style={{ fontSize: '12px', color: '#7a8b80', borderTop: '1px solid #f0eee6', paddingTop: '10px' }}>
                                                     <strong>Lugar:</strong> {evento.lugar}
                                                </div>
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

            {/* VISTA 4: MAPA TURÍSTICO GEORREFERENCIADO */}
            {vistaActiva === 'mapa' && (
                <main style={{ flex: 1, paddingTop: '85px' }}>
                    <CityMap 
                        lugares={listaLugares} 
                        onVerDetalle={(l) => setLugarSeleccionado(l)}
                    />
                </main>
            )}

            {/* VISTA 5: FAVORITOS E ITINERARIO PERSONALIZADO */}
            {vistaActiva === 'favoritos' && (
                <main style={{ flex: 1, maxWidth: '1100px', margin: '90px auto 40px auto', padding: '0 15px', width: '100%', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                        <div>
                            <h2 style={{ fontSize: '26px', color: '#1a3322', fontWeight: '800', margin: '0 0 6px 0' }}>
                                Mis Lugares Favoritos & Itinerario
                            </h2>
                            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                                Tus puntos guardados en este dispositivo para armar tu recorrido por Tandil.
                            </p>
                        </div>

                        {favoritos.length > 0 && (
                            <button
                                onClick={() => setMostrarAsistenteIA(true)}
                                style={{
                                    background: '#5d7d65',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px 18px',
                                    fontWeight: '700',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <span>Armar Itinerario con IA</span>
                            </button>
                        )}
                    </div>

                    {lugaresFiltrados.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '24px'
                        }}>
                            {lugaresFiltrados.map((lugar) => (
                                <CardLugar 
                                    key={lugar.id}
                                    lugar={lugar}
                                    onVerDetalle={(l) => setLugarSeleccionado(l)}
                                    esFavorito={true}
                                    onToggleFavorito={toggleFavorito}
                                />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: '16px', border: '1px dashed #c9d8ce' }}>
                            <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}></span>
                            <h3 style={{ color: '#1a3322', margin: '0 0 8px 0', fontSize: '18px' }}>
                                Todavía no guardaste ningún lugar en favoritos
                            </h3>
                            <p style={{ color: '#666', fontSize: '14px', margin: '0 0 20px 0' }}>
                                Podés tocar el corazón en cualquier tarjeta del catálogo para armar tu lista de viaje.
                            </p>
                            <button
                                onClick={() => setVistaActiva('inicio')}
                                style={{
                                    background: '#5d7d65',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    fontWeight: '700',
                                    fontSize: '14px',
                                    cursor: 'pointer'
                                }}
                            >
                                Explorar Catálogo de Puntos
                            </button>
                        </div>
                    )}
                </main>
            )}

            {/* VISTA 6: PANEL DE ADMINISTRACIÓN INSTITUCIONAL */}
            {vistaActiva === 'admin' && (
                <main style={{ flex: 1 }}>
                    <AdminPanel 
                        listaLugares={listaLugares} 
                        onAgregarLugar={agregarLugar} 
                        onEliminarLugar={eliminarLugar}
                        listaEventos={listaEventos}
                        onAgregarEvento={agregarEvento}
                        onCerrarAdmin={() => setVistaActiva('inicio')}
                    />
                </main>
            )}

            {/* MODALES FLOTANTES */}
            {lugarSeleccionado && (
                <ModalDetalle 
                    lugar={lugarSeleccionado} 
                    onClose={() => setLugarSeleccionado(null)} 
                    esFavorito={favoritos.includes(lugarSeleccionado.id)}
                    onToggleFavorito={toggleFavorito}
                />
            )}

            {mostrarAsistenteIA && (
                <AsistenteIA 
                    lugares={listaLugares} 
                    onVerDetalle={(l) => {
                        setMostrarAsistenteIA(false);
                        setLugarSeleccionado(l);
                    }}
                    onClose={() => setMostrarAsistenteIA(false)} 
                />
            )}

            {mostrarModalQR && (
                <ModalQR onClose={() => setMostrarModalQR(false)} />
            )}

            {/* Botón flotante para Asistente IA */}
            <button
                onClick={() => setMostrarAsistenteIA(true)}
                title="Abrir Asistente Virtual con IA de Tandil"
                style={{
                    position: 'fixed',
                    bottom: '25px',
                    right: '25px',
                    background: 'linear-gradient(135deg, #1a3322 0%, #3e5444 100%)',
                    color: '#adddbd',
                    border: '2px solid #5d7d65',
                    borderRadius: '50px',
                    padding: '12px 20px',
                    fontWeight: '800',
                    fontSize: '14px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    zIndex: 999,
                    transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <span style={{ fontSize: '20px' }}></span>
                <span>Asistente IA</span>
            </button>

            {/* Pie de Página Institucional */}
            <Footer 
                onAbrirAdminSecreto={abrirAdminSecreto}
                onAbrirModalQR={() => setMostrarModalQR(true)}
            />
        </div>
    );
}

export default App;
