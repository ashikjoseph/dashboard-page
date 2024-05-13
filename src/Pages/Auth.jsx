import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const defaultEmail = 'admin@gmail.com';
    const defaultPassword = 'admin123';
    const defaultUsername = 'admin';

    const [email, setEmail] = useState(defaultEmail);
    const [password, setPassword] = useState(defaultPassword);
    const [username, setUsername] = useState(defaultUsername);
    const [isLogin, setIsLogin] = useState(true);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const navigate = useNavigate();

    const loginAdmin = () => {
        if (email === defaultEmail && password === defaultPassword) {
            
            sessionStorage.setItem('token', 'your_generated_token');
            alert('Successfully logged in');
            navigate('/dashboard');
        } else {
            alert('Incorrect email or password.');
        }
    };

    const registerUser = () => {
        if (email === defaultEmail && password === defaultPassword && username === defaultUsername) {
            
            const newUser = { username, email, password };
            setRegisteredUsers([...registeredUsers, newUser]);
            alert('Successfully registered');
            setIsLogin(true); // Toggle to login mode after successful registration
        } else {
            alert('Invalid registration details.');
        }
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="row w-100 d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <div className="col-md-1"></div>
            <div className="col-md-5">
                <img src="https://parloanpartner.com/assets/img/login.png" alt="" />
            </div>
            <div className="col-md-5">
                <form className="mt-3 border shadow p-5 rounded" style={{ backgroundColor: "whitesmoke" }}>
                    <h3 className="justify-content-center" style={{ color: '#0040ff', textAlign: "center" }}>{isLogin ? 'Login' : 'Register'}</h3>
                    {!isLogin && (
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" placeholder="Username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    )}
                    <div className="mt-3">
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" placeholder="Email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mt-3">
                        {isLogin ? (
                            <button type="button" className="btn btn-success" onClick={loginAdmin}>Login</button>
                        ) : (
                            <button type="button" className="btn btn-primary" onClick={registerUser}>Register</button>
                        )}
                    </div>
                    <div className="mt-3">
                        <p>{isLogin ? 'Don\'t have an account?' : 'Already have an account?'} <span style={{ cursor: 'pointer', color: '#007bff' }} onClick={toggleAuthMode}>{isLogin ? 'Register' : 'Login'}</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth;

