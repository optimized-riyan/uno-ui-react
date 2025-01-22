import { CSSProperties, ReactNode } from "react";
import UiCard from "./UiCard";
import { CardColor, CardValue } from "../types";

export default function OppCards({count, position}: OppCardsProps): ReactNode {
    const divStyle: CSSProperties = {
        position: 'absolute',
        left: position.x,
        right: position.y,
        background: 'transparent'
    };
    
    return (
        <div style={divStyle}>
            <UiCard card={{ color: CardColor.Black, value: CardValue.Back }} height={"3.5rem"} />
        </div>
    );
}

interface OppCardsProps {
    count: number,
    position: {x: string, y: string}
}