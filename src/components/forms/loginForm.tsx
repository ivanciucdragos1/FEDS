import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getAxiosInstance from "../../axios.service";
import "./form.scss"

interface Fields {
    login: boolean;
    id?: string;
    name?: string;
    role?: string;
    password?: string; 
}


function LoginForm (props: Fields): JSX.Element {
    useEffect(
        () => {
            if(props.login){
                localStorage.clear();
            }
        }
    );

    const [user, setUser] = useState({
        name: "",
        role: "",
        password: "",
    });

    const navigate = useNavigate();

    async function logIn() {
        const response = await getAxiosInstance().post('/auth/login',{"name": user.name, "password": user.password});
        if(response.data){
            console.log(JSON.stringify(response.data));
            localStorage.setItem('token',JSON.stringify(response.data));
            navigate('/devices');
        }
    }

    async function register() {
       await getAxiosInstance().post('/auth/register',user);   
    }
    
    return <div>
        <form className="loginform">
        {
            props.login 
            ? [
            <label>Username</label>,
            <input type="text" name='name' id="name-input" placeholder="Enter name" onChange={(event: any) => {setUser({...user, name: event.target.value});}}/>,
            <label>Password</label>,
            <input type="password" name='password' id="password-input" placeholder="Enter password" onChange={(event: any) => {setUser({...user, password: event.target.value});}}/>,
            <button type="button" onClick={() => logIn()}>Login</button>
            ]
            :
            [   
                <label>Username</label>,
                <input type="text" id="name-input" placeholder="Enter username" value={props.name} onChange={(event: any) => {setUser({...user, name: event.target.value});}}/>,
                <label>Password</label>,
                <input type="password" id="password-input" placeholder="Enter password" value={props.password} onChange={(event: any) => {setUser({...user, password: event.target.value});}}/>,
                <label>Role</label>,
                (<select onChange={(event: any) => setUser({...user, role: event.target.value})}>
                    <option value="CLIENT">CLIENT</option>
                    <option value="ADMIN">ADMIN</option>
                </select>),
                <button type="button" onClick={() => register()}>Register</button>
            ]
        }
        </form>
    </div>
}

export default LoginForm;