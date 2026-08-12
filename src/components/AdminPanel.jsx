import { useState } from 'react';

function AdminPanel({ listaLugares, onAgregarLugar, onEliminarLugar }) {
    // Estados para el formulario de carga
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('Paseo');
    const [subtipo, setSubtipo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [direccion, setDireccion] = useState('');
    const [horarios, setHorarios] = useState('');
    const [imagen, setImagen] = useState('');

    // Estado para el buscador de eliminación
    const [busquedaAdmin, setBusquedaAdmin] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombre || !direccion) {
            alert('Por favor completá al menos el nombre y la dirección.');
            return;
        }

      const nuevoLugar = {
            nombre,
            tipo,
            subtipo,
            descripcion,
            infoAmpliada: descripcion,
            direccion,
            horarios,
            imagen: imagen || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
        };
        
        try {
            const respuesta = await fetch('http://localhost/api-turismo-tandil/agregar_lugar.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoLugar)
            });

            const resultado = await respuesta.json();

            if (resultado.exito) {
                onAgregarLugar(resultado.lugar); // Agrega a la vista el objeto guardado con ID de MySQL
                alert('¡Lugar guardado con éxito en la base de datos!');
                
                // Limpiar formulario
                setNombre('');
                setSubtipo('');
                setDescripcion('');
                setDireccion('');
                setHorarios('');
                setImagen('');
            } else {
                alert('Error al guardar: ' + resultado.error);
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('No se pudo conectar con el servidor.');
        }


       /* onAgregarLugar(nuevoLugar);
        alert('¡Lugar agregado con éxito!');
        
        // Limpiar formulario
        setNombre('');
        setSubtipo('');
        setDescripcion('');
        setDireccion('');
        setHorarios('');
        setImagen('');*/
    };

    // Filtrar lugares para el panel de borrado
    const lugaresAEliminar = listaLugares.filter(lugar => 
        lugar.nombre.toLowerCase().includes(busquedaAdmin.toLowerCase()) ||
        lugar.tipo.toLowerCase().includes(busquedaAdmin.toLowerCase())
    );

    const handleEliminar = (id, nombreLugar) => {
        if (window.confirm(`¿Estás seguro de que querés eliminar "${nombreLugar}"?`)) {
            onEliminarLugar(id);
        }
    };

    // Imagen de respaldo para la previsualización si está vacío
    const imagenPreview = imagen || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb';

    return (
        <div style={{ maxWidth: '1100px', margin: '120px auto 40px auto', padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
            <h2 style={{ color: '#1a3322', marginBottom: '10px', fontSize: '26px' }}>Panel de Administración Municipal</h2>
            <p style={{ color: '#666', marginBottom: '30px', fontSize: '14px' }}>Gestión de contenidos y previsualización en tiempo real.</p>

            {/* CONTENEDOR PRINCIPAL EN DOS COLUMNAS (Formulario + Preview) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', marginBottom: '40px', paddingBottom: '30px', borderBottom: '2px solid #eee' }}>
                
                {/* SECCIÓN 1: CARGAR NUEVO LUGAR */}
                <div>
                    <h3 style={{ color: '#5d7d65', marginBottom: '20px', fontSize: '20px' }}>➕ Cargar Nuevo Lugar</h3>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Nombre del lugar</label>
                            <input 
                                type="text" 
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                                placeholder="Ej: Cerro El Centinela" 
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none' }}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Categoría</label>
                                <select 
                                    value={tipo} 
                                    onChange={(e) => setTipo(e.target.value)}
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff' }}
                                >
                                    <option value="Paseo">Paseo</option>
                                    <option value="Gastronomía">Gastronomía</option>
                                    <option value="Cultura">Cultura</option>
                                    <option value="Aventura">Aventura</option>
                                </select>
                            </div>

                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Subtipo (opcional)</label>
                                <input 
                                    type="text" 
                                    value={subtipo} 
                                    onChange={(e) => setSubtipo(e.target.value)} 
                                    placeholder="Ej: Cervecería" 
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Descripción</label>
                            <textarea 
                                value={descripcion} 
                                onChange={(e) => setDescripcion(e.target.value)} 
                                placeholder="Breve descripción del atractivo..." 
                                rows="3"
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', resize: 'vertical' }}
                            ></textarea>
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Dirección</label>
                                <input 
                                    type="text" 
                                    value={direccion} 
                                    onChange={(e) => setDireccion(e.target.value)} 
                                    placeholder="Ej: Av. Santamarina 450" 
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                                    required
                                />
                            </div>

                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Horarios</label>
                                <input 
                                    type="text" 
                                    value={horarios} 
                                    onChange={(e) => setHorarios(e.target.value)} 
                                    placeholder="Ej: 9 a 20hs" 
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>URL de Imagen (opcional)</label>
                            <input 
                                type="text" 
                                value={imagen} 
                                onChange={(e) => setImagen(e.target.value)} 
                                placeholder="https://..." 
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                            />
                        </div>

                        <button 
                            type="submit"
                            style={{
                                background: '#5d7d65',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '12px',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                cursor: 'pointer',
                                marginTop: '10px',
                                transition: 'background 0.2s'
                            }}
                        >
                            Guardar y Publicar Lugar
                        </button>
                    </form>
                </div>

                {/* TARJETA DE PREVISUALIZACIÓN */}
                <div>
                    <h3 style={{ color: '#5d7d65', marginBottom: '20px', fontSize: '20px' }}>👁️ Previsualización</h3>
                    <div style={{ background: '#fdfcf7', border: '1px dashed #b5c2b8', borderRadius: '10px', padding: '15px', position: 'sticky', top: '20px' }}>
                        <div style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.06)', border: '1px solid #e1e1db' }}>
                            <div style={{ height: '160px', overflow: 'hidden', background: '#ddd' }}>
                                <img 
                                    src={imagenPreview} 
                                    alt="Preview" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'; }}
                                />
                            </div>
                            <div style={{ padding: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 'bold', background: '#e2dfd2', color: '#444', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                                        {tipo} {subtipo ? `• ${subtipo}` : ''}
                                    </span>
                                </div>
                                <h4 style={{ fontSize: '18px', color: '#1a3322', margin: '0 0 8px 0' }}>
                                    {nombre || 'Nombre del lugar...'}
                                </h4>
                                <p style={{ fontSize: '13px', color: '#666', margin: '0 0 12px 0', lineHeight: '1.4' }}>
                                    {descripcion ? (descripcion.length > 80 ? descripcion.substring(0, 80) + '...' : descripcion) : 'Acá se va a mostrar la descripción breve del atractivo turístico que cargues en el formulario...'}
                                </p>
                                <div style={{ fontSize: '12px', color: '#777', borderTop: '1px solid #eee', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <span>📍 {direccion || 'Dirección...'}</span>
                                    <span>🕒 {horarios || 'Horarios...'}</span>
                                </div>
                            </div>
                        </div>
                        <p style={{ fontSize: '11px', color: '#888', textAlign: 'center', marginTop: '10px' }}>Así se verá la tarjeta en la pantalla principal.</p>
                    </div>
                </div>

            </div>

            {/* SECCIÓN 2: BUSCAR Y ELIMINAR LUGARES */}
            <div>
                <h3 style={{ color: '#c0392b', marginBottom: '15px', fontSize: '20px' }}>🗑️ Gestionar / Eliminar Lugares</h3>
                <input 
                    type="text"
                    value={busquedaAdmin}
                    onChange={(e) => setBusquedaAdmin(e.target.value)}
                    placeholder="Buscar por nombre para eliminar..."
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '15px', outline: 'none' }}
                />

                <div style={{ maxHeight: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {lugaresAEliminar.length > 0 ? (
                        lugaresAEliminar.map((lugar) => (
                            <div key={lugar.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px', background: '#f9f9f6', borderRadius: '6px', border: '1px solid #e1e1db' }}>
                                <div>
                                    <strong style={{ color: '#333' }}>{lugar.nombre}</strong>
                                    <span style={{ fontSize: '12px', color: '#666', marginLeft: '10px', background: '#e2dfd2', padding: '2px 6px', borderRadius: '4px' }}>{lugar.tipo}</span>
                                </div>
                                <button 
                                    onClick={() => handleEliminar(lugar.id, lugar.nombre)}
                                    style={{ background: '#c0392b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: '#888', textAlign: 'center', fontSize: '14px' }}>No se encontraron lugares con ese nombre.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;