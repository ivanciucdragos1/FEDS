import {useEffect, useState} from "react";
import DeviceCard, { Device } from "../../components/cards/deviceCard";
import DeviceModal from "../../components/deviceModal/device.modal";
import { jwtDecode } from "jwt-decode";
import getAxiosDevicesInstance from "../../axios.devices.service";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import getAxiosEnergyInstance from "../../axios.energy.service";

interface User {
    role: string,
    id: string,
    sub: string
}

const DevicePage = (): JSX.Element => {
    const [userDevices, setUserDevices] = useState<Device[]>([]);
    const [show, setShow] = useState(false);
    const [deviceProps, setDeviceProps] = useState<Device>({id: "", description: "", address: "", maxHrConsumption: 0, userId: "", energyConsumptionSet: []});
    const [user, setUser] = useState<User>({role: "", id: "", sub: ""});

    var stompClient: any = null;
    const socket = new SockJS('http://localhost:8089/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame: any) => {
        stompClient.subscribe('/topic/alerts', (payload: any) => {
           alert("consumption exceeded");
        })
    }) 

    async function deleteDevice(id: string) {
        return await getAxiosDevicesInstance().delete(`devices?id=${id}`);
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token') || "");
        if (token) {
            setUser(jwtDecode(token));
        }
    }, []); 

    useEffect( () => {
        if(user.role === "ADMIN"){
            getAxiosDevicesInstance().get('/devices').then(res => setUserDevices(res.data));
        }
        else{
            getAxiosDevicesInstance().get(`devices/${user.id}`).then(res => {setUserDevices(res.data);});
        }
    },[user]);

    return <div>
            <div style = {{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr"}}>
                {userDevices.map(device => <DeviceCard id={device.id} description={device.description} address={device.address} maxHrConsumption={device.maxHrConsumption} 
                userId={device.userId} role={user.role} energyConsumptionSet={device.energyConsumptionSet}
                onShow={() => {setShow(true); setDeviceProps(device)}} 
                onDelete={() => deleteDevice(device.id)}/>)}
            </div>
            {show ? <DeviceModal device={deviceProps} onClose={() => setShow(false)}/> : null}
    </div>
}

export default DevicePage;