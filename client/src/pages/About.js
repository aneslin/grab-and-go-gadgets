import React, { useState } from 'react';
import { capitalizeFirstLetter } from '../utils/helpers';

function About() {
    const [pages] = useState([
        {
            name: "about Us"
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
                    
                        <a className="btn btn-primary btn-xl js-scroll-trigger" href="/gadget">Check Out our Gadgets</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About