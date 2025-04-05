import React from 'react';
import Header from '../Header/Header.jsx';
import { Outlet } from 'react-router-dom';
import Feed from '../Feed/Feed.jsx';
import './Root.css';
const RootLayout = () => {
    return (
        <div>
                <header>
                    <Header />
                </header>
            <main>
                <Feed />
                <Outlet />
            </main>
            
        </div>
    );
};

export default RootLayout;