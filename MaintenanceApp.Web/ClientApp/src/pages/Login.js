import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isValidLogin, setIsValidLogin] = useState(true);
    const { setUser } = useAuthContext();
    const history = useHistory();

    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        const { data } = await axios.post('/api/account/login', formData);
        const isValidLogin = !!data;
        setUser(data);
        setIsValidLogin(isValidLogin);
        if (isValidLogin){
            history.push('/alltickets');
        }
    }

    return (
        <main className="form-signin">
        {!isValidLogin && <span className='text-danger'>Invalid username/password. Please try again.</span>}
        <form onSubmit={onFormSubmit}>
          <img className="mb-4 mx-auto d-block" src="Maintenance Logo.png" alt="" width={150} />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" onChange={onTextChange} value={formData.email} name="email" placeholder="Email"  />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={onTextChange} value={formData.password} name="password"/>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          {/* <div className="checkbox mb-3">
            <label>
              <input type="checkbox" defaultValue="remember-me" /> Remember me
            </label>
          </div> */}
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
          <Link to="/signup">Sign up for a new account</Link>
          <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
        </form>
      </main>
    )
}
export default Login;