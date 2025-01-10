import { useContext, type CSSProperties, type JSX } from "react";
import { Card, ClientActionType, SubmitCard } from "../types";
import UiCard from "./UiCard";
import { SocketContext } from "../socketContext";

export default function PlayerCards(props: {cards: Card[]}): JSX.Element {
    const sendAction = useContext(SocketContext)!;

    const containerStyle: CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap'
    };

    function sendSubmitCardAction(cardIndex: number): void {
        sendAction({
            type: ClientActionType.SubmitCard,
            data: {
                cardIndex
            } as SubmitCard
        });
    }
    
    return (
        <>
            <h1>Your Cards</h1>
            <div style={containerStyle}>
                {props.cards.map((card, index) => <UiCard onClick={() => sendSubmitCardAction(index)} key={index} card={card} />)}
            </div>
        </>
    );
}