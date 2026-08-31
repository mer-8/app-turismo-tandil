import { useState } from 'react';
import logoAetermia from '../assets/logo.png';
import Logo from './Logo';

function Footer({ onAbrirAdminSecreto, onAbrirModalQR }) {
    // Control interno de clics para asegurar el doble clic sin depender del evento nativo del navegador
    const [ultimoClick, setUltimoClick] = useState(0);

    const handleCopyrightClick = () => {
        const ahora = new Date().getTime();
        const tiempoTranscurrido = ahora - ultimoClick;
        
        // Si el segundo clic se hace en menos de 500 milisegundos, se considera doble clic válido
        if (tiempoTranscurrido < 500 && tiempoTranscurrido > 0) {
            if (onAbrirAdminSecreto) onAbrirAdminSecreto();
            setUltimoClick(0); // Reiniciar
        } else {
            setUltimoClick(ahora);
        }
    };

    return (
        <div style={{ marginTop: 'auto' }}>
            {/* Silueta serrana como transición hacia el pie institucional */}
            <svg
                viewBox="0 0 1440 60"
                preserveAspectRatio="none"
                style={{ display: 'block', width: '100%', height: '38px', marginBottom: '-1px' }}
            >
                <path
                    d="M0 60 L0 34 L120 50 L240 20 L360 46 L480 12 L600 40 L720 18 L840 44 L960 14 L1080 42 L1200 22 L1320 48 L1440 20 L1440 60 Z"
                    fill="var(--forest-900)"
                    stroke="var(--terracotta-600)"
                    strokeWidth="2.5"
                />
            </svg>
        <footer style={{
            width: '100%',
            background: 'var(--forest-900)',
            color: 'var(--forest-100)',
            padding: '30px 30px 25px 30px',
            fontSize: '13px',
            boxSizing: 'border-box'
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
                    <h3 style={{ color: '#ffffff', fontFamily: 'var(--display)', fontSize: '19px', fontWeight: '600', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Logo size={26} showText={false} />
                        <span>Dirección de Turismo</span>
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--forest-400)', margin: '0 0 8px 0', fontWeight: '600' }}>
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
                                background: 'var(--forest-800)',
                                color: 'var(--forest-100)',
                                border: '1px solid var(--forest-600)',
                                borderRadius: 'var(--radius-sm)',
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
                    <span style={{ fontSize: '11px', color: 'var(--forest-400)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Desarrollado y Gestionado por
                    </span>
                    <img
                        src={logoAetermia}
                        alt="Logo Aetermia"
                        style={{
                            height: '75px',
                            maxWidth: '260px',
                            objectFit: 'contain',
                            filter: 'brightness(1.1)'
                        }}
                    />
                </div>
            </div>

            {/* Barra Inferior con Acceso Secreto Robusto */}
            <div style={{
                borderTop: '1px solid rgba(255,255,255,0.12)',
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
                    onClick={handleCopyrightClick}
                    style={{
                        cursor: 'pointer',
                        userSelect: 'none',
                        fontSize: '12px',
                        color: 'var(--forest-400)',
                        margin: 0,
                        padding: '10px 0',
                        pointerEvents: 'auto'
                    }}
                    title="Doble clic para acceso de operadores municipales"
                >
                    © 2026 Tandil Turismo — Todos los derechos reservados.
                </p>
            </div>
        </footer>
        </div>
    );
}

export default Footer;