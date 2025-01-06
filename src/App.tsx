import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { type JSX } from 'react';
import './App.css';

export default function App(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/name' />
            </Routes>
        </BrowserRouter>
    );
}
