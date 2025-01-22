import { CSSProperties, type JSX } from "react";
import { Card } from "../types";
import cardUrl from "../utils/cardUrl";

export default function UiCard({card, onClick, height}: UiCardProps): JSX.Element {
    const imgStyle: CSSProperties = {
        height: height ?? '6rem',
        aspectRatio: '17/24',
        cursor: 'pointer',
        background: 'transparent'
    };
    
    return (
        <img style={imgStyle} onClick={onClick} src={cardUrl(card)} alt="" />
    );
}

interface UiCardProps {
    card: Card,
    onClick?: React.MouseEventHandler<HTMLImageElement>,
    height?: string
}