import { CSSProperties, type JSX } from "react";
import { Card } from "../types";
import cardUrl from "../cardUrl";

export default function UiCard(props: {card: Card, onClick: React.MouseEventHandler<HTMLImageElement> | null}): JSX.Element {
    const imgStyle: CSSProperties = {
        height: '6rem',
        aspectRatio: '17/24',
        cursor: 'pointer'
    };
    
    return (
        <img style={imgStyle} onClick={() => props.onClick} src={cardUrl(props.card)} alt="" />
    );
}