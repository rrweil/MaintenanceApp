import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        location: 'JDBY',
    });
    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }
    const onFormSubmit = async e => {
        e.preventDefault();
        console.log(formData)
        await axios.post('/api/account/signup', formData);
        history.push('/login');;
    }

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <div className="card card-body bg-light">
                    <h3>Sign up for a new account</h3>
                    <form onSubmit={onFormSubmit}>
                        <input onChange={onTextChange} value={formData.firstName} type="text" name="firstName" placeholder="First Name" className="form-control" />
                        <br />
                        <input onChange={onTextChange} value={formData.lastName} type="text" name="lastName" placeholder="Last Name" className="form-control" />
                        <br />
                        <input onChange={onTextChange} value={formData.email} type="text" name="email" placeholder="Email" className="form-control" />
                        <br />
                        <input onChange={onTextChange} value={formData.password} type="password" name="password" placeholder="Password" className="form-control" />
                        <br />
                        <label>Select Your Location:</label>
                        <select className="form-select" name="location" value={formData.value} onChange={onTextChange}>
                            <option>JDBY</option>
                            <option>YTT</option>
                            <option>Nursery</option>
                            <option>Business Office</option>
                        </select>
                        <br />
                        <button className="btn btn-primary">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Signup;