import React, {useContext, useState} from 'react';
import "./signup.css"
import {useMutation, useQuery} from "@apollo/client";
import LOGIN from "../queries/Login";
import AuthContext from "../context/authContext";
import { useNavigate } from 'react-router-dom';
import login from "../assets/login.png";
import Spinner from "../components/Spinner";
import handleErrors from "../handleErrors/handleErrors";


interface LoginFormData {
    email: string;
    password: string;
}

function Login() {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData)
        const data = await mutateFunction({variables: { email: formData.email, password: formData.password }});
        const token = data.data.login.token
        const userId = data.data.login.userId
        if (token) {
            auth.login(token, userId);
        } else {
            throw new Error("Validation failed.")
        }
        navigate('/', { replace: true });

    };

    const [mutateFunction, { data, loading, error }] = useMutation(LOGIN,{
    });
    if (loading) return <Spinner/>
    if (error) return handleErrors(error);



    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="login-card">
                <img src={login} />
            <h2>Log in</h2>
            <br/>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" onChange={onChange}/>
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={onChange}/>
            </div>
            <div className="form-actions">
                <button type="submit">LOG IN</button>
            </div>
            <div className="signup">
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
            </div>
        </form>
    );
}

export default Login;