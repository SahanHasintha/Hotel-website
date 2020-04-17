import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavBar from './layouts/navBar';
import Login from './auth/login';
import Register from './auth/register';
import Alert from './layouts/alert';

const App = () => {
    return (
        <div>
                <BrowserRouter>
                    <NavBar/>
                        <section  style={{margin:"40px", marginLeft:"100px",marginRight:"100px"}}>
                            <Alert/>
                            <Switch>
                                <Route path="/login" component={Login} />
                                <Route path="/register" component={Register}/>
                            </Switch>
                        </section>
                </BrowserRouter>
            
        </div>
    )
}

export default App;