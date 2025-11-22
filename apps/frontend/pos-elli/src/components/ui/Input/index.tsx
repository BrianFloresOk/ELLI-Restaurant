import React from "react";

interface InputProps {
    label: string;
    placeholder?: string;
    type?: "text" | "password" | "email" | "number";
    size?: "small" | "medium" | "large";
    name?: string;
    required?: boolean;
    error?: string;
    disabled?: boolean;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
    label,
    placeholder,
    type = "text",
    size = "medium",
    name,
    required = false,
    error,
    disabled = false,
    value,
    onChange,
}: InputProps) {
    const sizeClasses = {
        small: "text-sm px-3 py-2 h-9",
        medium: "text-base px-3.5 py-2.5 h-11",
        large: "text-lg px-4 py-3 h-13",
    };

    return (
        <div className="w-full">
            {/* LABEL */}
            <label
                htmlFor={name}
                className="block text-sm font-semibold mb-1"
                style={{ color: "var(--color-foreground)" }}
            >
                {label}
                {required && (
                    <span style={{ color: "var(--color-destructive)" }}>*</span>
                )}
            </label>

            {/* INPUT */}
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                value={value}
                onChange={onChange}
                className={`
          w-full rounded-md border shadow-sm
          transition-all duration-150 ease-in-out
          
          focus:outline-none
          focus:ring-2
          
          ${sizeClasses[size]}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-text"}
          ${error ? "border-destructive" : ""}
        `}
                style={{
                    backgroundColor: "var(--color-card)",
                    color: "var(--color-foreground)",
                    borderColor: error
                        ? "var(--color-destructive)"
                        : "var(--color-input)",
                    transition: "var(--transition-smooth)",
                    boxShadow: "none",
                }}
                onFocus={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 2px var(--color-ring)`;
                }}
                onBlur={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                }}
            />

            {/* ERROR MESSAGE */}
            {error && (
                <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--color-destructive)" }}
                >
                    {error}
                </p>
            )}
        </div>
    );
}
