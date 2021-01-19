import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

const navLinks = [
    {
        title: 'Home',
        path: '/',
    },
    {
        title: 'Blog',
        path: '/blog',
    },
    {
        title: 'Contact',
        path: '/contact',
    },
    {
        title: 'Login',
        path: '/login',
    },
];

export default function Navigation({ user }) {
    const [menuActive, setMenyActive] = useState(false);
    return (
        <nav className='site-navigation'>
            <span className='menu-title'>næsmark</span>
            <div className={`menu-content-container ${menuActive && 'active'}`}>
                <ul>
                    {navLinks.map((data, index) => (
                        <li key={index}>
                            <Link to={data.path}>{data.title}</Link>
                        </li>
                    ))}
                </ul>
                <span className='menu-avatar-container'>
                    <Avatar
                        src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                        size={38}
                    />
                    <span className='avatar-name-container'>{`${user.firstName} ${user.lastName}`}</span>
                </span>
            </div>
            <i className='ionicons icon ion-ios-menu' onClick={() => setMenyActive(!menuActive)} />
        </nav>
    );
}
