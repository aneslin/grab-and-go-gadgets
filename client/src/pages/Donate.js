import React, { useState } from 'react';
import { capitalizeFirstLetter } from '../utils/helpers';


// export default Donate
// import "./styles.css";
// import "./styles/tailwind-pre-build.css";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51KQmHmL95GfivA9j3s5q3VbORvl8ewgsWcbadgLX49NLIGxsCbbBo6FX7CKjPZBatvLKbuW1fRFxqVZGk2IZpzTX00liTcVpkK"
);
const DonationButton = ({ itemID, ammount }) => {
  const handleClick = async (event) => {
    const stripe = await stripePromise;
    stripe
      .redirectToCheckout({
        lineItems: [{ price: itemID, quantity: 1 }],
        mode: "payment",
        successUrl: window.location.protocol + "//google.com",
        cancelUrl: window.location.protocol + "//google.com",
        submitType: "donate",
      })
      .then(function (result) {
        if (result.error) {
          console.log(result);
        }
      });
  };

  return (
    <button
      className="btn btn-primary btn-xl js-scroll-trigger"
      onClick={handleClick}
    >
      Click Me to Donate {ammount}$
    </button>
  );
};
export default function App() {
    const [pages] = useState([
        {
            name: "Donate"
        }
    ]);
    const [currentPage] = useState(pages[0]);
  return (
      
    <>
    <div className="masthead text-center text-black d-flex">
            <div className="container my-auto">
                <div className="row"></div>
                        <div className="col-lg-10 mx-auto">
                        <h1>{capitalizeFirstLetter(currentPage.name)}</h1>
                        <hr />
                        <p className="text-faded mb-5">
                            We are a non-profit organization that provides technology to the community.
                            All Donations go towards the gadget-To-Go foundation.              
                        </p>
                        </div>

      <div className="btn btn-primary btn-xl js-scroll-trigger ">
        <DonationButton
          ammount={"10.00"}
          itemID="price_1KulRkL95GfivA9jNyCfIvU6"
        ></DonationButton>
      </div>
      </div>
      </div>
    </>
  );
}