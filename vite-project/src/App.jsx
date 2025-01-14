// import { useState} from "react";
// import axios from "axios";
// function App() {
//   const handlePayment = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.get("http://localhost:8000/payment");
//       if (res && res.data) {
//         window.location.href = res.data.links[1].href;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//   return (
//     <>
//       <button onClick={handlePayment}>Proceed to Payment</button>
//     </>
//   );
// }
// export default App;





























// import axios from 'axios';

// function App() {
//   const buyFunction = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/payment');
//       if (response.status === 200) {
//         window.location.href = response.data.url;
//       }
//     } catch (error) {
//       console.error('Error processing payment:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Buy a T-Shirt</h1>
//       <button onClick={buyFunction}>Buy Now</button>
//     </div>
//   );
// }

// export default App;

























import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from './Checkout';
import Cancel from './Cancel';
import SuccessPage from './SuccessPage';

const stripePromise = loadStripe('pk_test_51OhulWSDztXzlF8YoQhJBN9dUHmXyOx7h90ezZXFjSoKFbB6SGduKuSPmfrQpT4CfO01vy0LGStv0H1osOwUUfv5000q8U8bE5'); // Replace with your Publishable Key

function App() {
    return (
        <Router>
            <Routes>
                {/* Wrap only the Checkout route with Elements */}
                <Route 
                    path="/" 
                    element={
                        <Elements stripe={stripePromise}>
                            <Checkout />
                        </Elements>
                    } 
                />
                <Route path="/success" element={<SuccessPage/>} />
                <Route path="/cancel" element={<Cancel/>} />
            </Routes>
        </Router>
    );
}

export default App;
