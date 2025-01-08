import { type CSSProperties, type JSX } from "react";
import { Card } from "../types";
import UiCard from "./UiCard";

export default function PlayerCards(props: {cards: Card[]}): JSX.Element {

    const containerStyle: CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap'
    };
    
    return (
        <>
            <h1>Your Cards</h1>
            <div style={containerStyle}>
                {props.cards.map((card, index) => <UiCard key={index} card={card} />)}
            </div>
        </>
    );
}