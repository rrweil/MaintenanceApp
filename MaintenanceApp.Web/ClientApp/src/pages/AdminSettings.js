import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useAuthContext } from '../AuthContext';


const AdminSettings = () => {
    // const [formData, setFormData] = useState({ email: '', password: '' });
    // const [isValidLogin, setIsValidLogin] = useState(true);
    // const { setUser } = useAuthContext();
    // const history = useHistory();

    const [users, setUsers] = useState([]);


    useEffect(() => {
        getUsers();
    }, []);  

    const getUsers = async () => {
        const { data } = await axios.get(`/api/ticket/getAllUsers`);
        setUsers(data);
        // setIsLoading(false);
        console.log(data);
    }

    return (
        <>
            <h1>Admin Settings</h1>
            <Card>
                <Card.Header>Users</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </>
    )
}
export default AdminSettings;