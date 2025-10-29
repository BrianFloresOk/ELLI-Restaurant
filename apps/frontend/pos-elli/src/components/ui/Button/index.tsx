interface ButtonProps {
    label: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'secondary' | 'disabled';
}

export const Button = ({ label, size = 'medium', variant = 'primary' }: ButtonProps) => {

    const variantClasses = {
        primary: 'bg-blue-600 hover:bg-blue-700',
        secondary: 'bg-gray-600 hover:bg-gray-700',
        disabled: 'bg-gray-400 cursor-not-allowed',
    };

    const sizeClasses = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
    };

    return (
        <button
            className={`text-white px-4 py-2 rounded-md font-montserrat ${sizeClasses[size]} ${variantClasses[variant]}`}
        >
            {label}
        </button>
    );
};
