import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';

const ProfileItem = ({profile, key}) => {
    console.log(profile)
    return (
        <Fragment>
            <div class="ui celled list" >
                <div class="item">
                    <img alt="" style={{height:"150px", width:"150px"}} class="ui avatar image" src="/images/avatar/small/helen.jpg"/>
                     <div class="content">
                        <div class="header" style={{marginLeft:"10px", marginTop:"10px"}}>
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
                    <div class="right floated content" style={{color:"grey",marginRight:"20px", marginTop:"60px"}}>
                        <Link to={`hotel-page/${profile._id}`} class="ui button">
                            Show More...
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProfileItem;
