import React, {useEffect, Fragment} from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore , applyMiddleware} from 'redux';
import reducers from '../reducers';
import PrivateRoute from './routing/privateRouting';
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
import MyRooms from './dashboard/showMyRooms';
import MyRestuarant from './dashboard/showMyRestuarant';
import Halls from './hotelpages/banquetHall';
import ShowOneRoom from './hotelpages/showOneRoom';
import MyHalls from './dashboard/showMyBanquetHalls';
import Comments from './dashboard/showAllComments';


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
                                    <div  style={{ marginLeft:"200px", marginRight:"200px"}}>
                                        <Route path="/hotel-page/:id" component={HotelPage}/>
                                        <Route path="/hotel-page/:id/restuarant" component={Restuarant}/>
                                        <Route path="/hotel-page/:id/rooms"  component={Rooms}/>
                                        <Route path="/hotel-page/:id/halls" component={Halls}/>
                                        <PrivateRoute path="/my-rooms" exact component={MyRooms}/>
                                        <Route path="/:profileId/rooms/:roomId" component={ShowOneRoom}/>
                                        <PrivateRoute path="/my-restuarant" component={MyRestuarant}/>
                                        <PrivateRoute path="/my-halls" component={MyHalls}/>
                                        <PrivateRoute path="/comments" component={Comments}/>
                                    </div>
                                    <PrivateRoute path="/dashboard" component={Dashboard}/>
                                    
                                    <div  style={{ margin:"80px", marginLeft:"300px",marginRight:"300px"}}>
                                        <Route path="/login" component={Login} />
                                        <Route path="/register" component={Register}/>
                                        <PrivateRoute path="/create-profile" component={CreateProfile}/>
                                        <PrivateRoute path="/update-profile" component={UpdateProfile}/>
                                        <PrivateRoute path="/update-rooms" component={UpdateRooms}/>
                                        <PrivateRoute path="/update-restuarant" component={UpdateRestuarant}/>
                                        <PrivateRoute path="/update-banquethall" component={UpdateBanquet}/>
                                        
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