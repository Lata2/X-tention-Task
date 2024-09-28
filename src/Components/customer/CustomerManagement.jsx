import { Card, Form, Input, Button, Divider, message, DatePicker } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer } from './action';

function CustomerManagement() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => ({
    loading: state.customers.loading,
    error: state.customers.error,
  }));

  // Create a form instance
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await dispatch(addCustomer(values)); 
      message.success('Customer added successfully!');
      
      // Clear the input fields
      form.resetFields();
    } catch (error) {
      message.error('Failed to add customer: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      <Card style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px' }}>
        <h2 style={{ textAlign: 'center', backgroundColor: 'purple', color: 'white' }}>Customer Management</h2>

        {error && <div className="text-red-500">{error}</div>} 

        <Divider />
        <Card style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px' }}>
          <Form
            form={form} // Attach the form instance
            name="customer_management"
            onFinish={onFinish}
            layout="vertical"
            style={{ marginTop: '20px', maxWidth: '600px', margin: 'auto' }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input placeholder="Enter customer name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input placeholder="Enter customer email" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: 'Please enter your phone number!' },
                { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number!' }
              ]}
            >
              <Input placeholder="Enter customer phone number" />
            </Form.Item>

            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: 'Please select a date!' }]}
            >
              <DatePicker style={{ width: '100%' }} placeholder="Select customer date" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter your address!' }]}
            >
              <Input.TextArea placeholder="Enter customer address" rows={3} />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                style={{ backgroundColor: 'purple' }}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Card>
    </div>
  );
}

export default CustomerManagement;
