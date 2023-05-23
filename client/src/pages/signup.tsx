import React, {useState} from 'react';
import "./signup.css"
import {useMutation} from "@apollo/client";
import CREATE_USER from "../queries/CreateUser";
import login from "../assets/login.png";
import {useNavigate} from "react-router-dom";
import Spinner from "../components/Spinner";
import handleErrors from "../handleErrors/handleErrors";

interface LoginFormData {
    email: string;
    password: string;
}

function Signup() {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData)
        const data = await mutateFunction({variables: { userInput: formData }});
        console.log(data)
        navigate('/login', { replace: true });
    };

    const [mutateFunction, { data, loading, error }] = useMutation(CREATE_USER,{
    });
    if (loading) return <Spinner/>
    if (error) return handleErrors(error);

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="login-card">
                <img src={login} />
            <h2>Sign up</h2>
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
                <button type="submit">SIGN UP</button>
            </div>
            </div>
        </form>
    );
}

export default Signup;