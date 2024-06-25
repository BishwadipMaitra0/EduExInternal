// ErrorHandler.js
import React, { useEffect } from 'react';
import './ErrorHandler.css'; // Import CSS file for ErrorHandler styling

const ErrorHandler = ({ response }) => {
    if (!response) return null;

    let message;
    let textColor = '#fff'; // Default text color for alerts

    switch (response.statusCode) {
        case 'SUI004':
            message = 'Login successful';
            break;
        case 'EUE003':
            message = 'Wrong Password';
            break;
        case 'EUE002':
            message = 'No user found';
            break;
        case 'ES001':
            message = 'Connection Rejected';
            break;
        default:
            message = 'An unknown error occurred';
            break;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            // Clear error message after 1 second
            setResponse(null);
        }, 1000);

        return () => clearTimeout(timer);
    }, [response]);

    // Set text color to red for error messages
    if (response.statusCode !== 'SUI004') {
        textColor = '#f44336'; // Red color
    }

    return (
        <div className={`alert ${response.statusCode === 'SUI004' ? 'alert-success' : 'alert-error'}`} style={{ color: textColor }}>
            {message}
        </div>
    );
};

export default ErrorHandler;
