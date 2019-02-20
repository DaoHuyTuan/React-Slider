import React from "react";

function Arrow(props) {
    return (
        
        <button 
            className={props.nameClass}
            kinds={props.kinds}
            onClick={props.OnSlide}
        ></button>
    )
}
export default Arrow;
