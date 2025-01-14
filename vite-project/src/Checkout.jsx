import { useEffect,useState } from "react";


const Checkout = () => {
    const [data,setData]=useState('')
    console.log("hanji",data)
    useEffect(()=>{
        if(data){
            console.log("kumarg")
        }
    },[data])
    const handleCheckout = async () => {
    try {
        // Example data to send to the backend
        const checkoutData = {
            tickets: 2, // Example: Number of tickets
            selectedSeats: ['A1', 'B3'], // Example: Selected seats
            totalAmount: 400, // Example: Total price
            userDetails: {
                name: 'John Doe',
                email: 'john@example.com'
            }
        };

        const response = await fetch('https://tester-bb9p.onrender.com/payment', { // Backend API URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkoutData), // Send checkout data in the body
        });

        if (!response.ok) {
            throw new Error('Failed to create checkout session');
        }

        const data = await response.json();
        console.log(data);
        setData(data?.url);

        if (data.url) {
            window.location.href = data.url; // Redirect to Stripe Checkout
        } else {
            console.error('No URL returned from backend');
        }
    } catch (error) {
        console.error('Error during checkout:', error);
    }
};


    return (
        <div>
            <h1>Stripe Checkout</h1>
            <button onClick={handleCheckout}>Pay</button>
            {
                data
            }
        </div>
    );
};

export default Checkout;
