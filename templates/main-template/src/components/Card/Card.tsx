import { HTMLAttributes, ReactNode } from "react";
import "./Card.css"

interface Card extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    className?: string;
    altColor?: boolean;
}

const Card = ({ children, className, altColor }: Card) => {
    const classes = `card ${className ?? ""} ${altColor && "alt-color"}`;
    return (
        <div className={classes}>
            {children}
        </div>
    );
}

export default Card;