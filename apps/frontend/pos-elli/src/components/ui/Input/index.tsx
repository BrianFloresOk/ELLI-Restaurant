
interface InputProps {
    label: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email';
    size?: 'small' | 'medium' | 'large';
}

export function Input({ label, placeholder, type, size }: InputProps) {
    return (
        <div className="">
            <div>
                <label htmlFor="">{label}</label>
            </div>
            <div>
                <input type={type} placeholder={placeholder} className={`input-${size}`} />
            </div>
        </div>
    )
};