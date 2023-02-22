import React, { useState, useEffect } from 'react';
import sensorBoard from "../../res/merci_sersorboardv1.0.png"

const BoardGraph = () => {

    return (<div
        id={"chart2"}
        style={{
            height:"220px",
            backgroundImage: `url(${sensorBoard})`,
            backgroundSize:"140% 140%",
            backgroundPosition: "50% 50%"
        }}>

    </div>)


};

export default BoardGraph;