import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';

const ProfileItem = ({profile, key}) => {
    return (
        <Fragment>
            
                <div className="item" key={profile._id}>
                    <img alt="" style={{height:"auto", width:"250px"}} align="middle" className="ui small image" src={profile.profilepicture}/>
                     <div className="content">
                        <div className="header" style={{marginLeft:"10px", marginTop:"10px"}}>
                            <h3>{profile.name}</h3>
                        </div>
                        <div className="meta" style={{color:"red", marginLeft:"10px", marginTop:"10px"}}>
                            <h5>
                                {profile.popularcity}
                            </h5>
                        </div>
                        <div style={{color:"grey",marginLeft:"10px", marginTop:"10px"}}>{profile.address}</div>
                        <div style={{color:"#707781",marginLeft:"10px", marginTop:"10px"}}>
                            <h4 className="ui block header">
                                Offer - {profile.todaybestoffer}
                            </h4>
                        </div>
                    </div>
                    <div className="right floated content" style={{color:"grey",marginRight:"20px", marginTop:"60px"}}>
                        <Link to={`hotel-page/${profile._id}`} className="ui button">
                            Show More...
                        </Link>
                    </div>
                </div>
        </Fragment>
    )
}

export default ProfileItem;
