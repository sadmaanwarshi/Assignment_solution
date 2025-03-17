import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:3000/api"; // Adjust if your backend runs on a different port

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    billnum: "",
    amount: "",
  });
  const [searchBillNum, setSearchBillNum] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch bills based on the entered bill number
  const fetchBills = async () => {
    if (!searchBillNum) {
      toast.error("Please enter a bill number!");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/bills?billnum=${searchBillNum}`);
      if (response.data.length === 0) {
        toast.error("No bills found for this bill number.");
      }
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
      toast.error("Error fetching bills!");
    }
  };

  // Handle adding a new bill
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/bill`, formData);
      toast.success("Bill added successfully!");
      setFormData({ name: "", phone: "", billnum: "", amount: "" });
    } catch (error) {
      toast.error("Error adding bill!");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="text-center mb-4">Billing System</h2>

       {/* Billing Form */}
       <div className="card p-4 shadow-sm mt-4">
        <h4>Add New Bill</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Customer Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Bill Number</label>
            <input type="text" className="form-control" name="billnum" value={formData.billnum} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input type="number" className="form-control" name="amount" value={formData.amount} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Add Bill</button>
        </form>
      </div>

      {/* Search Bill Number */}
      <div className="card p-4  shadow-sm mt-4">
        <h4>Search Bill</h4>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Enter Bill Number"
            value={searchBillNum}
            onChange={(e) => setSearchBillNum(e.target.value)}
          />
          <button className="btn btn-primary" onClick={fetchBills}>
            Fetch Bill
          </button>
        </div>
      </div>

      {/* Bills Table */}
      <div className="card p-4 mt-4 shadow-sm">
        <h4>Customer Bills</h4>
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Bill Number</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.bill_num}</td>
                  <td>${customer.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

export default App;
