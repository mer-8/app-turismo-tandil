import fondoTandil from '../assets/fondoTandil.JPG';

function Hero({ busqueda, setBusqueda }) {
    return (
        <section style={{
            position: 'relative',
            overflow: 'hidden',
            padding: '160px 20px 60px 20px',
            textAlign: 'center',
            borderBottomLeftRadius: '50% 10px',
            borderBottomRightRadius: '50% 10px',
            marginBottom: '30px'
        }}>
            {/* Imagen de fondo con blur */}
            <div style={{
                position: 'absolute',
                top: '-10px',
                left: '-10px',
                right: '-10px',
                bottom: '-10px',
                backgroundImage: `url(${fondoTandil})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(6px)',
                zIndex: 0
            }}></div>

            {/* Capa oscura / overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.35)',
                zIndex: 1
            }}></div>

            {/* Contenido del hero */}
            <div style={{ position: 'relative', zIndex: 2 }}>
                <h1 style={{
                    color: '#adddbd',
                    fontSize: '42px',
                    margin: '0 0 10px 0',
                    fontWeight: '800'
                }}>
                    Bienvenido a Tandil
                </h1>
                <p style={{
                    color: '#f0f0f0',
                    fontSize: '18px',
                    margin: '0 0 40px 0',
                    fontWeight: '400'
                }}>
                    Explorá lo mejor de nuestra ciudad
                </p>

                {/* Buscador */}
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    background: '#fff',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 8px 8px 15px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="¿A dónde vamos?"
                        style={{ flex: 1, border: 'none', padding: '12px 15px', fontSize: '16px', outline: 'none', background: 'transparent' }}
                    />
                    <button style={{
                        background: '#5d7d65',
                        border: 'none',
                        borderRadius: '6px',
                        width: '45px',
                        height: '45px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        color: '#fff'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero;