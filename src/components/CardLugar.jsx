function CardLugar({ lugar, onVerDetalle, esFavorito, onToggleFavorito }) {
    return (
        <div style={{
            background: '#e6efe9',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
        }}>
            {/* Botón de Favorito (Corazón) en la esquina superior derecha de la imagen */}
            <button
                onClick={() => onToggleFavorito(lugar.id)}
                style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(255, 255, 255, 0.85)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '18px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    zIndex: 2,
                    transition: 'transform 0.2s'
                }}
                title={esFavorito ? "Quitar de favoritos" : "Añadir a favoritos"}
            >
                {esFavorito ? '❤️' : '🤍'}
            </button>

            {/* Imagen de la tarjeta */}
            <div style={{
                height: '160px',
                background: '#c4d7cd',
                backgroundImage: lugar.imagen ? `url(${lugar.imagen})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}></div>

            {/* Contenido de la tarjeta */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#1a3322' }}>{lugar.nombre}</h4>
                <span style={{
                    display: 'inline-block',
                    background: '#6d8a74',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                    alignSelf: 'flex-start'
                }}>
                    {lugar.tipo} {lugar.subtipo ? `• ${lugar.subtipo}` : ''}
                </span>
                <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#4a5b51', lineHeight: '1.5', flex: 1 }}>
                    {lugar.descripcion}
                </p>
                
                {/* Botón para ver más detalles */}
                <button
                    onClick={() => onVerDetalle(lugar)}
                    style={{
                        background: '#5d7d65',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                >
                    Ver más detalles
                </button>
            </div>
        </div>
    );
}

export default CardLugar;