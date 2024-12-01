import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

interface EnergyData {
    data: any;
    onClose: any;
}

const EnergyChart: React.FC<EnergyData> = (props: EnergyData):JSX.Element => {
    console.log(props.data);
    return <div style={{"zIndex":999}}>
        <LineChart width={730} height={250} data={props.data}  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="hrConsumption" stroke="#8884d8"/>
        </LineChart>
        <button type="button" onClick={props.onClose}>Close</button>
    </div>
}

export default EnergyChart;