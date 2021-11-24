import React from "react";

const style = {
    display:"flex",
    height:"100%"
};

function Wrapper(props) {
    return <div style={style}>{props.children}</div>;
}
export default Wrapper;