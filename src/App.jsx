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
    const [vistaActiva, setVistaActiva] = useState('inicio'); // 'inicio', 'eventos', 'mapa', 'favoritos', 'admin'
    const [categoria, setCategoria] = useState("");
    const [subCategoria, setSubCategoria] = useState("");
    const [soloRecomendados, setSoloRecomendados] = useState(false);
    const [lugarSeleccionado, setLugarSeleccionado] = useState(null);
    
    // Modales y widgets interactivos
    const [mostrarAsistenteIA, setMostrarAsistenteIA] = useState(false);
    const [mostrarModalQR, setMostrarModalQR] = useState(false);
    const [mostrarAvisoPush, setMostrarAvisoPush] = useState(true);

    // Lista de lugares
    const [listaLugares, setListaLugares] = useState(() => {
        const guardados = localStorage.getItem('tandil_catalogo_lugares');
        if (guardados) {
            try { return JSON.parse(guardados); } catch (_) { return lugaresMock; }
        }
        return lugaresMock;
    });

    // Lista de eventos
    const [listaEventos, setListaEventos] = useState(() => {
        const eventosGuardados = localStorage.getItem('tandil_eventos');
        if (eventosGuardados) {
            try { return JSON.parse(eventosGuardados); } catch (_) { return eventosMock; }
        }
        return eventosMock;
    });

    // Favoritos
    const [favoritos, setFavoritos] = useState(() => {
        const guardados = localStorage.getItem('tandil_favoritos');
        return guardados ? JSON.parse(guardados) : [];
    });

    useEffect(() => {
        localStorage.setItem('tandil_catalogo_lugares', JSON.stringify(listaLugares));
    }, [listaLugares]);

    useEffect(() => {
        localStorage.setItem('tandil_eventos', JSON.stringify(listaEventos));
    }, [listaEventos]);

    useEffect(() => {
        localStorage.setItem('tandil_favoritos', JSON.stringify(favoritos));
    }, [favoritos]);

    // Manejo PWA
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

    // Filtrado unificado en la pantalla de inicio
    const lugaresFiltrados = listaLugares.filter(lugar => {
        const coincideBusqueda = 
            lugar.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            lugar.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
            (lugar.subtipo && lugar.subtipo.toLowerCase().includes(busqueda.toLowerCase())) ||
            (lugar.descripcion && lugar.descripcion.toLowerCase().includes(busqueda.toLowerCase()));

        const coincideCategoria = 
            categoria === "" || 
            lugar.tipo.toLowerCase() === categoria.toLowerCase();

        const coincideSubCategoria = 
            subCategoria === "" || 
            (lugar.subtipo && lugar.subtipo.toLowerCase() === subCategoria.toLowerCase());

        const coincideRecomendado = 
            !soloRecomendados || Boolean(lugar.recomendado);

        const coincideFavorito = 
            vistaActiva !== 'favoritos' || favoritos.includes(lugar.id);

        return coincideBusqueda && coincideCategoria && coincideSubCategoria && coincideRecomendado && coincideFavorito;
    });

    // Agrupar eventos
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
        <div style={{ background: 'var(--sand-50)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            <Navbar
                vistaActiva={vistaActiva} 
                setVistaActiva={setVistaActiva} 
                cantidadFavoritos={favoritos.length}
            />

            {/* Banner Push */}
            {mostrarAvisoPush && (
                <div style={{
                    marginTop: '68px',
                    background: 'var(--terracotta-600)',
                    color: '#fff',
                    padding: '10px 20px',
                    fontSize: '13px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: '600'
                }}>
                    <span><strong>Aviso Oficial de Temporada:</strong> ¡Próxima Fiesta del Queso Tandilero en Diagonal Illia! Consultá la agenda de eventos.</span>
                    <button onClick={() => setMostrarAvisoPush(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>✕</button>
                </div>
            )}

            {/* VISTA: INICIO */}
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
                            <h3 style={{ fontFamily: 'var(--display)', fontSize: '24px', color: 'var(--ink-900)', margin: 0, fontWeight: '600' }}>
                                {soloRecomendados ? 'Puntos Recomendados Oficiales' : categoria ? `${categoria} en Tandil` : 'Puntos Destacados'}
                            </h3>
                            <span style={{ fontSize: '13px', color: 'var(--forest-500)', fontWeight: '700' }}>
                                {lugaresFiltrados.length} {lugaresFiltrados.length === 1 ? 'establecimiento' : 'establecimientos encontrados'}
                            </span>
                        </div>

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
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px 20px', background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--forest-border)' }}>
                                    <p style={{ color: 'var(--ink-600)', fontSize: '16px', margin: '0 0 10px 0' }}>No se encontraron lugares con los filtros seleccionados.</p>
                                    <button onClick={() => { setCategoria(''); setSubCategoria(''); setBusqueda(''); setSoloRecomendados(false); }} style={{ background: 'var(--forest-500)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 'bold' }}>
                                        Restablecer todos los filtros
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            )}

            {/* VISTA: EVENTOS */}
            {vistaActiva === 'eventos' && (
                <main style={{ flex: 1, maxWidth: '1100px', margin: '90px auto 40px auto', padding: '0 15px', width: '100%', boxSizing: 'border-box' }}>
                    <h2 style={{ fontFamily: 'var(--display)', fontSize: '28px', color: 'var(--ink-900)', fontWeight: '600', margin: '0 0 8px 0' }}>Agenda Oficial de Eventos y Festividades</h2>
                    <p style={{ color: 'var(--ink-600)', fontSize: '14px', margin: '0 0 30px 0' }}>Calendario de fiestas regionales, festivales gastronómicos y actividades culturales en Tandil.</p>

                    {Object.keys(eventosPorMes).map((mes) => (
                        <div key={mes} style={{ marginBottom: '40px' }}>
                            <h3 style={{ fontSize: '20px', color: 'var(--forest-600)', borderBottom: '2px solid var(--forest-500)', paddingBottom: '8px', marginBottom: '20px', fontWeight: '800' }}>{mes}</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                                {eventosPorMes[mes].map((evento) => (
                                    <div key={evento.id} style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', border: '1px solid var(--sand-200)' }}>
                                        <div style={{ height: '160px', background: 'var(--forest-100)', backgroundImage: evento.imagen ? `url(${evento.imagen})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                                        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                            <span style={{ fontSize: '12px', color: 'var(--forest-700)', fontWeight: '800', background: 'var(--forest-100)', padding: '3px 8px', borderRadius: '4px', width: 'fit-content', marginBottom: '8px' }}>{evento.fecha}</span>
                                            <h4 style={{ fontFamily: 'var(--display)', margin: '0 0 10px 0', fontSize: '19px', color: 'var(--ink-900)', fontWeight: '600' }}>{evento.nombre}</h4>
                                            <p style={{ margin: '0 0 14px 0', fontSize: '14px', color: 'var(--ink-600)', lineHeight: '1.5', flex: 1 }}>{evento.descripcion}</p>
                                            <div style={{ fontSize: '12px', color: 'var(--ink-400)', borderTop: '1px solid var(--sand-100)', paddingTop: '10px' }}><strong>Lugar:</strong> {evento.lugar}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </main>
            )}

            {/* VISTA: MAPA */}
            {vistaActiva === 'mapa' && (
                <main style={{ flex: 1, paddingTop: '85px' }}>
                    <CityMap lugares={listaLugares} onVerDetalle={(l) => setLugarSeleccionado(l)} />
                </main>
            )}

            {/* VISTA: FAVORITOS */}
            {vistaActiva === 'favoritos' && (
                <main style={{ flex: 1, maxWidth: '1100px', margin: '90px auto 40px auto', padding: '0 15px', width: '100%', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                        <div>
                            <h2 style={{ fontFamily: 'var(--display)', fontSize: '28px', color: 'var(--ink-900)', fontWeight: '600', margin: '0 0 6px 0' }}>Mis Lugares Favoritos & Itinerario</h2>
                            <p style={{ color: 'var(--ink-600)', fontSize: '14px', margin: 0 }}>Tus puntos guardados en este dispositivo para armar tu recorrido por Tandil.</p>
                        </div>
                        {favoritos.length > 0 && (
                            <button onClick={() => setMostrarAsistenteIA(true)} style={{ background: 'var(--forest-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', padding: '10px 18px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
                                Armar Itinerario con IA
                            </button>
                        )}
                    </div>

                    {lugaresFiltrados.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                            {lugaresFiltrados.map((lugar) => (
                                <CardLugar key={lugar.id} lugar={lugar} onVerDetalle={(l) => setLugarSeleccionado(l)} esFavorito={true} onToggleFavorito={toggleFavorito} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--forest-border)' }}>
                            <h3 style={{ fontFamily: 'var(--display)', color: 'var(--ink-900)', margin: '0 0 8px 0', fontSize: '19px', fontWeight: '600' }}>Todavía no guardaste ningún lugar en favoritos</h3>
                            <p style={{ color: 'var(--ink-600)', fontSize: '14px', margin: '0 0 20px 0' }}>Podés tocar el corazón en cualquier tarjeta del catálogo para armar tu lista de viaje.</p>
                            <button onClick={() => setVistaActiva('inicio')} style={{ background: 'var(--forest-500)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 'var(--radius-sm)', fontWeight: '700', cursor: 'pointer' }}>Explorar Catálogo</button>
                        </div>
                    )}
                </main>
            )}

            {/* VISTA: ADMIN MUNICIPAL */}
            {vistaActiva === 'admin' && (
                <main style={{ flex: 1, paddingTop: '85px' }}>
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

            {/* MODALES Y ASISTENTE */}
            {lugarSeleccionado && <ModalDetalle lugar={lugarSeleccionado} onClose={() => setLugarSeleccionado(null)} esFavorito={favoritos.includes(lugarSeleccionado.id)} onToggleFavorito={toggleFavorito} />}
            {mostrarAsistenteIA && <AsistenteIA lugares={listaLugares} onVerDetalle={(l) => { setMostrarAsistenteIA(false); setLugarSeleccionado(l); }} onClose={() => setMostrarAsistenteIA(false)} />}
            {mostrarModalQR && <ModalQR onClose={() => setMostrarModalQR(false)} />}

            {/* Botón flotante IA */}
            <button onClick={() => setMostrarAsistenteIA(true)} style={{ position: 'fixed', bottom: '25px', right: '25px', background: 'linear-gradient(135deg, var(--forest-900) 0%, var(--forest-600) 100%)', color: '#fff', border: '2px solid var(--terracotta-600)', borderRadius: 'var(--radius-pill)', padding: '12px 20px', fontWeight: '800', fontSize: '14px', boxShadow: 'var(--shadow-lg)', cursor: 'pointer', zIndex: 999, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>✦</span> Asistente IA
            </button>

            <Footer 
            onAbrirAdminSecreto={abrirAdminSecreto} onAbrirModalQR={() => setMostrarModalQR(true)} />
        </div>
    );
}

export default App;
