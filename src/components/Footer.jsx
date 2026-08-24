import logoAetermia from '../assets/logo.png';

function Footer({ onAbrirAdminSecreto, onAbrirModalQR }) {
    return (
        <footer style={{
            width: '100%',
            background: '#1a3322',
            color: '#c5d8cb',
            padding: '40px 30px 25px 30px',
            fontSize: '13px',
            boxSizing: 'border-box',
            marginTop: 'auto',
            borderTop: '4px solid #5d7d65'
        }}>
            <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '30px',
                marginBottom: '30px'
            }}>
                {/* Columna 1: Identidad Institucional */}
                <div>
                    <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '800', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>Dirección de Turismo</span>
                    </h3>
                    <p style={{ fontSize: '13px', color: '#adddbd', margin: '0 0 8px 0', fontWeight: '600' }}>
                        Municipio de Tandil • Gobierno Local
                    </p>
                </div>



                {/* Columna 3: Herramientas y Acciones */}
                <div>
                    <h4 style={{ color: '#ffffff', fontSize: '14px', fontWeight: '700', margin: '0 0 10px 0' }}>
                        Herramientas Rápidas
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button
                            onClick={onAbrirModalQR}
                            style={{
                                background: '#2d4b37',
                                color: '#adddbd',
                                border: '1px solid #4a6751',
                                borderRadius: '6px',
                                padding: '6px 12px',
                                fontSize: '12px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <span>Código QR para Información Turistica</span>
                        </button>
                    </div>
                </div>

                {/* Columna 4: Desarrollado por */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#7a9683', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Desarrollado y Gestionado por
                    </span>
                    <img
                        src={logoAetermia}
                        alt="Logo Aetermia"
                        style={{
                            height: '55px',
                            maxWidth: '200px',
                            objectFit: 'contain',
                            filter: 'brightness(1.1)'
                        }}
                    />
                </div>
            </div>

            {/* Barra Inferior con Acceso Secreto */}
            <div style={{
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '20px',
                maxWidth: '1100px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                <p
                    onDoubleClick={onAbrirAdminSecreto}
                    style={{
                        cursor: 'default',
                        userSelect: 'none',
                        fontSize: '12px',
                        color: '#7a9683',
                        margin: 0
                    }}
                    title="Doble clic para acceso de operadores municipales"
                >
                    © 2026 Tandil Turismo — Todos los derechos reservados.
                </p>

            </div>
        </footer>
    );
}

export default Footer;
