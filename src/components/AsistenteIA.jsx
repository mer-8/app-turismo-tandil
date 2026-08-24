import { useState } from 'react';

// Asistente Inteligente con IA para Itinerarios Personalizados (Roadmap Item #2)
function AsistenteIA({ lugares = [], onVerDetalle, onClose }) {
    const [dias, setDias] = useState(2);
    const [perfil, setPerfil] = useState('gastronomico');
    const [ritmo, setRitmo] = useState('tranquilo');
    const [itinerarioGenerado, setItinerarioGenerado] = useState(null);
    const [mensajeChat, setMensajeChat] = useState('');
    const [conversacion, setConversacion] = useState([
        {
            emisor: 'ia',
            texto: '¡Hola! Soy tu Asistente Virtual Oficial de Tandil con IA . Contame cuántos días vas a quedarte y tus preferencias, o consultame lo que quieras para armar tu itinerario perfecto.'
        }
    ]);

    const generarItinerario = () => {
        // Lógica de recomendación inteligente basada en la taxonomía y perfil
        let plan = [];

        // Filtramos lugares según perfil
        const gastronomicos = lugares.filter(l => l.tipo === 'Gastronomía');
        const paseos = lugares.filter(l => l.tipo === 'Paseo');
        const aventura = lugares.filter(l => l.tipo === 'Aventura');
        const cultura = lugares.filter(l => l.tipo === 'Cultura');
        const recomendados = lugares.filter(l => l.recomendado);

        for (let dia = 1; dia <= dias; dia++) {
            let actividades = [];

            if (perfil === 'gastronomico') {
                if (dia === 1) {
                    actividades = [
                        { hora: '09:30', actividad: 'Desayuno de especialidad', lugar: gastronomicos.find(l => l.subtipo === 'Cafeterías') || gastronomicos[0], tip: 'Probá las opciones de pastelería artesanal y café de origen.' },
                        { hora: '11:00', actividad: 'Paseo panorámico y compras regionales', lugar: paseos.find(l => l.nombre.includes('Movediza')) || paseos[0], tip: 'Mirador histórico imprescindible.' },
                        { hora: '13:30', actividad: 'Almuerzo: Tabla de Picada y Quesos Tandileros', lugar: gastronomicos.find(l => l.subtipo === 'Picadas y Quesos') || gastronomicos[0], tip: 'Pedí queso Banquete y salame con Denominación de Origen.' },
                        { hora: '17:00', actividad: 'Tarde de relax junto al agua', lugar: paseos.find(l => l.nombre.includes('Lago')) || paseos[1], tip: 'Ideal para mateada al atardecer frente al geiser.' },
                        { hora: '21:00', actividad: 'Cena en Cervecería Artesanal', lugar: gastronomicos.find(l => l.subtipo === 'Cervecerías') || gastronomicos[1], tip: 'Degustación de canillas locales y tapeo.' }
                    ];
                } else if (dia === 2) {
                    actividades = [
                        { hora: '10:00', actividad: 'Ascenso y aerosillas', lugar: paseos.find(l => l.nombre.includes('Centinela')) || paseos[0], tip: 'Disfrutá del aire de montaña y dulces caseros.' },
                        { hora: '13:30', actividad: 'Almuerzo Criollo a las brasas', lugar: gastronomicos.find(l => l.subtipo === 'Parrillas' || l.subtipo === 'Restaurantes') || gastronomicos[2], tip: 'Asado serrano y empanadas cortadas a cuchillo.' },
                        { hora: '16:30', actividad: 'Recorrido histórico cultural', lugar: cultura[0] || paseos[2], tip: 'Conocé las raíces e historia fundacional de la ciudad.' },
                        { hora: '21:00', actividad: 'Cena gourmet de autor', lugar: gastronomicos.find(l => l.nombre.includes('Azafranes') || l.subtipo === 'Restaurantes') || gastronomicos[0], tip: 'Risottos serranos y cava de vinos seleccionados.' }
                    ];
                } else {
                    actividades = [
                        { hora: '10:00', actividad: 'Senderismo suave y naturaleza', lugar: aventura[0] || paseos[0], tip: 'Llevar calzado cómodo y agua mineral.' },
                        { hora: '13:00', actividad: 'Almuerzo de campo tradicional', lugar: gastronomicos[1] || gastronomicos[0], tip: 'Pastas caseras y postres de campo.' },
                        { hora: '16:30', actividad: 'Paseo por el Centro Cívico y compras', lugar: cultura.find(l => l.subtipo === 'Museos') || cultura[0], tip: 'Pintura argentina y arquitectura de época.' }
                    ];
                }
            } else if (perfil === 'aventura') {
                if (dia === 1) {
                    actividades = [
                        { hora: '09:00', actividad: 'Trekking serrano', lugar: aventura.find(l => l.subtipo === 'Trekking') || aventura[0], tip: 'Ascenso con vistas de 360 grados a los valles.' },
                        { hora: '13:30', actividad: 'Almuerzo de campo reparador', lugar: gastronomicos.find(l => l.subtipo === 'Restaurantes') || gastronomicos[0], tip: 'Energía con comida casera tradicional.' },
                        { hora: '15:30', actividad: 'Canopy y tirolesas en los árboles', lugar: aventura.find(l => l.subtipo === 'Turismo Activo') || aventura[1], tip: 'Adrenalina en circuitos aéreos suspendidos.' },
                        { hora: '20:30', actividad: 'Cerveza artesanal y pizzas a la piedra', lugar: gastronomicos.find(l => l.subtipo === 'Cervecerías') || gastronomicos[0], tip: 'Ambiente joven y distendido.' }
                    ];
                } else {
                    actividades = [
                        { hora: '09:30', actividad: 'Circuito de Escalada y Rappel en cantera', lugar: aventura.find(l => l.subtipo === 'Circuitos de Escalada') || aventura[0], tip: 'Vías sobre granito con guías homologados.' },
                        { hora: '13:30', actividad: 'Picada serrana al aire libre', lugar: gastronomicos.find(l => l.subtipo === 'Picadas y Quesos') || gastronomicos[0], tip: 'Tablas de quesos y fiambres al pie de las sierras.' },
                        { hora: '16:30', actividad: 'Exploración de cavernas y cavas históricas', lugar: aventura.find(l => l.subtipo === 'Exploración') || aventura[2], tip: 'Historia picapedrera bajo tierra.' }
                    ];
                }
            } else if (perfil === 'familia') {
                actividades = [
                    { hora: '10:00', actividad: 'Parque temático y dinosaurios a escala', lugar: paseos.find(l => l.nombre.includes('Origen')) || paseos[0], tip: 'Ideal para fotos y juegos infantiles.' },
                    { hora: '13:00', actividad: 'Almuerzo familiar frente a la plaza', lugar: gastronomicos.find(l => l.subtipo === 'Restaurantes') || gastronomicos[0], tip: 'Menú variado para todas las edades.' },
                    { hora: '15:30', actividad: 'Aerosillas y juegos en la sierra', lugar: paseos.find(l => l.nombre.includes('Centinela')) || paseos[1], tip: 'Paseo en aerosilla sobre pinares.' },
                    { hora: '18:00', actividad: 'Helado artesanal y vuelta al lago', lugar: paseos.find(l => l.nombre.includes('Lago')) || paseos[0], tip: 'Bicisendas y botes a pedal.' }
                ];
            } else {
                // Perfil Relax / Pareja / Cultural
                actividades = [
                    { hora: '10:00', actividad: 'Paseo boscoso y espiritual', lugar: paseos.find(l => l.nombre.includes('Calvario')) || paseos[0], tip: 'Sendero arbolado de gran paz y silencio.' },
                    { hora: '13:00', actividad: 'Degustación de quesos y embutidos con vino', lugar: gastronomicos.find(l => l.subtipo === 'Picadas y Quesos') || gastronomicos[0], tip: 'Maridaje regional.' },
                    { hora: '16:00', actividad: 'Visita a pinacoteca y patrimonio artístico', lugar: cultura.find(l => l.subtipo === 'Museos') || cultura[0], tip: 'Exposiciones de arte contemporáneo y clásico.' },
                    { hora: '18:30', actividad: 'Atardecer en mirador panorámico', lugar: paseos.find(l => l.subtipo === 'Miradores') || paseos[0], tip: 'Vista del Castillo Morisco iluminándose.' }
                ];
            }

            plan.push({ dia, actividades });
        }

        setItinerarioGenerado(plan);
    };

    const enviarMensajeChat = (e) => {
        e.preventDefault();
        if (!mensajeChat.trim()) return;

        const nuevoMensajeUsuario = { emisor: 'usuario', texto: mensajeChat };
        const mensajeTexto = mensajeChat.toLowerCase();
        let respuestaIA = '';

        if (mensajeTexto.includes('picada') || mensajeTexto.includes('queso') || mensajeTexto.includes('comer') || mensajeTexto.includes('salame')) {
            respuestaIA = 'Para degustar los mejores quesos y salames de Tandil, te recomiendo visitar **Época de Quesos** (14 de Julio 604) o **Syquet** (Mitre 599). Ambos cuentan con el sello oficial de calidad del Municipio y productos con Denominación de Origen .';
        } else if (mensajeTexto.includes('lluvia') || mensajeTexto.includes('lloviendo') || mensajeTexto.includes('tiempo feo')) {
            respuestaIA = '¡Un día de lluvia en Tandil es ideal para la cultura y gastronomía! Podés visitar el **Museo Histórico Fuerte Independencia** (4 de Julio 455), el **MUMBAT** (Museo de Bellas Artes) o disfrutar de una merienda completa en **Mostrador Café** .';
        } else if (mensajeTexto.includes('noche') || mensajeTexto.includes('cerveza') || mensajeTexto.includes('bar')) {
            respuestaIA = 'La movida cervecera tandilense se destaca en **Pulsar Cervecería** (Pinto 650) y **Oakhill Cervecería** (Av. España 420), con canillas artesanales locales y excelente ambiente .';
        } else if (mensajeTexto.includes('trekking') || mensajeTexto.includes('subir') || mensajeTexto.includes('cerro') || mensajeTexto.includes('sierra')) {
            respuestaIA = 'Para actividades serranas tenés tres circuitos top: **Cerro El Centinela** (con aerosillas y senderos), **Parque Piedra Movediza** (fácil acceso y vista panorámica), o la **Sierra de las Ánimas / Valle del Picapedrero** para escalada y trekking avanzado .';
        } else {
            respuestaIA = `¡Gran consulta! En Tandil tenemos más de 30 puntos de interés registrados en el sistema municipal. Te sugiero explorar la sección de **Puntos Destacados** con el filtro  **"Nuestros Recomendados"** para ver las opciones curadas oficialmente.`;
        }

        setConversacion(prev => [
            ...prev,
            nuevoMensajeUsuario,
            { emisor: 'ia', texto: respuestaIA }
        ]);

        setMensajeChat('');
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
                background: 'rgba(15, 25, 18, 0.7)',
                backdropFilter: 'blur(5px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2000,
                padding: '15px'
            }}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    maxWidth: '750px',
                    width: '100%',
                    maxHeight: '92vh',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    animation: 'fadeIn 0.2s ease-out'
                }}
            >
                {/* Cabecera del Asistente */}
                <div style={{
                    background: 'linear-gradient(135deg, #1a3322 0%, #3e5444 100%)',
                    padding: '20px 25px',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            background: '#5d7d65',
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '22px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        }}>

                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '19px', fontWeight: '800' }}>
                                Asistente Virtual Inteligente (IA)
                            </h3>
                            <span style={{ fontSize: '12px', color: '#adddbd', fontWeight: '500' }}>
                                Planificador de Itinerarios y Asesor Turístico de Tandil
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,0.15)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '34px',
                            height: '34px',
                            color: '#fff',
                            fontSize: '15px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Contenido con pestañas: Planificador vs Chat */}
                <div style={{ padding: '20px 25px', overflowY: 'auto', flex: 1 }}>
                    {/* Generador de Itinerario */}
                    <div style={{
                        background: '#f9f9f6',
                        border: '1px solid #e2ded2',
                        borderRadius: '12px',
                        padding: '18px',
                        marginBottom: '20px'
                    }}>
                        <h4 style={{ margin: '0 0 12px 0', color: '#1a3322', fontSize: '15px', fontWeight: '700' }}>
                             Generador Automático de Itinerario
                        </h4>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '15px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#555', marginBottom: '5px' }}>
                                     Estadía en Tandil:
                                </label>
                                <select 
                                    value={dias} 
                                    onChange={(e) => setDias(Number(e.target.value))}
                                    style={{ width: '100%',color: "black", padding: '8px 10px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff', fontSize: '13px' }}
                                >
                                    <option value={1}>1 Día (Express)</option>
                                    <option value={2}>2 Días (Fin de semana)</option>
                                    <option value={3}>3 a 4 Días (Completo)</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#555', marginBottom: '5px' }}>
                                     Tu estilo de viaje:
                                </label>
                                <select 
                                    value={perfil} 
                                    onChange={(e) => setPerfil(e.target.value)}
                                    style={{ width: '100%', color: "black",  padding: '8px 10px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff', fontSize: '13px' }}
                                >
                                    <option value="gastronomico"> Gastronomía & Picadas</option>
                                    <option value="aventura"> Trekking & Aventura</option>
                                    <option value="familia"> Familia con niños</option>
                                    <option value="relax"> Pareja & Relax Cultural</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={generarItinerario}
                            style={{
                                width: '100%',
                                background: '#5d7d65',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '10px 16px',
                                fontWeight: '700',
                                fontSize: '14px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                boxShadow: '0 2px 8px rgba(93,125,101,0.3)'
                            }}
                        >
                            <span>Generar Itinerario con IA</span>
                        </button>
                    </div>

                    {/* Itinerario Generado */}
                    {itinerarioGenerado && (
                        <div style={{ marginBottom: '25px', animation: 'fadeIn 0.25s' }}>
                            <h4 style={{ color: '#1a3322', margin: '0 0 15px 0', fontSize: '17px', fontWeight: '800', borderBottom: '2px solid #5d7d65', paddingBottom: '6px' }}>
                                 Tu Itinerario Recomendado ({dias} {dias === 1 ? 'día' : 'días'})
                            </h4>

                            {itinerarioGenerado.map((diaPlan) => (
                                <div key={diaPlan.dia} style={{ marginBottom: '18px', background: '#f4f7f5', borderRadius: '10px', padding: '15px', border: '1px solid #dbe6df' }}>
                                    <div style={{ fontWeight: '800', color: '#1a3322', fontSize: '14px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                                        🗓 Día {diaPlan.dia}
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {diaPlan.actividades.map((act, idx) => (
                                            <div key={idx} style={{ background: '#fff', borderRadius: '8px', padding: '10px 14px', border: '1px solid #e7ebe8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                                <div style={{ flex: 1, minWidth: '220px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#5d7d65', marginRight: '6px' }}>
                                                        {act.hora}
                                                    </span>
                                                    <strong style={{ fontSize: '13px', color: '#1a3322' }}>
                                                        {act.actividad}
                                                    </strong>
                                                    {act.lugar && (
                                                        <div style={{ fontSize: '12px', color: '#333', marginTop: '2px' }}>
                                                             <em>{act.lugar.nombre}</em>
                                                        </div>
                                                    )}
                                                    <p style={{ fontSize: '11px', color: '#666', margin: '3px 0 0 0' }}>
                                                         {act.tip}
                                                    </p>
                                                </div>

                                                {act.lugar && onVerDetalle && (
                                                    <button
                                                        onClick={() => onVerDetalle(act.lugar)}
                                                        style={{
                                                            background: '#e6efe9',
                                                            color: '#36533f',
                                                            border: '1px solid #c4d7cd',
                                                            borderRadius: '6px',
                                                            padding: '4px 10px',
                                                            fontSize: '11px',
                                                            fontWeight: '700',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        Ver ficha
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Chat Conversacional Directo */}
                    <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
                        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#444', fontWeight: '700' }}>
                             Consultas Rápidas en Lenguaje Natural
                        </h4>

                        <div style={{
                            maxHeight: '180px',
                            overflowY: 'auto',
                            background: '#fdfdfc',
                            border: '1px solid #e7e5dc',
                            borderRadius: '8px',
                            padding: '12px',
                            marginBottom: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            {conversacion.map((msg, i) => (
                                <div 
                                    key={i}
                                    style={{
                                        alignSelf: msg.emisor === 'ia' ? 'flex-start' : 'flex-end',
                                        background: msg.emisor === 'ia' ? '#eef4f0' : '#5d7d65',
                                        color: msg.emisor === 'ia' ? '#1a3322' : '#ffffff',
                                        padding: '8px 12px',
                                        borderRadius: '10px',
                                        maxWidth: '85%',
                                        fontSize: '13px',
                                        lineHeight: '1.4'
                                    }}
                                >
                                    {msg.texto}
                                </div>
                            ))}
                        </div>

                        <form onSubmit={enviarMensajeChat} style={{ display: 'flex', gap: '8px' }}>
                            <input 
                                type="text"
                                value={mensajeChat}
                                onChange={(e) => setMensajeChat(e.target.value)}
                                placeholder="Preguntá algo (ej: ¿Dónde comer las mejores picadas?)..."
                                style={{
                                    flex: 1,
                                    padding: '9px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    fontSize: '13px',
                                    outline: 'none'
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    background: '#1a3322',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '9px 16px',
                                    fontWeight: '700',
                                    fontSize: '13px',
                                    cursor: 'pointer'
                                }}
                            >
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AsistenteIA;
