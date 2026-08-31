// Modal para Campaña de Códigos QR Estratégicos (Roadmap Item #4)

function ModalQR({ onClose }) {
    // Generador de QR SVG vectorial oficial para la App de Turismo
    const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + encodeURIComponent(window.location.href);

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(22, 40, 31, 0.7)',
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
                    maxWidth: '440px',
                    width: '100%',
                    padding: '30px',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-lg)',
                    position: 'relative'
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'var(--sand-100)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    ✕
                </button>

                <div style={{
                    background: 'var(--forest-500)',
                    color: '#fff',
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '11px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    marginBottom: '12px'
                }}>
                    Campaña Oficial de Señalética Inteligente
                </div>

                <h3 style={{ margin: '0 0 8px 0', fontFamily: 'var(--display)', color: 'var(--ink-900)', fontSize: '21px', fontWeight: '600' }}>
                    📱 Código QR de Descarga y Acceso
                </h3>

                <p style={{ color: 'var(--ink-600)', fontSize: '13px', margin: '0 0 20px 0', lineHeight: '1.4' }}>
                    Diseñado para tótems de informes en accesos a cerros, paradores y folletería digital municipal.
                </p>

                <div style={{
                    padding: '15px',
                    background: 'var(--sand-50)',
                    borderRadius: 'var(--radius-md)',
                    border: '2px dashed var(--forest-500)',
                    display: 'inline-block',
                    marginBottom: '20px'
                }}>
                    <img
                        src={qrUrl}
                        alt="Código QR de Acceso"
                        style={{ width: '200px', height: '200px', display: 'block' }}
                    />
                </div>

                <p style={{ fontSize: '12px', color: 'var(--ink-400)', margin: '0 0 20px 0' }}>
                    Escaneá con la cámara de cualquier teléfono para abrir o instalar la aplicación web oficial.
                </p>

                <button
                    onClick={() => window.print()}
                    style={{
                        width: '100%',
                        background: 'var(--forest-900)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        padding: '10px',
                        fontWeight: '700',
                        fontSize: '14px',
                        cursor: 'pointer'
                    }}
                >
                    🖨️ Imprimir Cartelería QR para Tótems
                </button>
            </div>
        </div>
    );
}

export default ModalQR;
