// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../services/api";
import Header from "./partials/Header.jsx";


function Register() {
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
    })

    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if(user){
            navigate("/");
        }
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async () => {
        try {
            setErrors(null);
            if(!form.name || !form.email || !form.username || !form.password){
                toast.error("Please enter all fields", {
                    position: "top-right",
                });
                return;
            }
            const result = await register(form);
            console.log(result);
            if(result.status === 200){
                if(result.data.status === 200){
                    localStorage.setItem("user", JSON.stringify(result.data.data));
                    toast.success("Registration successful! Redirecting...", {
                        position: "top-right",
                    });
                    navigate("/login");
                    return;
                }
                else{
                    toast.error(result.data.message, {
                        position: "top-right",
                    });
                    return;
                }
            }


        } catch (error) {
            console.log(error);
            setErrors("Login failed. Please check your credentials.");
            toast.error(error.message, {
                position: "top-right",
            });
        }
    }

    return (
        <>
            <Header />
            <div className='container'>
                <div className='row justify-content-center mt-4'>
                    <div className='col-lg-5 card border-primary mt-4'>
                        <div className='card-header'>Register</div>
                        <div className='card-body'>
                            <label htmlFor='name' className='form-label mt-4'>
                                Name
                            </label>
                            <input
                                type='text'
                                onChange={handleChange}
                                name='name'
                                className='form-control'
                                placeholder='Enter name'
                            />
                            <label htmlFor='email' className='form-label mt-4'>
                                Email
                            </label>
                            <input
                                type='email'
                                onChange={handleChange}
                                name='email'
                                className='form-control'
                                placeholder='Enter email'
                            />
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
                            <br />
                            <div className='row justify-content-md-center form-group mt-4'>
                                <button
                                    type='button'
                                    onClick={handleSubmit}
                                    className='col-sm-6 btn btn-outline-primary center'
                                >
                                    Submit
                                </button>
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

export default Register;