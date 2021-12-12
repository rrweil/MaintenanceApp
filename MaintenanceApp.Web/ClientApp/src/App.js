import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import { AuthContextComponent } from './AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './PrivateRoute';
import Logout from './pages/Logout';
import NewTicket from './pages/NewTicket';
import AllTickets from './pages/AllTickets';
import TicketDetails from './pages/TicketDetails';
import AdminSettings from './pages/AdminSettings';


const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Route exact path='/' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/logout' component={Logout} />
                <PrivateRoute exact path='/newTicket' component={NewTicket} />
                <Route exact path='/allTickets' component={AllTickets} />
                <Route exact path='/TicketDetails/:id' component={TicketDetails}/>
                <Route exact path='/AdminSettings' component={AdminSettings} />
            </Layout>
        </AuthContextComponent>

    );
}

export default App;