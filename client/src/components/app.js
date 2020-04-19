import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore , applyMiddleware} from 'redux';
import reducers from '../reducers';
import {loadUser} from '../actions/auth';
import setAuthToken from '../utils/setAuthToken';
import NavBar from './layouts/navBar';
import AllProfiles from './profile/allProfiles';
import Login from './auth/login';
import Register from './auth/register';
import Alert from './layouts/alert';
import CreateProfile from './dashboardforms/profilecreate';
import HotelPage from './hotelpages/hotelPage';

if(localStorage.token){
    setAuthToken(localStorage.token);
}

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

const App = () => {
    
    useEffect(()=>{
        store.dispatch(loadUser())
    },[])

    return (
            <Provider store={store}> 
                <BrowserRouter>
                    <NavBar/>
                    
                        <section>
                            <Alert/>
                            <Switch>
                                <Route path="/" exact component={AllProfiles}/>
                                <div  style={{margin:"40px", marginLeft:"200px",marginRight:"200px"}}>
                                <Route path="/login" component={Login} />
                                <Route path="/register" component={Register}/>
                                <Route path="/hotel-page/:id" component={HotelPage}/>
                                <Route path="/create-profile" component={CreateProfile}/>
                                </div>
                            </Switch>
                        </section>
                </BrowserRouter>
            </Provider>
            
    )
}

export default App;