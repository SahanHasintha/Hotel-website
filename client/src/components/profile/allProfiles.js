import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {allProfiles} from '../../actions/profile';
import ProfileItem from './profileItem';
import LoadingGif from '../layouts/loadingGif';

const AllProfiles = ({allProfiles, profile :{profiles, loading}}) => {
    useEffect(()=>{
        allProfiles();
    },[allProfiles])

    return (
        <div   style={{margin:"40px", marginLeft:"100px"}}>
           {profiles !== null && loading ?<LoadingGif/> : profiles.map(profile=> 
           <div className="ui raised segment">
               <div className="ui celled list"  >
                    <ProfileItem profile={profile} key={profile.id}/>
               </div>
            </div>)}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        profile:state.profile
    }
}


export default connect(mapStateToProps, {allProfiles})(AllProfiles);
