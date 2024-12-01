import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import DeviceForm from "./components/forms/device/device.form";
import LoginForm from "./components/forms/loginForm";
import NavigationBar from "./components/navigation/NavigationBar";
import DevicePage from "./pages/device/device.page";
import Login from "./pages/login";
import UsersPage from "./pages/user.page";
import { jwtDecode } from "jwt-decode";
import Unauthorized from "./pages/unauthorized/Unauthorized";
// import { socket, SocketContext, SocketProvider } from "./components/Context/SocketContext";

export interface UserCurrent {
    role: string,
    id: string,
    sub: string
}


const Main = (): JSX.Element => {

    const [user, setUser] = useState<UserCurrent>({role: "", id: "", sub: ""});

    useEffect(() => {
        if(localStorage.length > 0){
            const token = JSON.parse(localStorage.getItem('token') || "");
            if (token) {
                setUser(jwtDecode(token));
            }
        }
    }, [localStorage]); 

    return  <div>
        <NavigationBar role={user.role} id={user.id} sub={user.sub}/>
        <Routes>
            <Route path="/devices" element={<DevicePage/>}/>
            <Route path="/users" element={user.role === "ADMIN" ? <UsersPage /> : <Unauthorized />}/> 
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<LoginForm login={false}/>}/>
            <Route path="/devices/create" element={user.role === "ADMIN" ? <DeviceForm/> : <Unauthorized/>}/>
        </Routes>
        {/* <SocketProvider value={socket}></SocketProvider> */}
    </div>
}

export default Main;