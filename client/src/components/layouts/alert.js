import React from 'react';
import {connect} from 'react-redux';

const Alert = ({alert}) => {
    if(alert.length>0 || alert !== null){
        return alert.map(aler => (
            <div className={`ui ${aler.color} message`} key={aler.id}>
                {aler.msg}
            </div>
        )) ;
    }
    else{
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        alert:state.alert
    }
}
export default connect(mapStateToProps)(Alert);
