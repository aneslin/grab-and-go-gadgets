import React, { useState } from 'react';
import { capitalizeFirstLetter } from '../utils/helpers';

const Contact = () => {
  const [pages] = useState([
    {
        name: "Contact Us"
    }
]);
const [currentPage] = useState(pages[0]);
  return (
    <div className="masthead text-center text-black d-flex">
    <div className="container my-auto">
        <div className="row">
            
            <div className="col-lg-10 mx-auto">
                <h1>{capitalizeFirstLetter(currentPage.name)}</h1>
                <hr />
                <p className="text-faded mb-5">
                  lorum ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit.
                </p>
            
            </div>
        </div>
    </div>
</div>
  )
}

export default Contact