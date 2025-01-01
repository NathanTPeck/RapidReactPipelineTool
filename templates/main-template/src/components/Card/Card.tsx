import { HTMLAttributes, ReactNode } from "react";
import "./Card.css"

interface Card extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    className?: string;
}

const Card = ({ children, className }: Card) => {
    const classes = `card ${className ?? ""}`;
    return (
        <div className={classes}>
            {children}
        </div>
    );
}

export default Card;