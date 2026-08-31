import { useEffect, useState } from 'react';

export default function WidgetClima({ color = 'var(--forest-500)' }) {
    const [clima, setClima] = useState({ temp: '--', icon: '...' });

    useEffect(() => {
        // Obtenemos la hora actual para saber si es de día o de noche
        const hora = new Date().getHours();
        const esDeNoche = hora < 7 || hora > 19; // Consideramos noche antes de las 7am o después de las 7pm

        fetch('https://api.open-meteo.com/v1/forecast?latitude=-37.32&longitude=-59.13&current=temperature_2m&timezone=auto')
            .then(res => res.json())
            .then(data => {
                const temp = Math.round(data.current.temperature_2m);
                // Lógica simple: si es de noche, mostramos luna, si es de día, sol o nube
                const icono = esDeNoche ? '🌙' : (data.current.temperature_2m > 15 ? '☀️' : '⛅');
                setClima({ temp, icon: icono });
            })
            .catch(() => setClima({ temp: '11', icon: '🌙' })); // Fallback nocturno
    }, []);

    return (
        <div style={{
            fontSize: '14px',
            color,
            fontWeight: 'bold', 
            marginRight: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        }}>
            <span>{clima.temp}°C</span>
            <span>{clima.icon}</span>
        </div>
    );
}