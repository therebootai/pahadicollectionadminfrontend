import React from "react";
import DisplayTable from "../global/DisplayTable";
import axiosFetch from "../../config/axios.config";

const CustomersTable = ({ customers, handleOpenModal, fetchCustomers }) => {
  const tableHeader = [
    "id",
    "Customer Name",
    "Sign Up Date",
    "Mobile No.",
    "Total Order Value",
    "Login Status",
    "disabled",
    "Action",
  ];

  function calculateTotalAmount(orders) {
    return orders.reduce((total, order) => total + order.totalAmount, 0);
  }

  async function toggleCustomerStatus(id, isDisabled) {
    try {
      const response = await axiosFetch.put(`/customers/${id}`, {
        is_disabled: !isDisabled,
      });
      await fetchCustomers();
      alert("Customer Status Updated Successfully");
    } catch (error) {
      console.log(error);
      alert("Falied to update customer Status");
    }
  }

  return (
    <DisplayTable tableData={{ tableHeader }}>
      {customers.length > 0 ? (
        customers.map((customer) => (
          <div
            key={customer._id}
            className="flex flex-row p-2 border-b border-custom-gray-border text-base"
          >
            <div className="flex-1">{customer.customerId}</div>
            <div className="flex-1">{customer.name}</div>
            <div className="flex-1">
              {new Date(customer.createdAt).toDateString()}
            </div>
            <div className="flex-1">{customer.mobile}</div>
            <div className="flex-1">
              {calculateTotalAmount(customer.orders)}
            </div>
            <div className="flex-1">{customer.isLogin ? "Yes" : "No"}</div>
            <div className="flex-1">{customer.is_disabled ? "Yes" : "No"}</div>
            <div className="flex  items-center gap-3 flex-1">
              <button
                className="text-base font-medium text-custom-violet"
                onClick={() => handleOpenModal("view-customer", customer)}
              >
                View
              </button>
              <button
                onClick={() =>
                  toggleCustomerStatus(customer._id, customer.is_disabled)
                }
                className="text-base font-medium text-custom-blue"
              >
                Marked As {customer.is_disabled ? "Enable" : "Disable"}
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-2xl">No Data</div>
      )}
    </DisplayTable>
  );
};

export default CustomersTable;
