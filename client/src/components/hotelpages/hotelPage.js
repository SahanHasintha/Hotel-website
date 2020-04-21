import React, {useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getProfileById} from '../../actions/profile';
import LoadingGif from '../layouts/loadingGif';

const HotelPage = ({getProfileById , match , profile:{profile, loading}}) => {

    useEffect(()=>{
        getProfileById(match.params.id)
    },[getProfileById, match.params.id])
    return (
        profile && !loading ? 
            <div>
                <h1>{profile && !loading && <Fragment>{profile.name}</Fragment>}</h1>
                    <div className="ui vertical stripe segment">
                        <div className="ui middle aligned stackable grid container">
                            <div className="row">
                                <div className="fifteen wide right floated column">
                                <img src={profile.profilepicture} className="ui large bordered rounded image"/>
                                </div>
                                <div className="eight wide column">
                                <h3 className="ui header">About us </h3>
                                <p>{profile.description}</p>
                                <h3 className="ui header">We Make Bananas That Can Dance</h3>
                                <p>Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.</p>
                                </div>
                                
                            </div>
                        </div>          
                    </div>   
                    <div className="ui equal width grid" style={{marginTop:"4px"}} >
                        <div className="column">
                            <Link to ={`/hotel-page/${profile._id}/rooms`} className="ui toggle button">Show room services</Link>
                        </div>
                        <div className="column">
                            <Link to={`/hotel-page/${profile._id}/restuarant`} className="ui toggle button">Show restuarant</Link>
                        </div>
                        <div className="column">
                            <Link to ={`/hotel-page/${profile._id}/rooms`} className="ui toggle button">Show about banquet halls</Link>
                        </div>
                    </div>                                                          
            </div>  : <LoadingGif />
    )
}

const mapStateToProps= (state) => {
    return {
        profile:state.profile
    }
}
export default connect(mapStateToProps, {getProfileById})(HotelPage);
