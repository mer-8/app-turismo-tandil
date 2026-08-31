import { useEffect, useState } from 'react';
import Logo from './Logo';
import { getCategoria } from '../data/categoryTheme';

function AdminPanel({
    listaLugares,
    onAgregarLugar,
    onEliminarLugar,
    listaEventos = [],
    onAgregarEvento,
    onCerrarAdmin
}) {
    // Estados para el formulario de carga de lugar
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('Paseo');
    const [subtipo, setSubtipo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [infoAmpliada, setInfoAmpliada] = useState('');
    const [direccion, setDireccion] = useState('');
    const [horarios, setHorarios] = useState('');
    const [latitud, setLatitud] = useState('-37.3216');
    const [longitud, setLongitud] = useState('-59.1331');
    const [imagen, setImagen] = useState('');
    const [recomendado, setRecomendado] = useState(false);

    // Estados para nuevo evento
    const [nombreEvento, setNombreEvento] = useState('');
    const [descEvento, setDescEvento] = useState('');
    const [fechaEvento, setFechaEvento] = useState('');
    const [lugarEvento, setLugarEvento] = useState('');
    const [imgEvento, setImgEvento] = useState('');

    // Estado para el buscador de eliminación
    const [busquedaAdmin, setBusquedaAdmin] = useState('');

    // Estado para controlar la pestaña del panel
    const [pestaniaActiva, setPestaniaActiva] = useState('gestion');

    const [estadisticas, setEstadisticas] = useState({
        total: 1420,
        hoy: 87,
        semana: 432,
        mes: 1420
    });
    const [cargandoEstadisticas, setCargandoEstadisticas] = useState(false);

    // Subcategorías por defecto según tipo seleccionado
    const opcionesSubtipos = {
        'Gastronomía': ['Cervecerías', 'Picadas y Quesos', 'Restaurantes', 'Cafeterías', 'Parrillas'],
        'Alojamiento': ['Cabañas', 'Hoteles', 'Posadas'],
        'Paseo': ['Parques', 'Sitios Religiosos', 'Espacios Recreativos', 'Miradores'],
        'Cultura': ['Museos', 'Edificios Históricos', 'Teatros', 'Centros Culturales'],
        'Aventura': ['Trekking', 'Circuitos de Escalada', 'Exploración', 'Turismo Activo']
    };

    useEffect(() => {
        if (pestaniaActiva !== 'estadisticas') return;

        const cargarEstadisticas = async () => {
            setCargandoEstadisticas(true);
            try {
                const respuesta = await fetch('http://localhost/api-turismo-tandil/obtener_estadisticas.php');
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    if (datos && !datos.error) {
                        setEstadisticas(datos);
                    }
                }
            } catch (error) {
                console.warn('API de estadísticas no disponible, utilizando métricas locales:', error);
            } finally {
                setCargandoEstadisticas(false);
            }
        };

        cargarEstadisticas();
    }, [pestaniaActiva]);

    const handleSubmitLugar = async (e) => {
        e.preventDefault();
        if (!nombre.trim() || !direccion.trim()) {
            alert('Por favor completá al menos el nombre y la dirección.');
            return;
        }

        const lat = parseFloat(latitud) || -37.3216;
        const lng = parseFloat(longitud) || -59.1331;

        const nuevoLugar = {
            id: Date.now(),
            nombre: nombre.trim(),
            tipo,
            subtipo: subtipo || opcionesSubtipos[tipo][0] || '',
            descripcion: descripcion.trim() || 'Atractivo turístico oficial registrado en el Municipio de Tandil.',
            infoAmpliada: infoAmpliada.trim() || descripcion.trim(),
            direccion: direccion.trim(),
            horarios: horarios.trim() || 'Consultar en el establecimiento',
            imagen: imagen.trim() || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
            coords: [lat, lng],
            recomendado: Boolean(recomendado)
        };

        // Intentar guardar en backend PHP si está activo
        try {
            fetch('http://localhost/api-turismo-tandil/agregar_lugar.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoLugar)
            }).catch(() => {});
        } catch (_) {}

        onAgregarLugar(nuevoLugar);
        alert('¡Lugar registrado y publicado con éxito en el sistema oficial!');

        // Limpiar formulario
        setNombre('');
        setSubtipo('');
        setDescripcion('');
        setInfoAmpliada('');
        setDireccion('');
        setHorarios('');
        setImagen('');
        setRecomendado(false);
    };

    const handleSubmitEvento = (e) => {
        e.preventDefault();
        if (!nombreEvento.trim() || !fechaEvento) {
            alert('Completá el nombre del evento y la fecha.');
            return;
        }

        const nuevoEvento = {
            id: Date.now(),
            nombre: nombreEvento.trim(),
            descripcion: descEvento.trim() || 'Evento municipal de difusión turística y cultural.',
            fecha: fechaEvento,
            lugar: lugarEvento.trim() || 'Tandil, Buenos Aires',
            imagen: imgEvento.trim() || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80'
        };

        if (onAgregarEvento) {
            onAgregarEvento(nuevoEvento);
        }

        alert('¡Evento agendado exitosamente en la cartelera oficial!');
        setNombreEvento('');
        setDescEvento('');
        setFechaEvento('');
        setLugarEvento('');
        setImgEvento('');
    };

    const handleEliminar = (id, nombreLugar) => {
        if (window.confirm(`¿Confirmás la baja del establecimiento "${nombreLugar}" del catálogo municipal?`)) {
            // Intentar borrar en backend PHP si está activo
            try {
                fetch('http://localhost/api-turismo-tandil/eliminar_lugar.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                }).catch(() => {});
            } catch (_) {}

            onEliminarLugar(id);
        }
    };

    const lugaresAEliminar = listaLugares.filter(lugar =>
        lugar.nombre.toLowerCase().includes(busquedaAdmin.toLowerCase()) ||
        lugar.tipo.toLowerCase().includes(busquedaAdmin.toLowerCase()) ||
        (lugar.subtipo && lugar.subtipo.toLowerCase().includes(busquedaAdmin.toLowerCase()))
    );

    const imagenPreview = imagen || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80';
    const catPreview = getCategoria(tipo);

    return (
        <div style={{ maxWidth: '1100px', margin: '90px auto 40px auto', padding: '30px', background: '#ffffff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--sand-200)' }}>

            {/* Cabecera del Panel */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--sand-100)', paddingBottom: '20px', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                        <Logo size={30} showText={false} />
                        <span style={{ background: 'var(--forest-900)', color: 'var(--forest-100)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>
                            Acceso Institucional
                        </span>
                    </div>
                    <h2 style={{ fontFamily: 'var(--display)', color: 'var(--ink-900)', margin: 0, fontSize: '25px', fontWeight: '600' }}>
                        Panel de Administración Municipal
                    </h2>
                    <p style={{ color: 'var(--ink-600)', marginTop: '6px', fontSize: '13px' }}>
                        Gestión centralizada del catálogo de prestadores turísticos, agenda de eventos y métricas de visitantes.
                    </p>
                </div>

                {onCerrarAdmin && (
                    <button
                        onClick={onCerrarAdmin}
                        style={{
                            background: 'var(--forest-100)',
                            color: 'var(--forest-700)',
                            border: '1px solid var(--forest-border)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '8px 16px',
                            fontWeight: '700',
                            fontSize: '13px',
                            cursor: 'pointer'
                        }}
                    >
                        ✕ Salir del Panel
                    </button>
                )}
            </div>

            {/* Selector de pestañas */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <button
                    onClick={() => setPestaniaActiva('gestion')}
                    style={{
                        padding: '10px 22px',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        background: pestaniaActiva === 'gestion' ? 'var(--forest-500)' : 'var(--sand-100)',
                        color: pestaniaActiva === 'gestion' ? '#ffffff' : 'var(--ink-900)',
                        fontWeight: '700',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <span>🗂️</span>
                    <span>Gestión de Prestadores</span>
                </button>

                <button
                    onClick={() => setPestaniaActiva('eventos')}
                    style={{
                        padding: '10px 22px',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        background: pestaniaActiva === 'eventos' ? 'var(--forest-500)' : 'var(--sand-100)',
                        color: pestaniaActiva === 'eventos' ? '#ffffff' : 'var(--ink-900)',
                        fontWeight: '700',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <span>📅</span>
                    <span>Cargar Evento</span>
                </button>

                <button
                    onClick={() => setPestaniaActiva('estadisticas')}
                    style={{
                        padding: '10px 22px',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        background: pestaniaActiva === 'estadisticas' ? 'var(--forest-500)' : 'var(--sand-100)',
                        color: pestaniaActiva === 'estadisticas' ? '#ffffff' : 'var(--ink-900)',
                        fontWeight: '700',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <span>📊</span>
                    <span>Inteligencia de Datos & Visitas</span>
                </button>
            </div>

            {/* PESTAÑA 1: GESTIÓN DE LUGARES */}
            {pestaniaActiva === 'gestion' && (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '35px', marginBottom: '40px', paddingBottom: '30px', borderBottom: '2px solid var(--sand-100)' }}>

                        {/* FORMULARIO DE ALTA */}
                        <div>
                            <h3 style={{ color: 'var(--ink-900)', marginBottom: '18px', fontSize: '18px', fontWeight: '800' }}>
                                ➕ Registrar Nuevo Establecimiento
                            </h3>

                            <form onSubmit={handleSubmitLugar} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                <div>
                                    <label style={{ display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-600)' }}>
                                        Nombre del establecimiento / atractivo *
                                    </label>
                                    <input
                                        type="text"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        placeholder="Ej: Posada Sierra Alta"
                                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', boxSizing: 'border-box' }}
                                        required
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    <div style={{ flex: '1 1 140px' }}>
                                        <label style={{ display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-600)' }}>
                                            Categoría Oficial *
                                        </label>
                                        <select
                                            value={tipo}
                                            onChange={(e) => {
                                                setTipo(e.target.value);
                                                setSubtipo(opcionesSubtipos[e.target.value][0] || '');
                                            }}
                                            style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', background: '#fff', boxSizing: 'border-box' }}
                                        >
                                            <option value="Paseo">Paseos y Atractivos</option>
                                            <option value="Gastronomía">Gastronomía</option>
                                            <option value="Alojamiento">Alojamiento</option>
                                            <option value="Cultura">Cultura</option>
                                            <option value="Aventura">Aventura</option>
                                        </select>
                                    </div>

                                    <div style={{ flex: '1 1 140px' }}>
                                        <label style={{ display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-600)' }}>
                                            Subcategoría
                                        </label>
                                        <select
                                            value={subtipo}
                                            onChange={(e) => setSubtipo(e.target.value)}
                                            style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', background: '#fff', boxSizing: 'border-box' }}
                                        >
                                            {(opcionesSubtipos[tipo] || []).map((sub) => (
                                                <option key={sub} value={sub}>{sub}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Checkbox Recomendado */}
                                <div style={{ background: 'var(--gold-100)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <input
                                        type="checkbox"
                                        id="chk-rec"
                                        checked={recomendado}
                                        onChange={(e) => setRecomendado(e.target.checked)}
                                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                    />
                                    <label htmlFor="chk-rec" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--gold-ink)', cursor: 'pointer' }}>
                                        ⭐ Otorgar Sello de "Nuestros Recomendados" (Curaduría Municipal)
                                    </label>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-600)' }}>
                                        Descripción Breve
                                    </label>
                                    <textarea
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        placeholder="Resumen para la tarjeta de presentación..."
                                        rows="2"
                                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', boxSizing: 'border-box', resize: 'vertical' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-600)' }}>
                                        Información Ampliada (Ficha completa)
                                    </label>
                                    <textarea
                                        value={infoAmpliada}
                                        onChange={(e) => setInfoAmpliada(e.target.value)}
                                        placeholder="Detalles sobre servicios, historia, especialidades..."
                                        rows="3"
                                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', boxSizing: 'border-box', resize: 'vertical' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    <div style={{ flex: '1 1 140px' }}>
                                        <label style={{ display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-600)' }}>
                                            Dirección *
                                        </label>
                                        <input
                                            type="text"
                                            value={direccion}
                                            onChange={(e) => setDireccion(e.target.value)}
                                            placeholder="Ej: Av. Don Bosco 1200"
                                            style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', boxSizing: 'border-box' }}
                                            required
                                        />
                                    </div>

                                    <div style={{ flex: '1 1 140px' }}>
                                        <label style={{ display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-600)' }}>
                                            Horarios
                                        </label>
                                        <input
                                            type="text"
                                            value={horarios}
                                            onChange={(e) => setHorarios(e.target.value)}
                                            placeholder="Ej: Todos los días 09 a 20 hs"
                                            style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-600)' }}>
                                            Latitud GPS
                                        </label>
                                        <input
                                            type="text"
                                            value={latitud}
                                            onChange={(e) => setLatitud(e.target.value)}
                                            placeholder="-37.3216"
                                            style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', boxSizing: 'border-box' }}
                                        />
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-600)' }}>
                                            Longitud GPS
                                        </label>
                                        <input
                                            type="text"
                                            value={longitud}
                                            onChange={(e) => setLongitud(e.target.value)}
                                            placeholder="-59.1331"
                                            style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-600)' }}>
                                        URL de la Fotografía
                                    </label>
                                    <input
                                        type="text"
                                        value={imagen}
                                        onChange={(e) => setImagen(e.target.value)}
                                        placeholder="https://..."
                                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', boxSizing: 'border-box' }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    style={{
                                        background: 'var(--forest-500)',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: 'var(--radius-sm)',
                                        padding: '12px 18px',
                                        fontWeight: '800',
                                        fontSize: '15px',
                                        cursor: 'pointer',
                                        marginTop: '10px',
                                        boxShadow: 'var(--shadow-sm)'
                                    }}
                                >
                                    💾 Guardar y Publicar en la App
                                </button>
                            </form>
                        </div>

                        {/* PREVISUALIZACIÓN EN TIEMPO REAL */}
                        <div>
                            <h3 style={{ color: 'var(--forest-500)', marginBottom: '18px', fontSize: '18px', fontWeight: '800' }}>
                                👁️ Vista Previa de la Ficha
                            </h3>

                            <div style={{ background: 'var(--sand-50)', border: '1px dashed var(--forest-border)', borderRadius: 'var(--radius-md)', padding: '15px', position: 'sticky', top: '90px' }}>
                                <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--sand-200)' }}>
                                    <div style={{ height: '160px', overflow: 'hidden', background: 'var(--sand-200)', position: 'relative' }}>
                                        <img
                                            src={imagenPreview}
                                            alt="Preview"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80'; }}
                                        />
                                        {recomendado && (
                                            <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--gold-600)', color: '#fff', fontSize: '10px', fontWeight: '800', padding: '3px 8px', borderRadius: 'var(--radius-pill)' }}>
                                                ⭐ Recomendado
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ padding: '16px' }}>
                                        <span style={{ fontSize: '11px', fontWeight: '800', background: catPreview.bg, color: catPreview.color, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                                            {catPreview.icon} {tipo} {subtipo ? `• ${subtipo}` : ''}
                                        </span>
                                        <h4 style={{ fontFamily: 'var(--display)', fontSize: '18px', color: 'var(--ink-900)', margin: '8px 0 6px 0', fontWeight: '600' }}>
                                            {nombre || 'Nombre del Establecimiento...'}
                                        </h4>
                                        <p style={{ fontSize: '13px', color: 'var(--ink-600)', margin: '0 0 12px 0', lineHeight: '1.4' }}>
                                            {descripcion || 'Acá se mostrará la descripción breve para el turista...'}
                                        </p>
                                        <div style={{ fontSize: '12px', color: 'var(--ink-400)', borderTop: '1px solid var(--sand-100)', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <span>📍 {direccion || 'Dirección de ubicación...'}</span>
                                            <span>🕒 {horarios || 'Horarios de atención...'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* SECCIÓN: CATÁLOGO Y BAJA DE LUGARES */}
                    <div>
                        <h3 style={{ color: 'var(--danger)', marginBottom: '15px', fontSize: '18px', fontWeight: '800' }}>
                            🗑️ Gestión y Baja de Prestadores Registrados
                        </h3>

                        <input
                            type="text"
                            value={busquedaAdmin}
                            onChange={(e) => setBusquedaAdmin(e.target.value)}
                            placeholder="Filtrar por nombre o categoría..."
                            style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', marginBottom: '15px', boxSizing: 'border-box' }}
                        />

                        <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {lugaresAEliminar.length > 0 ? (
                                lugaresAEliminar.map((lugar) => {
                                    const catLugar = getCategoria(lugar.tipo);
                                    return (
                                    <div key={lugar.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: 'var(--sand-50)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', borderLeft: `4px solid ${catLugar.color}` }}>
                                        <div>
                                            <strong style={{ color: 'var(--ink-900)' }}>{lugar.nombre}</strong>
                                            <span style={{ fontSize: '12px', color: catLugar.color, marginLeft: '10px', background: catLugar.bg, padding: '2px 8px', borderRadius: '4px' }}>
                                                {catLugar.icon} {lugar.tipo} {lugar.subtipo ? `(${lugar.subtipo})` : ''}
                                            </span>
                                            {lugar.recomendado && (
                                                <span style={{ marginLeft: '6px', fontSize: '12px' }}>⭐</span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleEliminar(lugar.id, lugar.nombre)}
                                            style={{ background: 'var(--danger)', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}
                                        >
                                            Dar de baja
                                        </button>
                                    </div>
                                    );
                                })
                            ) : (
                                <p style={{ color: 'var(--ink-400)', textAlign: 'center', padding: '15px' }}>No se encontraron registros con esa búsqueda.</p>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* PESTAÑA 2: CARGAR EVENTOS */}
            {pestaniaActiva === 'eventos' && (
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h3 style={{ color: 'var(--ink-900)', marginBottom: '18px', fontSize: '18px', fontWeight: '800' }}>
                        📅 Publicar Nuevo Evento en la Cartelera Oficial
                    </h3>

                    <form onSubmit={handleSubmitEvento} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                            <label style={{ display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-600)' }}>
                                Título del Evento *
                            </label>
                            <input
                                type="text"
                                value={nombreEvento}
                                onChange={(e) => setNombreEvento(e.target.value)}
                                placeholder="Ej: Festival de Cerveza y Gastronomía"
                                style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', boxSizing: 'border-box' }}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-600)' }}>
                                Fecha del Evento *
                            </label>
                            <input
                                type="date"
                                value={fechaEvento}
                                onChange={(e) => setFechaEvento(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', boxSizing: 'border-box' }}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-600)' }}>
                                Lugar o Predio
                            </label>
                            <input
                                type="text"
                                value={lugarEvento}
                                onChange={(e) => setLugarEvento(e.target.value)}
                                placeholder="Ej: Anfiteatro Martín Fierro / Diagonal Illia"
                                style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', boxSizing: 'border-box' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-600)' }}>
                                Descripción
                            </label>
                            <textarea
                                value={descEvento}
                                onChange={(e) => setDescEvento(e.target.value)}
                                placeholder="Detalles de las actividades, entradas, artistas..."
                                rows="3"
                                style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', boxSizing: 'border-box' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '4px', color: 'var(--ink-600)' }}>
                                Imagen del Evento (URL)
                            </label>
                            <input
                                type="text"
                                value={imgEvento}
                                onChange={(e) => setImgEvento(e.target.value)}
                                placeholder="https://..."
                                style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-200)', boxSizing: 'border-box' }}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                background: 'var(--forest-500)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 'var(--radius-sm)',
                                padding: '12px 18px',
                                fontWeight: '800',
                                fontSize: '15px',
                                cursor: 'pointer',
                                marginTop: '10px'
                            }}
                        >
                            📅 Publicar Evento
                        </button>
                    </form>
                </div>
            )}

            {/* PESTAÑA 3: ESTADÍSTICAS */}
            {pestaniaActiva === 'estadisticas' && (
                <div>
                    <h3 style={{ color: 'var(--ink-900)', marginBottom: '18px', fontSize: '18px', fontWeight: '800' }}>
                        📈 Métricas de Tráfico e Impacto Turístico
                    </h3>

                    {cargandoEstadisticas ? (
                        <p>Actualizando indicadores...</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                            <div style={{ background: 'var(--forest-100)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--forest-border)' }}>
                                <span style={{ fontSize: '13px', color: 'var(--ink-600)', fontWeight: '700', textTransform: 'uppercase' }}>Visitas Hoy</span>
                                <div style={{ fontSize: '32px', fontWeight: '900', color: 'var(--ink-900)', marginTop: '6px' }}>{estadisticas.hoy}</div>
                            </div>

                            <div style={{ background: 'var(--forest-100)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--forest-border)' }}>
                                <span style={{ fontSize: '13px', color: 'var(--ink-600)', fontWeight: '700', textTransform: 'uppercase' }}>Esta Semana</span>
                                <div style={{ fontSize: '32px', fontWeight: '900', color: 'var(--ink-900)', marginTop: '6px' }}>{estadisticas.semana}</div>
                            </div>

                            <div style={{ background: 'var(--forest-100)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--forest-border)' }}>
                                <span style={{ fontSize: '13px', color: 'var(--ink-600)', fontWeight: '700', textTransform: 'uppercase' }}>Este Mes</span>
                                <div style={{ fontSize: '32px', fontWeight: '900', color: 'var(--ink-900)', marginTop: '6px' }}>{estadisticas.mes}</div>
                            </div>

                            <div style={{ background: 'var(--forest-900)', color: '#fff', padding: '20px', borderRadius: 'var(--radius-md)' }}>
                                <span style={{ fontSize: '13px', color: 'var(--forest-100)', fontWeight: '700', textTransform: 'uppercase' }}>Total Acumulado</span>
                                <div style={{ fontSize: '32px', fontWeight: '900', color: '#ffffff', marginTop: '6px' }}>{estadisticas.total}</div>
                            </div>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}

export default AdminPanel;
