import { CSSProperties, type JSX } from "react";
import { Card } from "../types";
import cardUrl from "../cardUrl";

export default function UiCard(props: {card: Card}): JSX.Element {
    const imgStyle: CSSProperties = {
        height: '6rem',
        aspectRatio: '17/24'
    };
    
    return (
        <img style={imgStyle} src={cardUrl(props.card)} alt="" />
    );
}