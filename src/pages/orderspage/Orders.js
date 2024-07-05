import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './order.css';

const Orders = () => {
    const [orders, setOrders] = useState(null);
    const [displayOrders, setDisplayOrders] = useState([]);
    const [count, setCount] = useState(0);
    const [activeFilters, setActiveFilters] = useState({
        New: true,
        Packed: true,
        InTransit: true,
        Delivered: true,
    });

    const apiData = async () => {
        try {
            const { data } = await axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders');
            setOrders(data);
            setDisplayOrders(data);
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
        setActiveFilters({ ...activeFilters, [name]: checked });
    };

    useEffect(() => {
        if (!orders) return;
        
        const filteredOrders = orders.filter(order => activeFilters[order.orderStatus]);
        setDisplayOrders(filteredOrders);
        setCount(filteredOrders.length);
    }, [orders, activeFilters]);

    return (
        <main className="main_container">
            <div className="Homepage_PageWrapper">
                <h1 className="Homepage_MainHeading">Orders</h1>
                <div className="Homepage_OrdersWrapper">
                    <div className="Homepage_FilterWrapper">
                        <h3>Filters</h3>
                        <div className="Homepage_FilterOptions">
                            <p>
                                count :
                                <span>{count}</span>
                            </p>
                            {Object.entries(activeFilters).map(([key, value]) => (
                                <label key={key} className="Homepage_FilterCheckbox">
                                    <input
                                        type="checkbox"
                                        name={key}
                                        checked={value}
                                        onChange={handleFilterCheck}
                                    />
                                    {key}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={{ width: "100%" }}>
                        <table className="Homepage_OrderTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                                {displayOrders.map((item, idx) => (
                                    <tr className='Homepage_TableRow' key={item.id + '' + idx}>
                                        <td className="Homepage_SecondaryText">{item.id}</td>
                                        <td className="Homepage_PrimaryText">{item.customerName}</td>
                                        <td className="Homepage_PrimaryText">{item.orderDate}<br />
                                            <span className="Homepage_SecondaryText">{item.orderTime}</span>
                                        </td>
                                        <td className="Homepage_SecondaryText">{item.amount}</td>
                                        <td className="Homepage_PrimaryText">{item.orderStatus}</td>
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

export default Orders;
