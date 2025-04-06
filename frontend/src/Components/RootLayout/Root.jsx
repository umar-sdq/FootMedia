import React from 'react';
import Header from '../Header/Header.jsx';
import { Outlet } from 'react-router-dom';
import './Root.css';
const RootLayout = () => {
    return (
        <div>
                <header>
                    <Header />
                </header>
            <main>
                <Outlet />
            </main>
            
        </div>
    );
};

export default RootLayout;