import React, {useEffect, useState} from "react";
import ProductCard from "./ProductCard.jsx";
import axios from "axios";

function Catalog() {
    const [cartData, setCartData] = useState([]);
    const [productData, setProductData] = useState([]);

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

    useEffect(() => {
        axios.get(
            'http://localhost:1337/api/products?populate[0]=image'
        ).then(response => {
            setProductData(response.data.data);
        }).catch(error => {})
    }, [setProductData]);

    return (
        <div className='d-flex'>
            <ul className="product-card-grid d-grid" style={{gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem"}}
                role="list">
                {productData.map(item => (
                    <ProductCard client:only="react"
                                 id={item.id}
                                 title={item.attributes.title}
                                 image={'http://localhost:1337' + item.attributes.image.data.attributes.url}
                                 price={item.attributes.price}/>
                ))}
            </ul>
        </div>
    )
}

export default Catalog;