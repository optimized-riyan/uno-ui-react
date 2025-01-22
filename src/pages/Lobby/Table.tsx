import { ReactNode } from "react";
import { ClientSidePlayer } from "../../types";

export default function Table({players}: TableProps): ReactNode {

}

interface TableProps {
    players: ClientSidePlayer[]
}