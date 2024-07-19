import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css'; 

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
        <div className="container auth-container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-6 col-lg-4 d-none d-md-flex align-items-center justify-content-center">
                    <img
                        src="https://royalachievers.in/frontend/images/forgate-password.png"
                        alt="Auth Illustration"
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-6 col-lg-4">
                    <form className="auth-card p-4">
                        <h3 className="auth-header mb-4">{isLogin ? 'Login' : 'Register'}</h3>
                        {!isLogin && (
                            <div className="form-group mb-3">
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            {isLogin ? (
                                <button type="button" className="btn btn-success w-100" onClick={loginAdmin}>
                                    Login
                                </button>
                            ) : (
                                <button type="button" className="btn btn-primary w-100" onClick={registerUser}>
                                    Register
                                </button>
                            )}
                        </div>
                        <div className="form-group text-center">
                            <p>
                                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                                <span className="auth-toggle text-primary" onClick={toggleAuthMode} role="button">
                                    {isLogin ? 'Register' : 'Login'}
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Auth;
