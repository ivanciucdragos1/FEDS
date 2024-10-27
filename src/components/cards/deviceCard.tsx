import { Card, CardBody, CardText } from "reactstrap";
import "./deviceCard.scss";

export interface Device{
    id: string;
    description?: string;
    address?: string;
    maxHrConsumption?: number;
    userId?: string;
    role?: string;
    onShow?: any;
    onDelete?: any;
}

const DeviceCard: React.FC<Partial<Device>> = (props: Partial<Device>): JSX.Element => {


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
                : null
                }
            </CardBody>
        </Card>
    </div>

}

export default DeviceCard;

