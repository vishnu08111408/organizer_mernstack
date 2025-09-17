import React, { useState } from "react"
import LocationSearchInput from "./LocationSearch"
import MyMap from "./Map";

const MapTest = () => {
    const [location, setLocation] = useState(null);
    return (
        <div>   
            <LocationSearchInput setLatLng={setLocation} />
            <MyMap lat={ location ? location.latitude: null} long={location ? location.longitude : null} forReg={true} setLatLng={setLocation} />
        </div>
    )
}

export default MapTest;