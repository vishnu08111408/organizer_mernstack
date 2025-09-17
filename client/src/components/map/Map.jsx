import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactMapGL, { Marker } from 'react-map-gl';
import { BiCurrentLocation, BiLocationPlus } from "react-icons/bi"
import "./Map.css"
import { toast } from 'react-toastify';
import APIRequests from '../../api';


// import { useDispatch, useSelector } from 'react-redux';
// import { setUser, toggleChat, setUsers } from '@/redux/reducers/chatReducer';

const MyMap = ({ lat, long, forReg, setLatLng }) => {
    const mapRef = useRef();
    // const dispatch = useDispatch();

    const [location, setLocation] = React.useState({});

    // const users = useSelector(state => state.chat.users);
    // const users = null;
    const [users, setUsers] = useState(null);
    const fly = useCallback(({ longitude, latitude }) => {
        mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
    }, []);

    const getCurrentLocation = () => {
        navigator.permissions.query({ name: 'geolocation' }).then(function (permissionStatus) {
            if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        setLocation(position.coords);
                        const lat = isNaN(position.coords.latitude) ? 19.12315995904184 : position.coords.latitude;
                        const long = isNaN(position.coords.longitude) ? 72.83611545347907 : position.coords.longitude;
                        fly({ longitude: long, latitude: lat });
                    },
                    function (error) {
                        toast.error(error.message, toastConfig);
                    },
                    { enableHighAccuracy: true, maximumAge: 10000 }
                );
            } else if (permissionStatus.state === 'denied') {
                toast.error("Geolocation permission was denied.", toastConfig);
            }
        });
    }

    const toastConfig = {
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    };

    useEffect(() => {
        if (lat && long) {
            fly({ longitude: long, latitude: lat });
        }
    }, [lat, long]);

    React.useEffect(() => {

        // check in local storage if profile key exists
        if (forReg) {
            getCurrentLocation();
            return;

        };
        if (!localStorage.getItem("profile")) {
            return;
        }

        APIRequests.getHospitals().then((res) => {
            if (res.status == 200) {
                console.log("hospitals", res.data)
                // dispatch(setUsers(res.data.users));
                if (res.data) setUsers(res.data);
            }
        }).catch((err) => {
            console.log("error fetching hospitals", err)
        })

        getCurrentLocation();
    }, []);




    const [viewport, setViewport] = React.useState({
        latitude: 19.12315995904184,
        longitude: 72.83611545347907,
        zoom: 13
    });

    return (
        <div style={{
            width: "100%",
            height: forReg ? "250px" : "100vh",
        }}>
            <ReactMapGL
                ref={mapRef}
                initialViewState={lat && long && forReg ? {
                    latitude: lat,
                    longitude: long,
                    zoom: 13
                } : { ...viewport }}
                interactive={true}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onMove={evt => setViewport(evt.viewState)}
                mapboxAccessToken={import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN}
                onClick={e => {
                    if (forReg && setLatLng) {
                        setLatLng({ latitude: e.lngLat.lat, longitude: e.lngLat.lng });
                    }
                }}
            >
                <div style={{ position: 'absolute', left: 10, top: 10 }} className='flex flex-col'>
                    <div
                        className='rounded-full w-12 h-12 flex items-center justify-center mb-2'
                        style={{ backgroundColor: '#00000099' }}
                        onClick={getCurrentLocation}
                    >
                        <BiCurrentLocation
                            title='Current Location'
                            size={30}
                            color="lightblue"
                        />
                    </div>
                </div>
                {(location.latitude && location.longitude) &&
                    (<Marker
                        latitude={location.latitude}
                        longitude={location.longitude}
                        scale={0.5}
                    >
                        <CustomMarker />
                    </Marker>
                    )}

                {forReg && lat && long && (
                    <Marker
                        latitude={lat}
                        longitude={long}
                        draggable={true}
                        onDragEnd={(event) => {
                            setLatLng({
                                latitude: event.lngLat.lat,
                                longitude: event.lngLat.lng,
                            })
                        }}
                    >
                    </Marker>
                )
                }

                {users && users.map((user, index) => {
                    if (user.location && user.location.latitude && user.location.longitude) {
                        return (
                            <Marker
                                key={user._id}
                                latitude={user.location.latitude}
                                longitude={user.location.longitude}
                                draggable={false}
                                scale={0.5}
                                onClick={
                                    // console.log("clicked", user)
                                    () => {
                                        // dispatch(setUser(index));
                                        // dispatch(toggleChat(true));
                                    }
                                }
                            >
                                <FriendMarker name={user.name ?? "Hospital X"} />
                            </Marker>
                        )
                    }
                }
                )}
            </ReactMapGL>
        </div>
    );
};

export default MyMap;

const CustomMarker = ({ imgSrc }) => {
    const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDCFo7NYw__eCBw5E0xthvAeC-265P0xz4kJm-D0r6qYiDM90DWH4I5QUEC6JodOut2g&usqp=CAU';

    const markerStyle = {
        backgroundImage: `url(${imgSrc || defaultImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div
            className="relative"
        >
            <div className="w-8 h-8 rounded-full border-2 border-white" style={markerStyle}></div>
            <div className="pin-after w-0 h-0 mt-1 border-l-3 border-transparent border-r-3 border-transparent border-b-4 border-gray-600 inline-block"></div>
        </div>
    )
}


const FriendMarker = ({ imgSrc, name }) => {
    const defaultImage = 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg';

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const [randomColor] = useState(getRandomColor);

    const markerStyle = {
        backgroundImage: `linear-gradient(${randomColor}44, ${randomColor}44), url(${imgSrc || defaultImage})`, // Adjusted opacity to 44 (about 26%)
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div className="relative">
            <div style={{
                backgroundColor: randomColor,
            }} className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold shadow-md bg-gray-200 px-2 py-1 rounded-lg"> {/* Added more top offset and styles for the chip */}
                {name}
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-white" style={markerStyle}></div>
            <div className="pin-after w-0 h-0 mt-1 border-l-3 border-transparent border-r-3 border-transparent border-b-4 border-gray-600 inline-block"></div>
        </div>
    )
}
