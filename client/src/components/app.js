import React, {useEffect, Fragment} from 'react';
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
import CreateProfile from './dashboardforms/createProfile';
import HotelPage from './hotelpages/hotelPage';
import Restuarant from './hotelpages/restuarant';
import Rooms from './hotelpages/rooms';
import Dashboard from './dashboard/dashboard';
import UpdateProfile from './dashboardforms/updateProfile';
import UpdateRooms from './dashboardforms/updateRooms';
import UpdateBanquet from './dashboardforms/updateBanquet';
import UpdateRestuarant from './dashboardforms/updateRestuarant';


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
                <div>
                    <NavBar/>
                        <section>
                            <Alert/>
                            <Switch>
                                <Fragment>
                                    <Route path="/" exact component={AllProfiles}/>
                                    <div  style={{ margin:"80px"}}>
                                        <Route path="/hotel-page/:id" component={HotelPage}/>
                                        <Route path="/hotel-page/:id/restuarant" component={Restuarant}/>
                                        <Route path="/hotel-page/:id/rooms" component={Rooms}/>
                                    </div>
                                    <Route path="/dashboard" component={Dashboard}/>
                                    
                                    <div  style={{ margin:"80px", marginLeft:"300px",marginRight:"300px"}}>
                                        <Route path="/login" component={Login} />
                                        <Route path="/register" component={Register}/>
                                        <Route path="/create-profile" component={CreateProfile}/>
                                        <Route path="/update-profile" component={UpdateProfile}/>
                                        <Route path="/update-rooms" component={UpdateRooms}/>
                                        <Route path="/update-restuarant" component={UpdateRestuarant}/>
                                        <Route path="/update-banquethall" component={UpdateBanquet}/>
                                    </div>
                                </Fragment>
                            </Switch>
                        </section>
                        </div>
                </BrowserRouter>
            </Provider>
            
    )
}

export default App;