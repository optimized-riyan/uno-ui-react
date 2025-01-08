import { type JSX } from "react";
import { ClientSidePlayer } from "../types";

export default function Players(props: {players: ClientSidePlayer[], playerIndex: number}): JSX.Element {
    return (
        <ul>
            {props.players.map<JSX.Element>(({index, name, cardCount}) => index !== props.playerIndex ? (
                <li>
                    {name} # of cards: {cardCount}
                </li>
            ) : <></>)}
        </ul>
    );
}