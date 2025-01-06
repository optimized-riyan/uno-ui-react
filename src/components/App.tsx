import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { type JSX } from 'react';
import './App.css';
import Name from './Name';
import Home from './Home';

export default function (): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/name' element={<Name />} />
                <Route path='/' element={<Home />} />
                <Route path='/table' />
            </Routes>
        </BrowserRouter>
    );
}
