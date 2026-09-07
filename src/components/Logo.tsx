import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'orange' | 'white' | 'monochrome';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'orange',
  showTagline = false,
}) => {
  const sizeMap = {
    sm: { width: 110, height: 60, fontSize: 18 },
    md: { width: 140, height: 76, fontSize: 23 },
    lg: { width: 180, height: 98, fontSize: 30 },
    xl: { width: 230, height: 125, fontSize: 38 },
  };

  const { width, height, fontSize } = sizeMap[size];

  const bgColor = variant === 'white' ? '#FFFFFF' : variant === 'monochrome' ? '#111111' : '#FF6801';
  const textColor = variant === 'white' ? '#FF6801' : '#FFFFFF';

  return (
    <div className={`inline-flex flex-col items-start select-none group ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 160 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 ease-out group-hover:scale-[1.03] active:scale-[0.98] drop-shadow-sm"
        aria-label="MYMINI"
        role="img"
      >
        {/* The distinctive playful rounded MYMINI brand badge shape matching the reference */}
        <path
          d="M 12 18 
             C 12 8, 20 0, 32 0 
             C 45 0, 52 9, 62 16 
             C 72 7, 82 0, 96 0 
             C 114 0, 126 12, 134 26 
             C 142 40, 146 56, 144 72 
             C 142 82, 132 90, 120 90 
             C 108 90, 100 82, 92 73 
             C 86 66, 76 66, 70 73 
             C 62 82, 54 90, 42 90 
             C 30 90, 22 83, 16 74 
             C 12 68, 12 56, 12 40 
             Z"
          fill={bgColor}
          className="transition-colors duration-200"
        />

        {/* Brand typographic wordmark "MyMini" */}
        <text
          x="75"
          y="54"
          textAnchor="middle"
          fill={textColor}
          fontFamily="'Fredoka', 'Jellee', -apple-system, system-ui, sans-serif"
          fontWeight="700"
          fontSize={fontSize}
          letterSpacing="-0.02em"
          style={{ userSelect: 'none' }}
        >
          MyMini
        </text>
      </svg>

      {showTagline && (
        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#111111]/70 mt-1 pl-1 font-body">
          Your World. Miniaturized.
        </span>
      )}
    </div>
  );
};
