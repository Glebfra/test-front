import React, {useEffect, useState} from "react";
import axios from "axios";
import ProductCart from "./ProductCart.jsx";

function Cart() {
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        axios.get(
            'http://localhost:1337/api/users/me?populate[products][populate][0]=image',
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then(response => {
            setCartData(response.data.products);
        })
    }, [setCartData]);

    return (
        <div className='d-flex'>
            <ul className="product-card-grid d-grid" style={{gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem"}} role="list">
                {cartData.map(item => (
                    <ProductCart client:only="react"
                                 id={item.id}
                                 title={item.title}
                                 image={'http://localhost:1337' + item.image.url}
                                 price={item.price}/>
                ))}
            </ul>
        </div>
    )
}

export default Cart;