import { JSX, useEffect, useRef } from "react";
import { ClientSidePlayer, InitialStateSync, ServerEvent, ServerEventType } from "../types";
import { useNavigate } from "react-router-dom";

export default function (): JSX.Element {
    const playersRef = useRef<Array<ClientSidePlayer|null>>(new Array<ClientSidePlayer|null>().fill(null, 0, ));
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!localStorage.getItem('name')) navigate('/name');
        const socket = new WebSocket(import.meta.env.VITE_WS_URL);

        socket.onmessage = (message: MessageEvent) => {
            const {type, data} = JSON.parse(message.data) as ServerEvent;

            switch (type) {
                // case ServerEventType.InitialStateSync:
                //     const {players} = data as InitialStateSync;
                //     playersRef.current = players;
                //     break;
                default:
                    console.log(type);
                    break;
            }
        };
    }, []);

    return (
        <></>
    );
}