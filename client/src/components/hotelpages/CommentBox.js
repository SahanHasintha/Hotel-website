import React, { Fragment,useState } from 'react';
import {connect} from 'react-redux';
import ScrollArea from 'react-scrollbar';
import {AddComment} from '../../actions/profile';
import LoadingGif from '../layouts/loadingGif';

const CommentBox = ({id, AddComment, profile:{profile, loading}}) => {
    const [comment, setComment] = useState('');

    const onSubmit= (e) => {
        AddComment(comment , id);
    }
    return (
        <Fragment>
            <div class="ui comments">
            <h3 class="ui dividing header">Feedbacks...</h3>
            <ScrollArea style={{height:150, width:700, backgroundColor:'white'}}>
            
            {profile === null ? <LoadingGif/>: 
                profile.comments.map(comment => 
            
                <div class="comment" style={{padding:15}}>
                    <div class="content">
                        <div class="author">
                            {comment.text}
                        </div>
                        
                    </div>
                </div>  
        )}
         </ScrollArea>
                <h3 class="ui dividing header">Add feedback...</h3>
                <form onSubmit={(e)=>onSubmit(e)} class="ui reply form">
                    
                    <div class="field">
                        <textarea 
                            style={{width:700,height:10}}
                            value={comment}
                            onChange={(e)=> setComment(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit"
                        class="ui blue labeled submit icon button"
                    >
                        <i class="icon edit"></i> Add Reply
                    </button>
                    
                </form>
            </div>
        </Fragment>
        
    );
}

const mapStateToProps = (state) => {
    return {
        profile:state.profile
    }
}

export default connect(mapStateToProps, {AddComment})(CommentBox);