function ModalDetalle({ lugar, onClose }) {
    if (!lugar) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div style={{
                background: '#fff',
                borderRadius: '12px',
                maxWidth: '500px',
                width: '100%',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh'
            }}>
                {/* Imagen del modal */}
                <div style={{
                    height: '200px',
                    backgroundImage: lugar.imagen ? `url(${lugar.imagen})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    background: '#c4d7cd'
                }}></div>

                {/* Contenido del detalle */}
                <div style={{ padding: '25px', overflowY: 'auto' }}>
                    <h2 style={{ margin: '0 0 10px 0', color: '#1a3322', fontSize: '24px' }}>
                        {lugar.nombre}
                    </h2>
                    <span style={{
                        display: 'inline-block',
                        background: '#5d7d65',
                        color: '#fff',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        marginBottom: '15px'
                    }}>
                        {lugar.tipo} {lugar.subtipo ? `• ${lugar.subtipo}` : ''}
                    </span>

                    <p style={{ color: '#4a5b51', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>
                        {lugar.infoAmpliada}
                    </p>

                    <div style={{ background: '#f4f7f5', padding: '15px', borderRadius: '8px', marginBottom: '25px' }}>
                        <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#333' }}>
                            <strong>📍 Dirección:</strong> {lugar.direccion}
                        </p>
                        <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
                            <strong>🕒 Horarios:</strong> {lugar.horarios}
                        </p>
                    </div>

                    {/* Botón cerrar modal */}
                    <button
                        onClick={onClose}
                        style={{
                            width: '100%',
                            background: '#1a3322',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '12px',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            cursor: 'pointer'
                        }}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalDetalle;