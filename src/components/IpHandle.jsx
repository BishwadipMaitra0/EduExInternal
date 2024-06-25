import React, { useEffect } from "react";
import axios from "axios";

const IpHandle = ({ setIP }) => {
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("https://api.ipify.org/?format=json");
                console.log(res.data);
                setIP(res.data.ip);
                sendIPToBackend(res.data.ip);
            } catch (error) {
                console.error("Error fetching the IP address:", error);
            }
        };

        // const sendIPToBackend = async (ip) => {
        //     try {
        //         const res = await axios.post("https://edu-explorer.com/api/save-ip.php", { ip });
        //         console.log("Response from backend:", res.data);
        //         console.log(`The IP: ${ip}`);
        //     } catch (error) {
        //         console.error("Error sending IP to the backend:", error);
        //     }
        // };

        getData();
    }, [setIP]);

    return (
        <div className="App">
            {/* IP component doesn't need to render anything */}
        </div>
    );
}

export default IpHandle;
