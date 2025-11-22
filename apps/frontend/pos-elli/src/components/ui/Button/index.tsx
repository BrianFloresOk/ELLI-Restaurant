import * as React from "react";

// 1. Tipos de Variantes y Tamaños
type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "accent"
  | "success"
  | "warning";

type ButtonSize = "default" | "sm" | "lg" | "icon";

// 2. Mapeo de Clases Base
const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

// 3. Mapeo de Clases por Variante (Tailwind CSS)
// Las clases focus-visible se han movido a la lógica principal para aplicarlas consistentemente.
const VARIANT_MAP: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
  accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm",
  success: "bg-success text-success-foreground hover:bg-success/90 shadow-sm",
  warning: "bg-warning text-warning-foreground hover:bg-warning/90 shadow-sm",
};

// 4. Mapeo de Clases por Tamaño
const SIZE_MAP: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-11 px-8",
  icon: "h-10 w-10 p-0",
};

// 5. Definición de Props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

// Función de utilidad simple para unir clases (reemplaza a 'cn')
const mergeClasses = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes.filter(Boolean).join(" ");
};

// 6. El Componente Refactorizado usando React.forwardRef
// Definimos el componente interno con forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = "default", // Valor por defecto
    size = "default",    // Valor por defecto
    children,
    ...props
  }, ref) => {
    // Clases comunes para el foco
    const focusClasses = "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring";

    const classes = mergeClasses(
      BASE_CLASSES,
      VARIANT_MAP[variant],
      SIZE_MAP[size],
      focusClasses,
      className,
    );

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

// Asignamos un display name para facilitar la depuración
Button.displayName = "Button";

// Exportamos por defecto la función declarada (que es el componente forwardRef)
export default Button;