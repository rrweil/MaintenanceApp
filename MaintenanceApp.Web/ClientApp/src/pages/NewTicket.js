import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const NewTicket = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        issue: '',
        roomLocation: ''
    });

    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }
    const onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/ticket/addTicket', { issue: formData.issue, roomLocation: formData.roomLocation });
        history.push("/AllTickets");
    }
    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card card-body bg-light">
                    <h3>New Maintenance Request</h3>
                    <br />
                    <form onSubmit={onFormSubmit}>
                        <input onChange={onTextChange} value={formData.issue} type="text" name="issue" placeholder="Describe the Issue" className="form-control" />
                        <br />
                        <input onChange={onTextChange} value={formData.roomLocation} type="text" name="roomLocation" placeholder="Room Number/Location" className="form-control" />
                        <br />
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewTicket;