import React from 'react';

interface GridContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function GridContainer({ children, className = '' }: GridContainerProps) {
  return (
    <div 
      className={`max-w-[1440px] mx-auto ${className}`}
      style={{
        paddingLeft: '120px',
        paddingRight: '120px'
      }}
    >
      <div className="grid grid-cols-12 gap-5">
        {children}
      </div>
    </div>
  );
}

interface GridItemProps {
  children: React.ReactNode;
  colSpan?: {
    default: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  className?: string;
}

export function GridItem({ children, colSpan = { default: 12 }, className = '' }: GridItemProps) {
  const colSpanClasses = [
    `col-span-${colSpan.default}`,
    colSpan.md ? `md:col-span-${colSpan.md}` : '',
    colSpan.lg ? `lg:col-span-${colSpan.lg}` : '',
    colSpan.xl ? `xl:col-span-${colSpan.xl}` : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={`${colSpanClasses} ${className}`}>
      {children}
    </div>
  );
}
