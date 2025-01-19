import { useContext, type CSSProperties, type JSX } from "react";
import { Card, ClientActionType, SubmitCard } from "../../types";
import UiCard from "../UiCard";
import { SocketContext } from "../../socketContext";

export default function PlayerCards(props: {cards: Card[], checkTurn: () => boolean}): JSX.Element {
    const sendAction = useContext(SocketContext)!;

    const containerStyle: CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap'
    };
    const buttonStyle: CSSProperties = {
        padding: '.8rem 1rem',
        borderStyle: 'none',
        backgroundColor: '#27f24e',
        borderRadius: '1rem',
        fontSize: '1rem',
        color: 'black'
    }

    function sendSubmitCardAction(cardIndex: number): void {
        sendAction({
            type: ClientActionType.SubmitCard,
            data: {
                cardIndex
            } as SubmitCard
        });
    }

    function sendHitDeckAction(): void {
        sendAction({
            type: ClientActionType.HitDeck,
        });
    }
    
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h1>Your Cards</h1>
                {props.checkTurn() && <button style={buttonStyle} type="button" onClick={() => sendHitDeckAction()}>Draw Cards?</button>}
            </div>
            <div style={containerStyle}>
                {props.cards.map((card, index) => <UiCard onClick={() => sendSubmitCardAction(index)} key={index} card={card} />)}
            </div>
        </>
    );
}