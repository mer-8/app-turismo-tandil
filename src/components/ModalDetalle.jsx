// Modal de Detalle Completo de Prestadores y Puntos de Interés

function ModalDetalle({ lugar, onClose, esFavorito, onToggleFavorito }) {
    if (!lugar) return null;

    const defaultImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80";

    const abrirEnGoogleMaps = () => {
        if (lugar.coords && lugar.coords.length === 2) {
            window.open(`https://www.google.com/maps/search/?api=1&query=${lugar.coords[0]},${lugar.coords[1]}`, '_blank');
        } else if (lugar.direccion) {
            window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lugar.nombre + ', Tandil, ' + lugar.direccion)}`, '_blank');
        }
    };

    return (
        <div 
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(15, 25, 18, 0.65)',
                backdropFilter: 'blur(5px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2000,
                padding: '20px'
            }}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    maxWidth: '560px',
                    width: '100%',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: '90vh',
                    position: 'relative',
                    animation: 'fadeIn 0.2s ease-out'
                }}
            >
                {/* Cabecera / Imagen del Modal */}
                <div style={{
                    height: '230px',
                    backgroundImage: `url(${lugar.imagen || defaultImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                }}>
                    {/* Overlay degradado */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.7) 100%)'
                    }} />

                    {/* Botón cerrar modal */}
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            background: 'rgba(255, 255, 255, 0.85)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#1a3322',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                            zIndex: 3
                        }}
                    >
                        ✕
                    </button>

                    {/* Badges en la imagen */}
                    <div style={{ position: 'absolute', bottom: '15px', left: '20px', right: '20px', zIndex: 2 }}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                            <span style={{
                                background: '#5d7d65',
                                color: '#fff',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: '700',
                                textTransform: 'uppercase'
                            }}>
                                {lugar.tipo} {lugar.subtipo ? `• ${lugar.subtipo}` : ''}
                            </span>

                            {lugar.recomendado && (
                                <span style={{
                                    background: '#d99b26',
                                    color: '#fff',
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    fontSize: '11px',
                                    fontWeight: '800',
                                    textTransform: 'uppercase'
                                }}>
                                    Sello Oficial Recomendado
                                </span>
                            )}
                        </div>

                        <h2 style={{
                            margin: 0,
                            color: '#ffffff',
                            fontSize: '24px',
                            fontWeight: '800',
                            textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                        }}>
                            {lugar.nombre}
                        </h2>
                    </div>
                </div>

                {/* Contenido desplazable */}
                <div style={{ padding: '24px', overflowY: 'auto' }}>
                    <p style={{
                        color: '#38483f',
                        fontSize: '15px',
                        lineHeight: '1.65',
                        marginBottom: '20px',
                        fontWeight: '400'
                    }}>
                        {lugar.infoAmpliada || lugar.descripcion}
                    </p>

                    {/* Ficha técnica institucional */}
                    <div style={{
                        background: '#f4f7f5',
                        border: '1px solid #dce8e0',
                        padding: '16px',
                        borderRadius: '10px',
                        marginBottom: '22px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        {lugar.direccion && (
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#2b3a30' }}>
                                <span style={{ fontSize: '16px' }}></span>
                                <div>
                                    <strong>Dirección:</strong> {lugar.direccion}
                                </div>
                            </div>
                        )}

                        {lugar.horarios && (
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#2b3a30' }}>
                                <span style={{ fontSize: '16px' }}></span>
                                <div>
                                    <strong>Horarios de atención:</strong> {lugar.horarios}
                                </div>
                            </div>
                        )}

                        {lugar.coords && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#5d7d65' }}>
                                <span style={{ fontSize: '16px' }}></span>
                                <span>Coordenadas GPS: {lugar.coords[0].toFixed(4)}, {lugar.coords[1].toFixed(4)}</span>
                            </div>
                        )}
                    </div>

                    {/* Acciones principales */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button
                            onClick={abrirEnGoogleMaps}
                            style={{
                                flex: '1 1 180px',
                                background: '#5d7d65',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '12px 16px',
                                fontWeight: '700',
                                fontSize: '14px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#4a6751'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#5d7d65'}
                        >
                            <span>🗺</span>
                            <span>Cómo llegar (Maps)</span>
                        </button>

                        {onToggleFavorito && (
                            <button
                                onClick={() => onToggleFavorito(lugar.id)}
                                style={{
                                    flex: '0 0 auto',
                                    background: esFavorito ? '#fbeae8' : '#f0f3f1',
                                    color: esFavorito ? '#c0392b' : '#333',
                                    border: esFavorito ? '1px solid #f0b0a8' : '1px solid #d0dad4',
                                    borderRadius: '8px',
                                    padding: '12px 18px',
                                    fontWeight: '700',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <span>{esFavorito ? '♥' : '♡'}</span>
                                <span>{esFavorito ? 'Guardado' : 'Favorito'}</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalDetalle;
