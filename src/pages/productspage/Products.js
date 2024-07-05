import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [activeFilters, setActiveFilters] = useState({
        expired: true,
        low_stock: true,
    });

    const apiData = async () => {
        try {
            const { data } = await axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products');
            setDisplayProducts(data);
            setProducts(data);
            setCount(data.length);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        apiData();
    }, []);

    const handleFilterCheck = (e) => {
        const { name, checked } = e.target;
    
        setActiveFilters(prevFilters => ({
            ...prevFilters,
            [name]: checked,
        }));
    
        let filteredProducts = products.filter((product) => {
            const { expiryDate, stock } = product;
            const currentDate = new Date();
    
            if (name === 'expired' && name === 'low_stock') {
                return stock <= 100 || new Date(expiryDate) < currentDate;
            } else if (name === 'expired') {
                return new Date(expiryDate) < currentDate;
            } else if (name === 'low_stock') {
                return stock <= 100;
            } else {
                return true;
            }
        });
    
        setDisplayProducts(filteredProducts);
        setCount(filteredProducts.length);
    };
    

    return (
        <main className="main_container">
            <div className="Homepage_PageWrapper">
                <h1 className="Homepage_MainHeading">Products</h1>
                <div className="Homepage_OrdersWrapper">
                    <div className="Homepage_FilterWrapper">
                        <h3>Filters</h3>
                        <div className="Homepage_FilterOptions">
                            <p>Count: <span id="count">{count}</span></p>
                            <label className="Homepage_FilterCheckbox">
                                <input
                                    type="checkbox"
                                    name="expired"
                                    checked={activeFilters.expired}
                                    onChange={handleFilterCheck}
                                />Expired
                            </label>
                            <label className="Homepage_FilterCheckbox">
                                <input
                                    type="checkbox"
                                    name="low_stock"
                                    checked={activeFilters.low_stock}
                                    onChange={handleFilterCheck}
                                />
                                Low-Stock
                            </label>
                        </div>
                    </div>
                    <div style={{ width: "100%" }}>
                        <table className="Homepage_OrderTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product name</th>
                                    <th>Product Brand</th>
                                    <th>Expiry Date</th>
                                    <th>Unit Price</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                                {displayProducts.map((item, idx) => (
                                    <tr className='Homepage_TableRow' key={item.id + '' + idx}>
                                        <td className="Homepage_SecondaryText">{item.id}</td>
                                        <td className="Homepage_PrimaryText">{item.medicineName}</td>
                                        <td className="Homepage_PrimaryText">{item.medicineBrand}</td>
                                        <td className="Homepage_SecondaryText">{item.expiryDate}</td>
                                        <td className="Homepage_PrimaryText">{item.unitPrice}</td>
                                        <td className="Homepage_PrimaryText">{item.stock}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Products;
