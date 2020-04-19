import React, {Fragment} from 'react';
import loadingGif from './LoadingGif2.gif';

const Spinner = () => {
    return (
        <Fragment>
            <img src={loadingGif} style={{width:'100px' , margin:'auto', display:'block'}} alt='Loading...'/>
        </Fragment>
    )
}


export default Spinner;