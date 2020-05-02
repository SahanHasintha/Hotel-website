import React from 'react';
import {connect} from 'react-redux';
import Spinner from '../layouts/loadingGif';
import BanquetImages from './imageViews/banquetImages';

const BanquetHall = ({profile : {profile, loading}}) => {
    return (
        <div style={{padding: 50,marginTop:20, backgroundColor:'#E8E8E8'}}>
            {!loading || profile !== null ?
            profile.weddinghall.map((hall) => 
            hall.hallimages !== null &&
            <div className="ui placeholder segment" style={{display:'flex', alignItems:'center'}}>
                <h1 style={{color:'red', fontSize:60}}>{hall.hallname}</h1>
                <BanquetImages images={hall.hallimages}/>
                {/* <img style={{marginLeft:150, marginRight:150}} src={hall.hallimages[0]} alt="" /> */}
                <div className="ui card" style={{alignSelf:'center',width:"100%", height:'auto'}}>
                <div className="content">
                    <h1 className="header">{hall.price}</h1>
                    <div className="meta">
                    <span className="date">{profile.address}</span>
                    </div>
                    <div className="description">
                        Description:
                        <div className="ui segment">
                            <h6>{hall.description}</h6>
                        </div>
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <h5 style={{color:'#19C424', marginRight:10}}>{hall.phonenumber}</h5>
                            <i className = "phone icon" style={{fontSize:25, color:'#19C424'}}/>
                            
                        </div>
                        <ul >
                            {hall.included.map(feature => <li style={{borderBottom:'2px solid red'}}><h5>{feature}</h5></li>)}
                        </ul>
                    </div>
                </div>

                    </div>
            </div>) 
            : 
            <Spinner/>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        profile:state.profile
    }
}

export default connect(mapStateToProps)(BanquetHall);