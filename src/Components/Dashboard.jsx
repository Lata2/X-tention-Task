import React, { useEffect, useState } from 'react';
import { Card, Table, Col, Row, Divider, Radio } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { fetchCustomers } from '../Components/customer/action';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
    const dispatch = useDispatch();
    const [lineData, setLineData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const today = new Date();

    const { customers } = useSelector(state => state.customers);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(fetchCustomers());
            updateLineData(filter); 
            setLoading(false);
        };

        fetchData();
    }, [dispatch, filter]);

    const updateLineData = (filter) => {
        const monthData = {};
    
        customers.forEach(customer => {
            const createdAt = new Date(customer.date);
            if (isNaN(createdAt)) return;

            const month = createdAt.toLocaleString('default', { month: 'long' });
            let include = false;

            switch (filter) {
                case 'today':
                    include = createdAt.toDateString() === today.toDateString();
                    break;
                case 'thisWeek':
                    const startOfWeek = new Date(today);
                    startOfWeek.setDate(today.getDate() - today.getDay());
                    include = createdAt >= startOfWeek && createdAt <= today;
                    break;
                case 'thisMonth':
                    include = createdAt.getMonth() === today.getMonth() && createdAt.getFullYear() === today.getFullYear();
                    break;
                default:
                    break;
            }

            if (include) {
                if (!monthData[month]) {
                    monthData[month] = { increment: 0, decrement: 0 };
                }
                monthData[month].increment += 1;
            }
        });

        const lineDataResponse = Object.entries(monthData).map(([name, data]) => ({
            name,
            increment: data.increment,
            decrement: data.decrement,
        }));

        setLineData(lineDataResponse);
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
    ];

    const recentThreeCustomers = customers.slice().reverse().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);

    const totalCustomers = customers.length;
    const todayCount = customers.filter(customer => new Date(customer.date).toDateString() === today.toDateString()).length;
    const thisWeekCount = customers.filter(customer => {
        const customerDate = new Date(customer.date);
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        return customerDate >= startOfWeek && customerDate <= today;
    }).length;
    const thisMonthCount = customers.filter(customer => {
        const customerDate = new Date(customer.date);
        return customerDate.getMonth() === today.getMonth() && customerDate.getFullYear() === today.getFullYear();
    }).length;

    return (
        <div className="p-4 md:p-8 bg-gray-100">

            <Divider />
            <h2 style={{textAlign:'center',backgroundColor:'purple',color:'white'}}>Dashboard</h2>

            <Row gutter={[16, 16]} style={{ padding: '2%' }}>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Total Customers" bordered={false} className="shadow-md" style={{
                        boxShadow: '0 10px 15px -3px rgba(255, 215, 0, 0.25), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
                        backgroundColor: 'white'
                    }}>
                        <h2 className="text-xl text-orange-500">{totalCustomers}</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="Today's Added Customers" bordered={false} className="shadow-red" style={{
                        boxShadow: '0 10px 15px -3px rgba(255, 0, 0, 0.25), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
                        backgroundColor: 'white'
                    }}>
                        <h2 className="text-xl text-red-500">{todayCount}</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="This Week Added Customers" bordered={false} className="shadow-blue" style={{
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 255, 0.25), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
                        backgroundColor: 'white'
                    }}>
                        <h2 className="text-xl text-blue-500">{thisWeekCount}</h2>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card title="This Month Added Customers" bordered={false} className="shadow-green" style={{
                        boxShadow: '0 10px 15px -3px rgba(0, 255, 0, 0.25), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
                        backgroundColor: 'white'
                    }}>
                        <h2 className="text-xl text-green-500">{thisMonthCount}</h2>
                    </Card>
                </Col>
            </Row>

            <Divider />
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card title="Customer Increment and Decrement" className="shadow-lg">
                        <Radio.Group
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={{ marginBottom: 16 }}
                        >
                            <Radio.Button value="today">Today</Radio.Button>
                            <Radio.Button value="thisWeek">This Week</Radio.Button>
                            <Radio.Button value="thisMonth">This Month</Radio.Button>
                        </Radio.Group>
                        {lineData.length > 0 ? (
                            <LineChart width={500} height={300} data={lineData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="increment" stroke="#8884d8" name="Increment" />
                                <Line type="monotone" dataKey="decrement" stroke="#ff7300" name="Decrement" />
                            </LineChart>
                        ) : (
                            <div>No data available for this selection.</div>
                        )}
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card title="Recent 3 Customers" className="shadow-lg">
                        <Table columns={columns} dataSource={recentThreeCustomers} pagination={false} loading={loading} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
