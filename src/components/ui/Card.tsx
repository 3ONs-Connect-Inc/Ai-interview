import React from 'react';
import '../../styles/ui/Card.scss';

interface CardProps {
  title: string;
  icon?: any;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
  titleAlign?: 'left' | 'center' | 'right';
  titleColor?: string;    // e.g., "#FF6347" or "var(--primary)"
  subtitleColor?: string; // optional
}

const Card: React.FC<CardProps> = ({ title, icon, subtitle, children, className = '', fullHeight = true }) => {
  return (
    <section className={`card ${className} ${!fullHeight ? 'card--short' : ''}`}>
      <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
                {icon}
              </div>
      <h3 className="card__title">{title}</h3>
      {subtitle && <p className="card__subtitle">{subtitle}</p>}
      <div className="card__body">{children}</div>
    </section>
  );
};

export default Card;
