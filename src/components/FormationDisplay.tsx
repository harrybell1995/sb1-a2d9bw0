import React from 'react';

interface Position {
  id: string;
  x: number;
  y: number;
  role: string;
  focus: string;
}

interface FormationDisplayProps {
  formation: string;
  positions: Position[];
  roles: string[];
  focuses: string[];
}

export const FormationDisplay = ({ formation, positions, roles, focuses }: FormationDisplayProps) => {
  // Ensure positions is an array and has valid data
  const validPositions = Array.isArray(positions) ? positions : [];

  return (
    <div className="relative w-full aspect-[3/4] bg-green-800 rounded-lg overflow-hidden">
      {/* Pitch markings */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 border-2 border-white/30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 border-2 border-white/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-white/30 rounded-full" />
        <div className="absolute top-1/2 w-full border border-white/30" />
      </div>

      {/* Player positions */}
      {validPositions.map((pos, index) => (
        <div
          key={pos.id || index}
          className="absolute w-8 h-8 rounded-full bg-white/90 shadow-lg transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{ 
            left: `${pos.x}%`, 
            top: `${pos.y}%`,
          }}
        >
          <div className="text-xs font-bold">{index + 1}</div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white text-xs whitespace-nowrap">
            {roles?.[index] || ''}
          </div>
        </div>
      ))}
    </div>
  );
};