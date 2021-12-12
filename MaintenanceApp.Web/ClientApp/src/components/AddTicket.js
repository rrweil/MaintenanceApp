import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const AddTicket = ({ getNewTickets }) => {
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
        setFormData({ issue: '', roomLocation: '' });
        getNewTickets();
    }
    return (
        <div className="card card-body bg-light mb-2">
            <div className="container">
                <form onSubmit={onFormSubmit}>
                    <div className="row">
                        <div className="col-md-4">
                            <h4>Submit New Maintenance Request</h4>
                        </div>
                        <div className="col-md-3">
                            <input onChange={onTextChange} value={formData.issue} type="text" name="issue" placeholder="Describe the Issue" className="form-control" />
                        </div>
                        <div class="col-md-3">
                            <input onChange={onTextChange} value={formData.roomLocation} type="text" name="roomLocation" placeholder="Room Number/Location" className="form-control" />
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTicket;