// Tarjeta de Presentación de Prestadores y Puntos de Interés
// Con efectos de elevación, sello de recomendación municipal y gestión de favoritos
import { getCategoria } from '../data/categoryTheme';

function CardLugar({ lugar, onVerDetalle, esFavorito, onToggleFavorito, distancia }) {
    const defaultImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80";
    const cat = getCategoria(lugar.tipo);

    return (
        <div
            className="card-lugar"
            style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                border: '1px solid var(--sand-200)',
                borderTop: `4px solid ${cat.color}`
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
        >
            {/* Cabecera / Imagen con Badges */}
            <div style={{
                position: 'relative',
                height: '175px',
                background: 'var(--forest-100)',
                backgroundImage: `url(${lugar.imagen || defaultImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                {/* Overlay degradado sutil */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(22,40,31,0.3) 0%, rgba(22,40,31,0) 40%, rgba(22,40,31,0.45) 100%)'
                }} />

                {/* Sello de Recomendado Oficial Municipal */}
                {lugar.recomendado && (
                    <span style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'var(--gold-600)',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: '800',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-pill)',
                        boxShadow: 'var(--shadow-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        zIndex: 2,
                        letterSpacing: '0.3px',
                        textTransform: 'uppercase'
                    }}>
                        <span>★</span> Recomendado
                    </span>
                )}

                {/* Distancia GPS si está disponible */}
                {distancia !== undefined && (
                    <span style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '12px',
                        background: 'rgba(22, 40, 31, 0.85)',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: '600',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-pill)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 2
                    }}>
                        a {distancia < 1 ? `${Math.round(distancia * 1000)} m` : `${distancia.toFixed(1)} km`}
                    </span>
                )}

                {/* Botón de Favorito */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorito(lugar.id);
                    }}
                    title={esFavorito ? "Quitar de favoritos" : "Guardar en favoritos"}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(255, 255, 255, 0.92)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'transform 0.15s, background 0.15s',
                        zIndex: 2
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <span style={{ fontSize: '18px', lineHeight: 1, color: 'var(--terracotta-600)' }}>
                        {esFavorito ? '♥' : '♡'}
                    </span>
                </button>
            </div>

            {/* Contenido de la Tarjeta */}
            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ marginBottom: '8px' }}>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: cat.bg,
                        color: cat.color,
                        padding: '3px 9px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.4px',
                        border: `1px solid ${cat.color}33`
                    }}>
                        <span style={{ fontSize: '12px' }}>{cat.icon}</span>
                        {lugar.tipo} {lugar.subtipo ? `• ${lugar.subtipo}` : ''}
                    </span>
                </div>

                <h4 style={{
                    margin: '0 0 8px 0',
                    fontFamily: 'var(--display)',
                    fontSize: '19px',
                    fontWeight: '600',
                    color: 'var(--ink-900)',
                    lineHeight: '1.3'
                }}>
                    {lugar.nombre}
                </h4>

                <p style={{
                    margin: '0 0 16px 0',
                    fontSize: '13px',
                    color: 'var(--ink-600)',
                    lineHeight: '1.45',
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {lugar.descripcion}
                </p>

                {lugar.direccion && (
                    <div style={{ fontSize: '12px', color: 'var(--ink-400)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{lugar.direccion}</span>
                    </div>
                )}

                {/* Botón para ver más detalles */}
                <button
                    onClick={() => onVerDetalle(lugar)}
                    style={{
                        background: 'var(--forest-500)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        padding: '11px 14px',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'background 0.2s, transform 0.1s',
                        boxShadow: 'var(--shadow-sm)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--forest-600)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--forest-500)'}
                >
                    <span>Ver más detalles</span>
                    <span>→</span>
                </button>
            </div>
        </div>
    );
}

export default CardLugar;
