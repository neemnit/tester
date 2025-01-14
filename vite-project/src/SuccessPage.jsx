import  { useEffect, useState } from 'react';

const SuccessPage = () => {
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const fetchSuccessData = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const sessionId = queryParams.get('session_id');
      const userData = queryParams.get('user_data'); // Get the user_data (sessionId)

      if (sessionId && userData) {
        try {
          // Send the session_id and user_data to your backend for processing
          const response = await fetch(`http://localhost:4000/success?session_id=${sessionId}&user_data=${userData}`);
          const data = await response.json();

          if (response.ok) {
            setPaymentData(data); // Store data in state
          } else {
            console.error('Error:', data.error);
          }
        } catch (error) {
          console.error('Error fetching payment success data:', error);
        }
      } else {
        console.error('Session ID or user data missing');
      }
    };

    fetchSuccessData();
  }, []);

  return (
    <div>
      <h1>Payment Success</h1>
      {paymentData ? (
        <div>
          <h2>Thank You for Your Payment!</h2>
          <p>Your payment was successful.</p>
          <pre>{JSON.stringify(paymentData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
};

export default SuccessPage;
