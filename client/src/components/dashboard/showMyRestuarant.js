import React from 'react';
import {connect} from 'react-redux';
import MyRestuarantItem from './myProperties/myRestuarantItem';

export const ShowMyRestuarant = ({profile:{profile, loading}}) => {
    return (
        <div>
            {profile.restuarant.length ===0 ? <div>No restuarant</div>:<MyRestuarantItem resturant={profile.restuarant}/>}
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        profile:state.profile
    }
}

export default connect(mapStateToProps)(ShowMyRestuarant);