import { HTMLProps, ReactNode } from "react";
import "./Button.css"

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    type: "primary" | "secondary" | "icon";
    disabled?: boolean;
}

const Button = ({ children, type, className, ...props }: ButtonProps) => {
    const classes = `btn btn-${type} ${className ?? ""}`;
    return (
        <button {...props} className={classes}>{children}</button>
    );
};

export default Button;