import axios, { AxiosError } from "axios";
import { JSX, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function (): JSX.Element {
    const joinRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    const inputId1 = crypto.randomUUID();

    function handleJoin() {
        const lobbyId = joinRef.current?.value.trim();
        axios.post(`${import.meta.env.API_BASE_URL}/api/join`, {
            lobbyId,
            name: localStorage.getItem('name')
        }).then(() => {
            navigate('/table');
        })
        .catch(({request, response, message, stack}: AxiosError) => {
            if (request) console.error(`error in request: ${stack}`);
            else if (response) console.error(message);
        });
    }
    
    return (
        <>
            <label htmlFor={inputId1}>Join Lobby</label>
            <input type="number" id={inputId1} placeholder="Enter lobby id..." />
            <button type="button" onClick={handleJoin}>Join</button>
        </>
    );
}