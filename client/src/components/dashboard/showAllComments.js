import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getMyProfile, removeComment} from '../../actions/profile';
import LoadingGif from '../layouts/loadingGif';

const AllComments = ({getMyProfile, removeComment, profile:{profile,loading}}) => {
    useEffect(()=>{
        getMyProfile();
    },[])
    return (
        <div className="ui middle aligned divided list">{
            profile ===null ?  <LoadingGif/> : 
            profile.comments.map(comment => <div class="item">
                <div class="content">
                    <p class="header">{comment.text}</p>
                    <div className="ui right floated">
                        <i 
                            class="trash alternate outline icon"  
                            onClick={()=>{removeComment(comment._id)}}
                            style={{cursor:'pointer'}}
                            >
                            </i>
                    </div>
                </div>
            </div>)
        }</div>
    )
}

const mapStateToProps = (state) => {
    return {
        profile:state.profile
    }
}

export default connect(mapStateToProps, {getMyProfile, removeComment})(AllComments);