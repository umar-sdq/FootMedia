import React from 'react';
import Header from '../Header/Header.jsx';
import { Outlet } from 'react-router-dom';
import './Root.css';
import Navigation from '../Navigation/Navigation.jsx';
const RootLayout = () => {
    return (
        <div>
                <header>
                    <Header />
                </header>
            <main>
                <Outlet />
                <Navigation/>
            </main>
            
        </div>
    );
};

export default RootLayout;