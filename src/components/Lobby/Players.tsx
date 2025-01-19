import { Fragment, type JSX } from "react";
import { ClientSidePlayer } from "../../types";

export default function Players(props: {players: ClientSidePlayer[], playerIndex: number, currPlayerIndex: number}): JSX.Element {
    return (
        <ul>
            {props.players.map<JSX.Element>(({index, name, cardCount}) => index !== props.playerIndex ? (
                <li key={index} style={{ color: index === props.currPlayerIndex ? 'red' : 'white' }}>
                    {name} # of cards: {cardCount}
                </li>
            ) : <Fragment key={index} />)}
        </ul>
    );
}