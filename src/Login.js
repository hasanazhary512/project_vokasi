// Login.js
import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="login-container">
            <img src={`${process.env.PUBLIC_URL}/logo aplikasi silasidu.png`} alt="Logo SILASIDU" />
            <h2>Selamat Datang</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Masukkan Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Masukkan Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="Login" />
            </form>
            <footer>
                © 2024 | Sistem Pelatihan Vokasi Terpadu - Surakarta
            </footer>
        </div>
    );
}

export default Login;
