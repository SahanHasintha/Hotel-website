import {v4 as uuid} from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from './types';

export const setAlert= (msg, color) =>async (dispatch) => {
    console.log(msg,color);
    const id = uuid();
    dispatch({
        type:SET_ALERT,
        payload:{msg, color, id}
    });

    setTimeout(()=>{
        return dispatch({
            type:REMOVE_ALERT,
            payload:id
        })
    }, 4000)
}