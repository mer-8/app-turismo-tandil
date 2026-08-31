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
                background: 'rgba(22, 40, 31, 0.65)',
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
                    borderRadius: 'var(--radius-lg)',
                    maxWidth: '560px',
                    width: '100%',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-lg)',
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
                        background: 'linear-gradient(180deg, rgba(22,40,31,0.4) 0%, rgba(22,40,31,0.1) 50%, rgba(22,40,31,0.7) 100%)'
                    }} />

                    {/* Botón cerrar modal */}
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            background: 'rgba(255, 255, 255, 0.9)',
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
                            color: 'var(--ink-900)',
                            boxShadow: 'var(--shadow-sm)',
                            zIndex: 3
                        }}
                    >
                        ✕
                    </button>

                    {/* Badges en la imagen */}
                    <div style={{ position: 'absolute', bottom: '15px', left: '20px', right: '20px', zIndex: 2 }}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                            <span style={{
                                background: 'var(--forest-500)',
                                color: '#fff',
                                padding: '4px 10px',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '11px',
                                fontWeight: '700',
                                textTransform: 'uppercase'
                            }}>
                                {lugar.tipo} {lugar.subtipo ? `• ${lugar.subtipo}` : ''}
                            </span>

                            {lugar.recomendado && (
                                <span style={{
                                    background: 'var(--gold-600)',
                                    color: '#fff',
                                    padding: '4px 10px',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '11px',
                                    fontWeight: '800',
                                    textTransform: 'uppercase'
                                }}>
                                    ★ Sello Oficial Recomendado
                                </span>
                            )}
                        </div>

                        <h2 style={{
                            margin: 0,
                            fontFamily: 'var(--display)',
                            color: '#ffffff',
                            fontSize: '25px',
                            fontWeight: '600',
                            textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                        }}>
                            {lugar.nombre}
                        </h2>
                    </div>
                </div>

                {/* Contenido desplazable */}
                <div style={{ padding: '24px', overflowY: 'auto' }}>
                    <p style={{
                        color: 'var(--ink-900)',
                        fontSize: '15px',
                        lineHeight: '1.65',
                        marginBottom: '20px',
                        fontWeight: '400'
                    }}>
                        {lugar.infoAmpliada || lugar.descripcion}
                    </p>

                    {/* Ficha técnica institucional */}
                    <div style={{
                        background: 'var(--forest-100)',
                        border: '1px solid var(--forest-border)',
                        padding: '16px',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '22px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        {lugar.direccion && (
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--forest-700)' }}>
                                <span style={{ fontSize: '16px' }}>📍</span>
                                <div>
                                    <strong>Dirección:</strong> {lugar.direccion}
                                </div>
                            </div>
                        )}

                        {lugar.horarios && (
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--forest-700)' }}>
                                <span style={{ fontSize: '16px' }}>🕒</span>
                                <div>
                                    <strong>Horarios de atención:</strong> {lugar.horarios}
                                </div>
                            </div>
                        )}

                        {lugar.coords && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--forest-500)' }}>
                                <span style={{ fontSize: '16px' }}>◎</span>
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
                                background: 'var(--forest-500)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 'var(--radius-sm)',
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
                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--forest-600)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--forest-500)'}
                        >
                            <span>🗺</span>
                            <span>Cómo llegar (Maps)</span>
                        </button>

                        {onToggleFavorito && (
                            <button
                                onClick={() => onToggleFavorito(lugar.id)}
                                style={{
                                    flex: '0 0 auto',
                                    background: esFavorito ? 'var(--danger-bg)' : 'var(--sand-100)',
                                    color: esFavorito ? 'var(--danger)' : 'var(--ink-900)',
                                    border: esFavorito ? '1px solid #f0b0a8' : '1px solid var(--sand-200)',
                                    borderRadius: 'var(--radius-sm)',
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
