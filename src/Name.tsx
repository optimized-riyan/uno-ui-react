import { JSX, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function (): JSX.Element {
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const inputId = crypto.randomUUID();

    function handleSubmit() {
        const name = inputRef.current?.value.trim();
        if (name) {
            localStorage.setItem('name', name);
            navigate('/');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={inputId}>Name:</label>
            <input type="text" ref={inputRef} />
            <button type="submit">Submit</button>
        </form>
    );
}