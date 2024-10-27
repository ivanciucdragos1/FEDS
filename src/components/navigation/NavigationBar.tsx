import { NavLink } from "react-router-dom";
import "./navbar.scss";
import { UserCurrent } from "../../main";

const NavigationBar: React.FC<UserCurrent> = (props: UserCurrent): JSX.Element => {

    console.log(props.role);

    return <header className="navbar"> 
        <div>
        <span style={{display: "flex", flexDirection:"row", justifyContent:"space-evenly"}}>
            { props ?
            props.role === "ADMIN" 
                ? [ 
                    <NavLink style={{textDecoration: 'none'}} to="/devices"> DEVICES </NavLink>,
                    <NavLink style={{textDecoration: 'none'}} to="/users"> USERS </NavLink>, 
                    <NavLink style={{textDecoration: 'none'}} to="/register"> REGISTER</NavLink>,
                    <NavLink style={{textDecoration: 'none'}} to="/devices/create">NEW DEVICE</NavLink>,
                    <NavLink style={{textDecoration: 'none'}} to="/login"> Logout </NavLink>
                ]
                :  [
                    <NavLink style={{textDecoration: 'none'}} to="/login"> Logout </NavLink>,
                ]
            : [
                <NavLink style={{textDecoration: 'none'}} to="/login"> Login </NavLink>,
                <NavLink style={{textDecoration: 'none'}} to="/register"> Register</NavLink>
            ]
            }
        </span>
    </div>
    </header>
}

export default NavigationBar;