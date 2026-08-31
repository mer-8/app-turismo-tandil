// Isotipo institucional: silueta serrana con la Piedra Movediza, símbolo distintivo de Tandil
function Logo({ size = 36, showText = true, textColor = 'var(--ink-900)' }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: showText ? 10 : 0 }}>
            <span style={{
                width: size,
                height: size,
                flexShrink: 0,
                background: 'linear-gradient(135deg, var(--forest-700), var(--forest-500))',
                borderRadius: size * 0.3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 10px rgba(22, 40, 31, 0.35)'
            }}>
                <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
                    <path d="M1 18.5L8 6l4 5 3.5-4.5L23 18.5H1Z" fill="var(--sand-50)" />
                    <circle cx="15.5" cy="5" r="2.1" fill="var(--gold-600)" stroke="var(--sand-50)" strokeWidth="0.8" />
                </svg>
            </span>
            {showText && (
                <span style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: size * 0.5, color: textColor, letterSpacing: '-0.3px', lineHeight: 1 }}>
                    Tandil <span style={{ fontWeight: 400, color: 'var(--forest-500)' }}>Turismo</span>
                </span>
            )}
        </div>
    );
}

export default Logo;
