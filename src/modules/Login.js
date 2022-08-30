import '../styles/login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Login = ({ auth }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    const login = () => {
        Axios.post('http://192.168.1.241:3001/login', {
            userName: userName,
            password: password
        }).then(response => {
            if(response.data) {
                const token = response.data.token;
                localStorage.setItem("token", token);
                auth();
                navigate(`/showReviews`);
            } else {
                alert("Fallo el ingreso de sesion");
            }
        });
    }

    return (
        <div className='container'>
            <div className="login">

                <h1>Iniciar sesion</h1>

                <TextField className='input' required label="Username" variant="standard" onChange={e => {
                    setUserName(e.target.value);
                }}/>

                <TextField className='input' required label="Password" variant="standard" type='password' onChange={e => {
                    setPassword(e.target.value);
                }} />

                <Button className='submit' variant='contained' onClick={ login }>Login</Button>
            </div>
        </div>
    );
}

export default Login;