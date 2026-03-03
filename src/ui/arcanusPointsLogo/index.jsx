const ArcanusPointsCoin = ({ size = 100 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="coinGradient">
        <stop offset="0%" style={{ stopColor: "#f0e68c", stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: "#d4af37", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#b8941f", stopOpacity: 1 }} />
      </radialGradient>

      <filter id="coinShadow">
        <feDropShadow
          dx="0"
          dy="4"
          stdDeviation="4"
          floodColor="#000"
          floodOpacity="0.6"
        />
      </filter>

      <filter id="innerGlow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
        <feOffset dx="0" dy="0" result="offsetblur" />
        <feFlood floodColor="#fff" floodOpacity="0.5" />
        <feComposite in2="offsetblur" operator="in" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Sombra de la moneda */}
    <ellipse cx="52" cy="52" rx="42" ry="42" fill="#000" opacity="0.3" />

    {/* Moneda principal */}
    <circle
      cx="50"
      cy="50"
      r="42"
      fill="url(#coinGradient)"
      filter="url(#coinShadow)"
    />

    {/* Borde exterior */}
    <circle
      cx="50"
      cy="50"
      r="42"
      fill="none"
      stroke="#8b6914"
      strokeWidth="2"
    />
    <circle
      cx="50"
      cy="50"
      r="38"
      fill="none"
      stroke="#f0e68c"
      strokeWidth="1"
      opacity="0.6"
    />

    {/* Marcas decorativas alrededor */}
    {[...Array(8)].map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const x1 = 50 + 34 * Math.cos(angle);
      const y1 = 50 + 34 * Math.sin(angle);
      const x2 = 50 + 38 * Math.cos(angle);
      const y2 = 50 + 38 * Math.sin(angle);
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#8b6914"
          strokeWidth="2"
          strokeLinecap="round"
        />
      );
    })}

    {/* Letras AP */}
    <text
      x="50"
      y="62"
      fontFamily="Cinzel, serif"
      fontSize="40"
      fontWeight="900"
      fill="#2a1f12"
      textAnchor="middle"
      stroke="#1a1209"
      strokeWidth="2"
      filter="url(#innerGlow)"
    >
      AP
    </text>

    {/* Brillo superior */}
    <ellipse cx="40" cy="35" rx="15" ry="10" fill="#fff" opacity="0.3" />
  </svg>
);

export { ArcanusPointsCoin };
