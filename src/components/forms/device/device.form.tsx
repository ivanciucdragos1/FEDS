import { useState } from "react";
import { Device } from "../../cards/deviceCard";
import "../form.scss"
import getAxiosDevicesInstance from "../../../axios.devices.service";

const DeviceForm = (): JSX.Element => {
    
    const [device, setDevice] = useState<Partial<Device>>({userId: "", description: "", address: "", maxHrConsumption: 0});

    async function createDevice(){
        await getAxiosDevicesInstance().post('devices',device);
    }

    return <div className="formcss">
        <label>UserId</label>
        <input type="text" id="userId" name="userId" onChange={(event: any) => {setDevice({...device, userId: event.target.value});}}/>
        <label>Description</label>
        <input type="text" id="description" name="description" onChange={(event: any) => {setDevice({...device, description: event.target.value});}}/>
        <label>Address</label>
        <input type="text" id="address" name="address" onChange={(event: any) => {setDevice({...device, address: event.target.value});}}/>
        <label>maxHrConsumption</label>
        <input type="text" id="maxHrConsumption" name="maxHrConsumption" onChange={(event: any) => {setDevice({...device, maxHrConsumption: event.target.value});}}/>
        <button type="button" onClick={() => createDevice()}>Create</button>
    </div>
}

export default DeviceForm;