// Paleta y símbolos por categoría oficial, reutilizados en tarjetas, filtros,
// modales, mapa y panel de administración para dar identidad visual a cada rubro.
export const CATEGORIAS = {
    'Paseo': { color: '#4c7156', bg: '#e3ede1', icon: '⛰' },
    'Gastronomía': { color: '#c1662e', bg: '#f6e3d3', icon: '🍽' },
    'Alojamiento': { color: '#9c3b28', bg: '#f3ddd6', icon: '🏠' },
    'Cultura': { color: '#c98a1f', bg: '#fbf1dd', icon: '🏛' },
    'Aventura': { color: '#8a6a3f', bg: '#ece3d1', icon: '🥾' }
};

export const CATEGORIA_DEFAULT = { color: '#52645a', bg: '#e9ece7', icon: '📍' };

export function getCategoria(tipo) {
    return CATEGORIAS[tipo] || CATEGORIA_DEFAULT;
}
