import { useState } from "react";
import { Table } from "reactstrap";
import getAxiosInstance from "../../axios.service";
import Modal, { User } from "../modal/UserModal";

interface TableComponent {
    headers: string[];
    data: any[];
}

const UserTable: React.FC<TableComponent> = (props: TableComponent): JSX.Element => {

    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState<User>({id: "", sub: "", password: "", role: ""});

    async function deleteUser(id: any) {
        await getAxiosInstance().delete(`userApi/users/${id}`);
    }

    return <div>
        <Table bordered>
            <thead>
                <tr>
                    {props.headers.map(header => <th>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.data.map(elem => <tr>{props.headers.map(header => header !== "actions" ? <td>{elem[header]}</td> : <td><button type="button" onClick={() => {setShow(true); setModalData(elem); console.log(modalData)}}>Edit</button> <button type="button" onClick={() => deleteUser(elem.id)}>Delete</button></td>)}</tr>)}
            </tbody>
        </Table>
        {show ? <Modal data={modalData} onClose={() => setShow(false)}/> : null}
    </div>
}

export default UserTable;