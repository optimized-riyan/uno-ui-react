import axios from "axios";
import { JSX, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { reportAxiosError } from "../utils";
import { v4 as uuid } from 'uuid';

export default function (): JSX.Element {
    const joinRef = useRef<HTMLInputElement>(null);
    const hostRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('name')) navigate('/name');
    }, []);

    const inputId1 = uuid();
    const inputId2 = uuid();

    function handleJoin() {
        const lobbyId = joinRef.current?.value.trim();
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/join`, {
            lobbyId,
            name: localStorage.getItem('name')
        }, {
            headers: {
                'content-type': 'application/json'
            },
            withCredentials: true
        }).then(({data: {lobbyId, lobbyCapacity}}) => {
            navigate('/table', {
                state: {
                    lobbyId,
                    lobbyCapacity
                }
            });
        })
        .catch(reportAxiosError);
    }

    function handleHost() {
        const value = hostRef.current?.value;
        if (!value) return;
        const lobbyCapacity = parseInt(value!);
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/host`, {
            hostname: localStorage.getItem('name'),
            playerCount: lobbyCapacity
        }, {
            headers: {
                'content-type': 'application/json'
            },
            withCredentials: true
        }).then(({data: {lobbyId}}) => {
            navigate('/table', {
                state: {
                    lobbyId,
                    lobbyCapacity
                }
            });
        })
        .catch(reportAxiosError);
    }
    
    return (
        <>
            <label htmlFor={inputId1}>Join Lobby</label>
            <input type="number" ref={joinRef} id={inputId1} placeholder="Enter lobby id..." />
            <button type="button" onClick={handleJoin}>Join</button><br />

            <label htmlFor={inputId2}>Host Lobby</label>
            <input type="number" ref={hostRef} id={inputId2} placeholder="Enter lobby capacity..." />
            <button type="button" onClick={handleHost}>Host</button>
        </>
    );
}