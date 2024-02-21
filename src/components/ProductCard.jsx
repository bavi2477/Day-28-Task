import React, { useContext } from 'react';
import { myContext } from '../App';

const ProductCard = () => {
    const [data, setData] = useContext(myContext)

    const totalAmount = data.reduce((total, data) => total + data.price * (data.quantity || 1), 0);
    const totalQuantity = data.reduce((total, data) => total + (data.quantity || 1), 0);

    const handleDecrease = (id, quantity) => {
        setData(preVal => {
            return preVal.map((item) => {
                if(item.id === id && (item.quantity || quantity) > 0) {
                    return {...item, quantity:(item.quantity || quantity) - 1}
                }
                return item
            })
        })
    }

    const handleIncrease = (id, quantity) => {
        setData(preVal => {
            return preVal.map((item) => {
                if(item.id === id) {
                    return {...item, quantity:(item.quantity || quantity) + 1}
                }
                return item
            })
        })

    }
    return (
        <div className="container">
            <div className="row">
          <p className='p-3 mb-2 bg-info text-white text-center'>Total Quantity: {totalQuantity}</p>
          <p className='p-3 mb-2 bg-info text-white text-center'>Total Amount: ${totalAmount}</p>
        </div>
        <div className="row">
            {data.map(product => (
                <div key={product.id} className="col-md-6 mb-3">
                    <div className="card h-100">
                        <div id={`carousel-${product.id}`} className="carousel slide" data-bs-ride="carousel" style={{ height: "400px" }}>
                            <div className="carousel-inner" style={{ height: "400px" }}>
                                {product.images.map((image, index) => (
                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} style={{ height: "400px" }}>
                                        <img src={image} className="d-block w-100" alt={`Slide ${index}`} style={{ objectFit: "cover", height: "400px" }} />
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${product.id}`} data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${product.id}`} data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <p className="card-text">{product.description}</p>
                            <p className="card-text">Price: ${product.price}</p>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Quantity</span>
                                <button className="btn btn-outline-secondary" type="button" onClick={()=>handleDecrease(product.id, product.quantity || 1)}>-</button>
                                <button className="btn btn-outline-secondary" type="button" onClick={()=>handleIncrease(product.id, product.quantity || 1)}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

export default ProductCard;