import React from 'react';
import img from "./not_found_image.png";


const notfound = () => {

    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    };

    // const headingStyle = {
    //     fontSize: "3rem",
    //     color: "#333"
    // };

    const imageStyle = {
        width: "50vw",
        height: "auto",
        // marginBottom: "20px"
    };

    return (
        <div className="not-found" style={style}>
            <img 
                src={img} 
                alt="Not Found" 
                style={imageStyle} 
            />
            {/* <h1 style={headingStyle}>Page Not Found</h1> */}
        </div>
    );
}

export default notfound;
