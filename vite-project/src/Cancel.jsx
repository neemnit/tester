import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Cancel() {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const email = params.get('email');

        if (email) {
            // Make a call to backend to clean up user and seat details
            fetch(`http://localhost:4000/failure?email=${email}`, {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Cleanup successful:', data.message);
                })
                .catch((error) => console.error('Error during cleanup:', error));
        }
    }, [location]);

    return <h1>Payment Canceled</h1>;
}

export default Cancel;
