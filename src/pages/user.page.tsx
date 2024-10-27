import { useEffect, useState } from "react";
import getAxiosInstance from "../axios.service";
import UserTable from "../components/userTable/UserTable";


const UsersPage = (): JSX.Element => {

    const [users, setUsers] = useState<any[]>([]);
    const headers = ["id","name","password", "actions"];
    

    useEffect( () => {
        getAxiosInstance().get('/userApi/users').then(res => setUsers(res.data)).catch(err => console.log(err));
    },[]);

    

    return <div>
        { users ?  <UserTable headers={headers} data={users}/> : <></>}
    </div>
}

export default UsersPage;