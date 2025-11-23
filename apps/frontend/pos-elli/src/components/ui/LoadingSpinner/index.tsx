import React from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerColor = 'primary' | 'secondary' | 'white';
interface ColorClasses {
    primary: string,
    secondary: string,
    white: string,
}

interface LoadingSpinnerProps {
    size?: SpinnerSize,
    color?: SpinnerColor,
    className?: string,
}


export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    color = 'primary',
    className = ''
}) => {
    const sizeClasses: Record<SpinnerSize, string> = {
        sm: 'h-5 w-5 border-2',
        md: 'h-8 w-8 border-4',
        lg: 'h-12 w-12 border-[6px]'
    };

    const colorClasses: ColorClasses = {
        primary: 'border-t-blue-500 border-b-blue-500',
        secondary: 'border-t-purple-500 border-b-purple-500',
        white: 'border-t-white border-b-white'
    };

    return (
        <div
            className={`rounded-full border-transparent animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
            role="status"
        >
            <span className="sr-only">Cargando...</span>
        </div>
    );
};

interface LoadingSpinnerWithTextProps extends LoadingSpinnerProps {
    text?: string;
    textColor?: string;
}

export const LoadingSpinnerWithText: React.FC<LoadingSpinnerWithTextProps> = ({
    text = 'Cargando...',
    size = 'md',
    color = 'primary',
    textColor = 'text-gray-600',
    className = ''
}) => (
    <div className={`flex flex-col items-center justify-center ${className}`}>
        <LoadingSpinner size={size} color={color} />
        <span className={`mt-3 ${textColor}`}>{text}</span>
    </div>
);