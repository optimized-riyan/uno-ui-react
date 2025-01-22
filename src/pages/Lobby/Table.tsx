import { ReactNode } from "react";
import { ClientSidePlayer } from "../../types";
import styles from "./Table.module.css";
import OppCards from "../../components/OppCards";

export default function Table({players}: TableProps): ReactNode {

    return (
        <div className={styles.table}>
            {players.map(player => <OppCards count={player.cardCount} position={{ x: 0, y: 0 }} />)}
        </div>
    );
}

interface TableProps {
    players: ClientSidePlayer[]
}