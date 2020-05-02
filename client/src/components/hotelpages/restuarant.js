import React,{Fragment} from 'react';
import {connect} from 'react-redux';
import LoadingGif from '../layouts/loadingGif';

const Restuarant = ({profile:{profile, loading}}) => {

    return (
        <div style={{padding: 50,marginTop:20 , backgroundColor:"#E8E8E8"}}>
            {profile === null || loading ? <LoadingGif/> : <div className="ui relaxed divided items">
                <h1>Restuarant</h1>
                {profile.restuarant.length === 0 ? <h3 style={{color:"red"}}>They have no restuarant</h3>: <Fragment>
                        {profile.restuarant.map(food => <div className="item" key={food._id}>
                                    <div className="ui small image">
                                        <img src={food.foodImages[0]} alt=""/>
                                    </div>
                                    <div className="content">
                                        <h5 className="header">{food.price}</h5>
                                        <div className="meta">
                                            <span>{food.foodname}</span>
                                        </div>
                                        <div className="description">
                                            <p>
                                                {food.description}
                                            </p>
                                        </div>
                                    
                                    </div>
                                </div>
                            
                        )}
                    </Fragment>}
                </div>}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        profile:state.profile
    }
}
export default connect(mapStateToProps)(Restuarant);
