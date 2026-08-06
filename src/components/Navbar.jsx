function Navbar({ vistaActiva, setVistaActiva, verFavoritos, setVerFavoritos }) {
    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 40px',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: '#efede6',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
            {/* Logo / Título */}
            <h2
                onClick={() => {
                    setVistaActiva('inicio');
                    setVerFavoritos(false);
                }}
                style={{
                    margin: 0,
                    fontSize: '22px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#1a3322',
                    letterSpacing: '-0.5px',
                    cursor: 'pointer'
                }}
            >
                <span style={{
                    background: '#5d7d65',
                    color: '#fff',
                    padding: '6px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 5px rgba(93, 125, 101, 0.4)'
                }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                </span>
                <span>Tandil <span style={{ fontWeight: '400', color: '#5d7d65' }}>Turismo</span></span>
            </h2>

            {/* Menú de navegación */}
            <nav style={{ display: 'flex', gap: '25px', fontSize: '15px', color: '#333', fontWeight: '600', alignItems: 'center' }}>
                <span
                    onClick={() => {
                        setVistaActiva('inicio');
                        setVerFavoritos(false);
                    }}
                    style={{
                        cursor: 'pointer',
                        background: (vistaActiva === 'inicio' && !verFavoritos) ? '#5d7d65' : 'transparent',
                        color: (vistaActiva === 'inicio' && !verFavoritos) ? '#fff' : '#333',
                        padding: '8px 20px',
                        borderRadius: '8px',
                        transition: 'all 0.2s'
                    }}
                >
                    Inicio
                </span>

                <span
                    onClick={() => {
                        setVistaActiva('inicio');
                        setVerFavoritos(true);
                    }}
                    style={{
                        cursor: 'pointer',
                        background: verFavoritos ? '#5d7d65' : 'transparent',
                        color: verFavoritos ? '#fff' : '#333',
                        padding: '8px 20px',
                        borderRadius: '8px',
                        transition: 'all 0.2s'
                    }}
                >
                    Favoritos 
                </span>

                <span
                    onClick={() => setVistaActiva('mapa')}
                    style={{
                        cursor: 'pointer',
                        background: vistaActiva === 'mapa' ? '#5d7d65' : 'transparent',
                        color: vistaActiva === 'mapa' ? '#fff' : '#333',
                        padding: '8px 20px',
                        borderRadius: '8px',
                        transition: 'all 0.2s'
                    }}
                >
                    Mapa
                </span>
            </nav>
        </header>
    );
}

export default Navbar;