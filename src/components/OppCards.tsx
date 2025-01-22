import { ReactNode } from "react";
import UiCard from "./UiCard";
import { CardColor, CardValue } from "../types";

export default function OppCards({count, position}: OppCardsProps): ReactNode {
    
    return (
        <ul style={{ transform: `translate(${position.x}, ${position.y})` }}>
            <UiCard card={{ color: CardColor.Black, value: CardValue.Back }} />
        </ul>
    );
}

interface OppCardsProps {
    count: number,
    position: {x: number, y: number}
}