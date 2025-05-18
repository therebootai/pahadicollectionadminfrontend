import React from "react";
import DisplayTable from "../global/DisplayTable";

const PaymentTable = ({ payments }) => {
  const tableHeader = [
    "Customer Name",
    "Payment Date",
    "Payment Mode",
    "Mobile No",
    "Amount",
    "Status",
    "Order id",
    "Action",
  ];
  return (
    <div className="flex flex-col gap-6">
      <DisplayTable tableData={{ tableHeader }}>
        {payments.length > 0 ? (
          payments.map((payment) => (
            <div
              key={payment._id}
              className="flex flex-row p-2 py-4 border-b border-custom-gray-border text-base"
            >
              <div className="flex-1">{payment.customerId?.name}</div>
              <div className="flex-1">
                {new Date(payment.createdAt).toDateString()}
              </div>
              <div className="flex-1">{payment.paymentMode}</div>

              <div className="flex-1">{payment.customerId?.mobile}</div>
              <div className="flex-1">{payment.amount}</div>
              <div className="flex-1">{payment.paymentStatus}</div>
              <div className="flex-1 break-all">
                {payment.orderId.map((order) => order.orderId)}
              </div>
              <div className="flex  items-center gap-3 flex-1">
                <button
                  className="text-base font-medium text-custom-violet"
                  // onClick={() => handleOpenModal("view-order", order)}
                >
                  View
                </button>
                <button
                  // onClick={() => handleOpenModal("edit-order", order)}
                  className="text-base font-medium text-custom-blue"
                >
                  Edit
                </button>
                <button
                  // onClick={() => handleDeleteConfirm(order._id)}
                  className="text-base font-medium text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-2xl">No Data</div>
        )}
      </DisplayTable>
    </div>
  );
};

export default PaymentTable;
