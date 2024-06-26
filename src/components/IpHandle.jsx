import React, { useEffect } from "react";
import axios from "axios";

const IpHandle = ({ setIP }) => {
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("https://api.ipify.org/?format=json");
                console.log(res.data);
                setIP(res.data.ip);
                
            } catch (error) {
                console.error("Error fetching the IP address:", error);
            }
        };

        

        getData();
    }, [setIP]);

    return (
        <div className="App">
            {/* IP component doesn't need to render anything */}
        </div>
    );
}

export default IpHandle;
