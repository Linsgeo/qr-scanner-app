import React, { useState } from "react";

import QrReader from "react-web-qr-reader";
import successBeep from "./assets/successBeep.mp3";
import errorBeep from "./assets/errorBeep.mp3";
import { Howl, Howler } from "howler";


const ScannerComponent = (props) => {


    const [qrArray, setQrArray] = useState([]);
    const [qrError, setQrErrorValue] = useState("");
    const [camState, setCamState] = useState(true);

    const delay = 500;
    const previewStyle = {
        height: "70%",
        width: "100%"
    };


    const playSound = (src) => {
        const sound = new Howl({
            src,
            html5: true,
        });
        sound.play();
    };
    Howler.volume(1.0);

    const checkValidCode = (value) => {
        var re = /[0-9A-Fa-f]{6}/g;
        if (re.test(value)) {
            setQrErrorValue("");
            return true;
        } else {
            setQrErrorValue(value);
            playSound(errorBeep);
            return false;
        }
    };

    const checkDuplicate = (value) => {

        let isExist = qrArray.includes(value);
        if (!isExist) {

            if (checkValidCode(value)) {

                let qrArrayTemp = [...qrArray, value];
                setQrArray(qrArrayTemp);
                playSound(successBeep);
            }
            return false;
        } else {
            playSound(errorBeep);
            return true;
        }
    };

    const clearList = () => {
        setQrArray([]);
        props.setClearList();
    };

    const handleScan = (response) => {

        if (response) {

            if (!checkDuplicate(response.data) && checkValidCode(response.data)) {
                props.getQRCode(response);
            }
           
        }

    };

    const handleError = (error) => {
        console.log(error);
    };

    return (
        <>
            {camState && (
                <div>
                <QrReader
                    delay={delay}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                />
                </div>
            )}
            {qrError && qrError.length > 0 && (
                <p style={{ textAlign: "center", color: 'red' }}>
                    {qrError} is not a hexadecimal value
                </p>
            )}
            <div style={{ marginTop: "50px", width: '100%', display: 'flex', justifyContent: 'center', }}>


                <button
                    onClick={() => {
                        setCamState(!camState);
                    }}
                    style={{ marginRight: '5%', width: '40%', padding: '2%', fontWeight: '700', backgroundColor: 'lightgrey' }}

                >
                    {camState ? "Switch off Camera" : "Switch on Camera"}
                </button>
                <button
                    onClick={() => {
                        clearList()
                    }}
                    style={{ height: '10%', width: '40%', padding: '2%', fontWeight: '700', backgroundColor: 'lightgrey' }}
                >
                    Clear List
                </button>
            </div>
        </>
    );
};



export default ScannerComponent;