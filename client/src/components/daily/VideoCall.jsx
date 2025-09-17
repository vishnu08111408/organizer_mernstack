import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import DailyIframe from "@daily-co/daily-js";
import styled from "styled-components";
import "../../styles/test.css"

const DailyUrl = "https://sid-team.daily.co";

const CALL_OPTIONS = {
    iframeStyle: {
        width: "100%",
        minHeight: "100%",
        height: "100vh",
        border: "1px solid #e6eaef",
        borderRadius: "6px 6px 0 0",
    },
    showLeaveButton: true,
    showFullscreenButton: true,
    url: ""
};

const VideoCall = () => {
    const {id} = useParams()
    console.log(id)
    const videoRef = useRef(null);
    const [callframe, setCallframe] = useState(null);
    let newCallframe = null;

    useEffect(() => {
        if (!videoRef || !videoRef?.current || callframe) return;
        CALL_OPTIONS.url = DailyUrl + "/" + id;

        
        if(newCallframe) return;

         newCallframe = DailyIframe.createFrame(
            videoRef.current,
            CALL_OPTIONS
        );

        newCallframe.join().then(() => {
            setCallframe(newCallframe);
        });
    }, [videoRef]);

    useEffect(() => {
        return () => {
            // destory callframe
            // callframe?.destroy();
            if(newCallframe) newCallframe.destroy();
        };
    }, []);  //
    return (
        <div>
            <VideoContainer className="test" >
                <Callframe ref={videoRef} />
            </VideoContainer>
        </div>
    );
};

const VideoContainer = styled.div`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
`;
const Callframe = styled.div`
 width: 100%;
 height: 100%;
`;

export default VideoCall;