import { useState } from "react";
import getAxiosInstance from "../../axios.service";
import { Device } from "../cards/deviceCard";
import "../modal/modal.scss"
import getAxiosDevicesInstance from "../../axios.devices.service";

interface DeviceProperties {
    device: Device;
    onClose: any;
}

const DeviceModal: React.FC<DeviceProperties> = (props: DeviceProperties): JSX.Element => {
    
    const [device, setDevice] = useState<Device>(props.device);

    async function editDevice(){
        await getAxiosDevicesInstance().patch(`devices`,device);
    }

    return <div className="modal">
        <label>Description</label>
        <input type="text" id="description" name="description" defaultValue={device.description} onChange={(event: any) => {device.description = event.target.value;setDevice(device)}}/>
        <label>Address</label>
        <input type="text" id="address" name="address" defaultValue={device.address} onChange={(event: any) => {setDevice({...device, address: event.target.value})}}/>
        <label>MaxHrEnergyConsumption</label>
        <input type="text" id="MaxHrEnergyConsumption" name="MaxHrEnergyConsumption" defaultValue={device.maxHrConsumption} onChange={(event:any) => {setDevice({...device, maxHrConsumption: event.target.value})}}/>
        <button type="button" onClick={() => editDevice()}>Edit</button>
        <button type="button" onClick={props.onClose}>Close</button>
    </div>
}

export default DeviceModal;