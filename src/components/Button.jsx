import React from 'react';
import './Button.css';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
  icon,
  ...props
}) {
  const classNames = `btn btn-${variant} btn-${size} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classNames} onClick={onClick} {...props}>
        {icon && <span className="btn-icon">{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type={type} className={classNames} onClick={onClick} {...props}>
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

export default Button;
