// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { login } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./partials/Header.jsx";

function Login({ user, setUser }) {
    const navigate = useNavigate(); // Using the navigate hook for navigation
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const [errors, setErrors] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

        const handleSubmit = async () => {
            try {
                if (!form.username || !form.password) {
                    toast.error("Please enter both username and password.", {
                        position: "top-right",
                    });
                    return;
                }
                const result = await login(form);
                console.log(result.data);
                setErrors(null); // Reset errors

                if (result.status === 200) {
                    if (result.data.statusCode === 200) {
                        localStorage.setItem(
                            "user",
                            JSON.stringify(result.data.data)
                        );
                        setUser(result.data.data);
                        toast.success("Login successful! Redirecting...", {
                            position: "top-right",
                        });
                        console.log(result.data.data);
                        navigate("/");
                        return;
                    }
                    if (result.data.statusCode === 400) {
                        toast.error(result.data.message, {
                            position: "top-right",
                        });
                        return;
                    }
                    if (result.data.statusCode !== 200) {
                        setErrors("Login failed. Please check your credentials.");
                        toast.error(result.data.message, {
                            position: "top-right",
                        });
                        return;
                    }
                }
            } catch (err) {
                console.error(err);
                setErrors("Login failed. Please check your credentials.");
                toast.error("Login failed due to a server error.", {
                    position: "top-right",
                });
            }
        };

    return (
        <>
            <Header />
            <div className='container'>
                <div className='row justify-content-center mt-4'>
                    <div className='col-lg-5 card border-primary mt-4'>
                        <div className='card-header'>Login</div>
                        <div className='card-body'>
                            <label
                                htmlFor='username'
                                className='form-label mt-4'
                            >
                                Username
                            </label>
                            <input
                                type='text'
                                onChange={handleChange}
                                name='username'
                                className='form-control'
                                placeholder='Enter username'
                            />
                            {errors?.username && (
                                <small
                                    id='emailHelp'
                                    className='form-text text-muted'
                                >
                                    {errors.username.message}
                                </small>
                            )}
                            <label
                                htmlFor='password'
                                className='form-label mt-4'
                            >
                                Password
                            </label>
                            <input
                                type='password'
                                onChange={handleChange}
                                name='password'
                                className='form-control'
                                placeholder='Password'
                                autoComplete='off'
                            />
                            {errors?.password && (
                                <small
                                    id='passwordhelp'
                                    className='form-text text-muted'
                                >
                                    {errors.password.message}
                                </small>
                            )}
                            <br />
                            <div className='row justify-content-md-center form-group mt-4'>
                                <button
                                    type='button'
                                    onClick={handleSubmit}
                                    className='col-sm-6 btn btn-outline-primary center'
                                >
                                    Submit
                                </button>
                                {errors && (
                                    <div className='error-message'>
                                        {errors}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* ToastContainer must be included */}
                <ToastContainer />
            </div>
        </>
    );
}
export default Login;
