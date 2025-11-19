interface ButtonProps {
  label: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'disabled';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}
export const Button = ({
  label,
  size = 'medium',
  variant = 'primary',
  icon,
  iconPosition = 'left',
  onClick,
}: ButtonProps) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-semibold rounded-lg shadow-sm
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    transition-all duration-150 ease-in-out
    disabled:cursor-not-allowed disabled:opacity-70
    active:scale-[0.97]
  `;

  const variantClasses = {
    primary: `
      bg-blue-600 text-white hover:bg-blue-700
      focus-visible:ring-blue-500
    `,
    secondary: `
      bg-gray-100 text-gray-800 border border-gray-300
      hover:bg-gray-200
      focus-visible:ring-gray-400
    `,
    success: `
      bg-green-600 text-white hover:bg-green-700
      focus-visible:ring-green-500
    `,
    danger: `
      bg-red-600 text-white hover:bg-red-700
      focus-visible:ring-red-500
    `,
    disabled: `
      bg-gray-400 text-white cursor-not-allowed
    `,
  };

  const sizeClasses = {
    small: "text-sm px-3 py-1.5 h-9",
    medium: "text-base px-4 py-2 h-11",
    large: "text-lg px-5 py-3 h-13",
  };

  return (
    <button
      onClick={onClick}
      disabled={variant === "disabled"}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      <div className="flex items-center gap-2">
        {iconPosition === 'left' && icon}
        <span>{label}</span>
        {iconPosition === 'right' && icon}
      </div>
    </button>
  );
};
