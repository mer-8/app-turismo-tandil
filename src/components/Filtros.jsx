function Filtros({ categoria, setCategoria, subCategoria, setSubCategoria }) {
    return (
        <>
            {/* CATEGORÍAS PRINCIPALES */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px', flexWrap: 'wrap', padding: '0 20px' }}>
                {[
                    { label: 'Todas', val: '' },
                    { label: 'Paseos', val: 'Paseo' },
                    { label: 'Gastronomía', val: 'Gastronomía' },
                    { label: 'Cultura', val: 'Cultura' },
                    { label: 'Aventura', val: 'Aventura' }
                ].map((cat) => (
                    <span 
                        key={cat.val}
                        onClick={() => { 
                            setCategoria(cat.val); 
                            setSubCategoria(""); 
                        }}
                        style={{ 
                            cursor: 'pointer', 
                            color: categoria === cat.val ? '#fff' : '#1a3322', 
                            background: categoria === cat.val ? '#5d7d65' : '#ffffff', 
                            padding: '8px 18px', 
                            borderRadius: '8px', 
                            fontWeight: 'bold', 
                            fontSize: '14px', 
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                            transition: 'all 0.2s' 
                        }}
                    >
                        {cat.label}
                    </span>
                ))}
            </div>

            {/* SUB-FILTROS DE GASTRONOMÍA (Solo aparecen si se selecciona Gastronomía) */}
            {categoria.toLowerCase() === 'gastronomía' && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px', flexWrap: 'wrap', padding: '0 20px' }}>
                    {[
                        { label: 'Todos los sabores', val: '' },
                        { label: 'Cervecerías', val: 'Cervecería' },
                        { label: 'Picadas y Quesos', val: 'Picadas' },
                        { label: 'Restaurantes', val: 'Restaurante' },
                        { label: 'Cafeterías', val: 'Cafetería' },
                        { label: 'Parrillas', val: 'Parrillas' }

                    ].map((sub) => (
                        <span 
                            key={sub.val}
                            onClick={() => setSubCategoria(sub.val)}
                            style={{ 
                                cursor: 'pointer', 
                                color: subCategoria === sub.val ? '#fff' : '#4a5b51', 
                                background: subCategoria === sub.val ? '#3e5444' : '#e6efe9', 
                                padding: '6px 14px', 
                                borderRadius: '6px', 
                                fontWeight: '600', 
                                fontSize: '13px', 
                                border: '1px solid #c4d7cd',
                                transition: 'all 0.2s' 
                            }}
                        >
                            {sub.label}
                        </span>
                    ))}
                </div>
            )}
        </>
    );
}

export default Filtros;