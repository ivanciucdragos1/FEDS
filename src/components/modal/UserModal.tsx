import { useState } from "react";
import getAxiosInstance from "../../axios.service";
import "./modal.scss";

interface ModalComp {
    data: any;
    onClose: any;
}

export interface User{
    role: string,
    id: string;
    sub: string;
    password: string;
}

const UserModal: React.FC<ModalComp> = (props: ModalComp): JSX.Element => {
    const [user, setUser] = useState({id:props.data.id, name: props.data.name, password: props.data.password, role: props.data.role});

    async function editUser(data: any){
        await getAxiosInstance().patch('/userApi/users/edit',user);
    }

    return <div className="modal">
        <label>Name</label>
        <input type="text" id="name-input" placeholder="Enter name" onChange={(event: any) => {setUser({...user, name:event.target.value});}}/>
        <label>Password</label>
        <input type="password" id="password-input" placeholder="Enter password" value={user.password} onChange={(event: any) => {setUser({...user, password:event.target.value});}}/>
        <label>Role</label>
        <select onChange={(event: any) => setUser({...user, role: event.target.value})}>
            <option value="CLIENT">CLIENT</option>,
            <option value="ADMIN">ADMIN</option>
        </select>
        <button type="button" onClick={() => editUser(user)}>Edit</button>
        <button type="button" onClick={props.onClose}>Close</button>
    </div>
}

export default UserModal;