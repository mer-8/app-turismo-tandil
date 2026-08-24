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
                background: 'rgba(15, 25, 18, 0.7)',
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
                    maxWidth: '440px',
                    width: '100%',
                    padding: '30px',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    position: 'relative'
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: '#f0f3f1',
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
                    background: '#5d7d65',
                    color: '#fff',
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    marginBottom: '12px'
                }}>
                    Campaña Oficial de Señalética Inteligente
                </div>

                <h3 style={{ margin: '0 0 8px 0', color: '#1a3322', fontSize: '20px', fontWeight: '800' }}>
                    📱 Código QR de Descarga y Acceso
                </h3>

                <p style={{ color: '#666', fontSize: '13px', margin: '0 0 20px 0', lineHeight: '1.4' }}>
                    Diseñado para tótems de informes en accesos a cerros, paradores y folletería digital municipal.
                </p>

                <div style={{
                    padding: '15px',
                    background: '#faf9f5',
                    borderRadius: '12px',
                    border: '2px dashed #5d7d65',
                    display: 'inline-block',
                    marginBottom: '20px'
                }}>
                    <img
                        src={qrUrl}
                        alt="Código QR de Acceso"
                        style={{ width: '200px', height: '200px', display: 'block' }}
                    />
                </div>

                <p style={{ fontSize: '12px', color: '#888', margin: '0 0 20px 0' }}>
                    Escaneá con la cámara de cualquier teléfono para abrir o instalar la aplicación web oficial.
                </p>

                <button
                    onClick={() => window.print()}
                    style={{
                        width: '100%',
                        background: '#1a3322',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
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
