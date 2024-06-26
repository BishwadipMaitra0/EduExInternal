import React, { useEffect, useState } from 'react';
import './ErrorHandler.css'; // Import CSS file for ErrorHandler styling

const ErrorHandler = ({ response, clearResponse }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (response) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                clearResponse();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [response, clearResponse]);

    if (!isVisible) return null;

    let message;
    let className;

    switch (response.statusCode) {
        case 'SUI004':
            message = 'Login successful';
            className = 'alert-success';
            break;
        case 'EUE003':
            message = 'Wrong Password';
            className = 'alert-error';
            break;
        case 'EUE002':
            message = 'No user found';
            className = 'alert-error';
            break;
        case 'ES001':
            message = 'Connection Rejected';
            className = 'alert-error';
            break;
        default:
            message = 'An unknown error occurred';
            className = 'alert-error';
            break;
    }

    console.log('Response:', response);

    return (
        <div className={`alert ${className}`}>
            {message}
        </div>
    );
};

export default ErrorHandler;
