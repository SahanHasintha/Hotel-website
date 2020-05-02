import React, {useState} from 'react';
import './css/slider.css';

const BanquetImages = ({images}) => {
    const [x, setX] = useState(0)
    const goLeft = () => {
        console.log(x);
        x === 0 ? setX(-100*(images.length-1)) : setX(x+100);
    }
    const goRight = () => {
        console.log(x)
        // x=== (images.length-1) 
        x ===  -100*(images.length-1) ? setX(0) : setX(x-100)
    }
    return (
        <div className="slider">
            {images.map((image,index) => {
                return <div key={index} className="slide" style={{transform:`translateX(${x}%)`}}>
                    <img src={image} alt="" style={{maxHeight:500, maxWidth:650}}/>
                </div>
            })}
            <button id="goLeft" onClick={goLeft}><i class="angle double left icon" style={{fontSize:50}}/></button>
            <button id="goRight" onClick={goRight}><i class="angle double right icon" style={{fontSize:50}}/></button>
        </div>
    )
}

export default BanquetImages;