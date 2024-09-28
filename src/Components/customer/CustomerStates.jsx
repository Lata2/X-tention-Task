import { Table, Button, Popconfirm, Divider, message, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, deleteCustomer } from './action';

function CustomerStates() {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector(state => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    // {
    //   title: 'Created Date',
    //   dataIndex: 'date',
    //   key: 'date',
    // },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this customer?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
  }

  if (error) {
    message.error(error);
  }

  return (
    <div className="p-5 bg-gray-100" style={{padding:'2%'}}>
                <h2 style={{textAlign:'center',backgroundColor:'purple',color:'white'}}>Customer state</h2>

      <Divider />
      {customers && (
        <Table
          columns={columns}
          dataSource={Array.isArray(customers) ? customers : []}
          pagination={false}
          bordered
          rowKey="id"
          className="max-w-2xl mx-auto"
        />
      )}
    </div>
  );
}

export default CustomerStates;
