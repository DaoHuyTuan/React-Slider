import React from "react";

function Item(props)  {
    return (
        <div className="item" style={{backgroundColor: props.bgColor}}>
            <span className="numBerTest">{props.text}</span>
        </div>
    )
}
export default Item