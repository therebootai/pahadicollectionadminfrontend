import React from "react";
import DisplayTable from "../global/DisplayTable";

const CustomersTable = ({ customers, handleOpenModal }) => {
  const tableHeader = [
    "id",
    "Customer Name",
    "Sign Up Date",
    "Mobile No.",
    "Total Order Value",
    "Login Status",
    "Action",
  ];

  function calculateTotalAmount(orders) {
    return orders.reduce((total, order) => total + order.totalAmount, 0);
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
            <div className="flex  items-center gap-3 flex-1">
              <button
                className="text-base font-medium text-custom-violet"
                onClick={() => handleOpenModal("view-customer", customer)}
              >
                View
              </button>
              <button
                onClick={() => handleOpenModal("edit-customer", customer)}
                className="text-base font-medium text-custom-blue"
              >
                Edit
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
