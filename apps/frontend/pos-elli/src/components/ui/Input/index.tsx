interface InputProps {
    label: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'number';
    size?: 'small' | 'medium' | 'large';
    name?: string;
    required?: boolean;
    error?: string;
    disabled?: boolean;
}

export function Input({
    label,
    placeholder,
    type = 'text',
    size = 'medium',
    name,
    required = false,
    error,
    disabled = false,
}: InputProps) {

    const sizeClasses = {
        small: "text-sm px-3 py-2 h-9",
        medium: "text-base px-3.5 py-2.5 h-11",
        large: "text-lg px-4 py-3 h-13",
    };

    return (
        <div className="w-full">
            <label
                htmlFor={name}
                className="block text-sm font-semibold text-gray-800 mb-1"
            >
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`
          w-full rounded-md border
          focus:outline-none
          ${error ? "border-red-500" : "border-gray-300"}
          bg-white text-gray-900 placeholder-gray-400
          transition-all duration-150 ease-in-out
          shadow-sm hover:border-blue-400
          ${sizeClasses[size]}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-text"}
        `}
            />

            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
