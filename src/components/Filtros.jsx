// Componente de Filtros y Subcategorías según la Taxonomía Oficial (paraia.pdf)

function Filtros({ 
    categoria, 
    setCategoria, 
    subCategoria, 
    setSubCategoria, 
    soloRecomendados, 
    setSoloRecomendados 
}) {
    // Definición de subcategorías por categoría oficial
    const subcategoriasPorCategoria = {
        'Gastronomía': ['Cervecerías', 'Picadas y Quesos', 'Restaurantes', 'Cafeterías', 'Parrillas'],
        'Alojamiento': ['Cabañas', 'Hoteles', 'Posadas'],
        'Paseo': ['Parques', 'Sitios Religiosos', 'Espacios Recreativos', 'Miradores'],
        'Cultura': ['Museos', 'Edificios Históricos', 'Teatros', 'Centros Culturales'],
        'Aventura': ['Trekking', 'Circuitos de Escalada', 'Exploración', 'Turismo Activo']
    };

    const subcatsActuales = subcategoriasPorCategoria[categoria] || [];

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto 25px auto', padding: '0 15px' }}>
            {/* CATEGORÍAS PRINCIPALES */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '15px',
                flexWrap: 'wrap'
            }}>
                {[
                    { label: 'Todos', val: '' },
                    { label: 'Paseos y Atractivos', val: 'Paseo' },
                    { label: 'Gastronomía', val: 'Gastronomía' },
                    { label: 'Alojamiento', val: 'Alojamiento' },
                    { label: 'Cultura', val: 'Cultura' },
                    { label: 'Aventura', val: 'Aventura' }
                ].map((cat) => {
                    const activa = categoria === cat.val;
                    return (
                        <button
                            key={cat.val}
                            onClick={() => {
                                setCategoria(cat.val);
                                setSubCategoria('');
                            }}
                            style={{
                                border: 'none',
                                cursor: 'pointer',
                                color: activa ? '#fff' : '#1a3322',
                                background: activa ? '#5d7d65' : '#ffffff',
                                padding: '9px 16px',
                                borderRadius: '24px',
                                fontWeight: '700',
                                fontSize: '13px',
                                boxShadow: activa ? '0 4px 10px rgba(93,125,101,0.35)' : '0 2px 6px rgba(0,0,0,0.06)',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: activa ? 'scale(1.03)' : 'scale(1)'
                            }}
                        >
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            {/* BARRA DE SUB-FILTROS Y SELLO OFICIAL DE RECOMENDADOS */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(8px)',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(220, 216, 205, 0.8)'
            }}>
                {/* BOTÓN TOGGLE SELLO RECOMENDADOS OFICIALES */}
                <button
                    onClick={() => setSoloRecomendados(!soloRecomendados)}
                    style={{
                        border: soloRecomendados ? '1px solid #d99b26' : '1px solid #e1d3b0',
                        cursor: 'pointer',
                        color: soloRecomendados ? '#fff' : '#855d14',
                        background: soloRecomendados ? '#d99b26' : '#fdf8ec',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontWeight: '700',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s',
                        boxShadow: soloRecomendados ? '0 2px 8px rgba(217, 155, 38, 0.4)' : 'none'
                    }}
                    title="Curaduría oficial de prestadores recomendados por el Municipio"
                >
                    <span>Nuestros Recomendados</span>
                </button>

                {subcatsActuales.length > 0 && (
                    <>
                        <span style={{ color: '#ccc', margin: '0 2px' }}>|</span>

                        {/* SUB-FILTRO "TODOS" DE LA CATEGORÍA */}
                        <button
                            onClick={() => setSubCategoria('')}
                            style={{
                                border: 'none',
                                cursor: 'pointer',
                                color: subCategoria === '' ? '#fff' : '#4a5b51',
                                background: subCategoria === '' ? '#3e5444' : '#e6efe9',
                                padding: '5px 12px',
                                borderRadius: '16px',
                                fontWeight: '600',
                                fontSize: '12px',
                                transition: 'all 0.15s'
                            }}
                        >
                            Ver todos
                        </button>

                        {/* SUBCATEGORÍAS ESPECÍFICAS */}
                        {subcatsActuales.map((sub) => {
                            const activa = subCategoria.toLowerCase() === sub.toLowerCase();
                            return (
                                <button
                                    key={sub}
                                    onClick={() => setSubCategoria(sub)}
                                    style={{
                                        border: activa ? '1px solid #3e5444' : '1px solid #c4d7cd',
                                        cursor: 'pointer',
                                        color: activa ? '#fff' : '#4a5b51',
                                        background: activa ? '#3e5444' : '#e6efe9',
                                        padding: '5px 12px',
                                        borderRadius: '16px',
                                        fontWeight: activa ? '700' : '500',
                                        fontSize: '12px',
                                        transition: 'all 0.15s'
                                    }}
                                >
                                    {sub}
                                </button>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
}

export default Filtros;
