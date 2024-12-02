import { Card, CardBody, CardText } from "reactstrap";
import "./deviceCard.scss";
import { useEffect, useRef, useState } from "react";
import EnergyChart from "../energyChart/EnergyChart";
import getAxiosEnergyInstance from "../../axios.energy.service";

interface EnergyConsumption {
    timestamp: Date;
    hrConsumption: number;
}

interface DateFilteredConsumption {
    day: number;
    hour: number;
    hrConsumption: number;
}

export interface Device{
    id: string;
    description?: string;
    address?: string;
    maxHrConsumption?: number;
    energyConsumptionSet?: EnergyConsumption[];
    userId?: string;
    role?: string;
    onShow?: any;
    onDelete?: any;
}

const DeviceCard: React.FC<Partial<Device>> = (props: Partial<Device>): JSX.Element => {

    const [energyConsumptionSet, setEnergyConsumptionSet] = useState<EnergyConsumption[]>([]);
    const [showConsumptionChart, setShowConsumptionChart] = useState(false);
    const selectedDate = useRef(new Date());
    const energySet: DateFilteredConsumption[] = [];
    const selectedConsumption = useRef([{day: 0, hour:0, hrConsumption: 0}]);
    useEffect( () => {
        getAxiosEnergyInstance().get(`/${props.id}`).then(res => {setEnergyConsumptionSet(res.data);})
    })

    useEffect(() => {
        energyConsumptionSet.forEach(data => {
            const date = new Date(data.timestamp);
            const hrEnergy: DateFilteredConsumption = {day: date.getDate(), hour:date.getHours(), hrConsumption: data.hrConsumption};
            energySet.push(hrEnergy);
        })
        selectedConsumption.current = energySet.filter(data => data.day === new Date(selectedDate.current).getDate());
    },[selectedDate, energyConsumptionSet]);


    return <div className="device">
        <Card>
            <CardBody>
                <CardText>
                    {props.description}
                </CardText>
                <CardText>
                    {props.address}
                </CardText>
                <CardText>
                    {props.maxHrConsumption} kWH
                </CardText>
                {props.role === "ADMIN" 
                ? <span><button type="button" onClick={props.onShow}>Edit</button> <button type = "button" onClick={props.onDelete}>Delete</button></span>
                : [<button type="button" onClick={() => setShowConsumptionChart(true)}>Consumption</button>, <input type="date" onChange={(event: any) => {selectedDate.current = event.target.value;}}></input>]
                }
            </CardBody>
        </Card>
        {showConsumptionChart ?<EnergyChart data={selectedConsumption.current} onClose={() => setShowConsumptionChart(false)}/> : null}
    </div>

}

export default DeviceCard;

