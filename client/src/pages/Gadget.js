import React, { useState } from 'react';
import { capitalizeFirstLetter } from '../utils/helpers';
import Items from '../components/Items/Items'
import { QUERY_ITEMS } from '../utils/queries'
import { Row, Col} from 'react-bootstrap'
import {useQuery} from '@apollo/client'
function Gadget() {
 const {loading, data, error, refetch} = useQuery(QUERY_ITEMS)  
    const [pages] = useState([
        {
            name: "Gadgets"
        }
    ]);
    const [currentPage] = useState(pages[0]);
console.log(data)
    return (

        
        <div className="masthead text-center text-black d-flex">
            <div className="container my-auto">
                <div className="row">
                    
                    <div className="col-lg-10 mx-auto">
                        <h1>{capitalizeFirstLetter(currentPage.name)}</h1>
                        <hr />
                        <p className="text-faded mb-5">
                        </p>
                    </div>
                </div>
                <Row>
                {loading ? (
          <p>"loading"</p>
        ) : (
          data.items.map((item) => {
            let { _id, name, image, description, itemStatus, dueDate } = item;

            return (
              <Col key = {_id}>
                {" "}
                <Items
                 
                  
                  
                  _id={_id}
                  name={name}
                  image={image}
                  description={description}
                  dueDate={dueDate}
                  itemStatus={itemStatus}
                ></Items>
              </Col>
            );
          })
        )}
                </Row>

            </div>
        </div>
    )
}

export default Gadget