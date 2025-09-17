import React, { Component } from 'react'
export class kommunicate extends Component {

    componentDidMount() {
        // Prevent loading the Kommunicate script multiple times
        if (!window.kommunicateScriptLoaded) {
            (function (d, m) {
                var kommunicateSettings =
                    { "appId": "3258c4bdb85c8cafb7b30917e58c2a769", "popupWidget": true, "automaticChatOpenOnNavigation": true };
                var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
                s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
                var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
                window.kommunicate = m; m._globals = kommunicateSettings;
                window.kommunicateScriptLoaded = true;
            })(document, window.kommunicate || {});
        }
        /* NOTE : Use web server to view HTML files as real-time update will not work if you directly open the HTML file in the browser. */
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default kommunicate