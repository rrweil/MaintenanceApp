  
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuthContext} from '../AuthContext';


const HomePage = () => {

    const [randomNumber, setRandomNumber] = useState('');
    const { user } = useAuthContext();

    useEffect(() => {
        const getRandomNumber = async () => {
            const { data } = await axios.get('/api/secretdata/get');
            setRandomNumber(data.randomNumber);
        }

        getRandomNumber();
    }, []);

    return (
        <main className="form-signin">
        <form>
          <img className="mb-4 mx-auto d-block" src="Maintenance Logo.png" alt="" width={150} />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" defaultValue="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
          <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
        </form>
      </main>
    )
}

export default HomePage;