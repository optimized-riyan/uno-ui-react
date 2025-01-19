import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { type JSX } from 'react';
import Name from './pages/Name';
import Home from './pages/Home';
import Table from './pages/Lobby/Lobby';

export default function (): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/name' element={<Name />} />
                <Route path='/' element={<Home />} />
                <Route path='/table' element={<Table />} />
            </Routes>
        </BrowserRouter>
    );
}
