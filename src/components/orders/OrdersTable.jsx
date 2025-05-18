import DisplayTable from "../global/DisplayTable";
import axiosFetch from "../../config/axios.config";

const OrdersTable = ({ orders, fetchOrders, handleOpenModal }) => {
  const tableHeader = [
    "id",
    "Date & Time",
    "Customer Name",
    "Mobile No.",
    "Shipping Address",
    "Order Value",
    "Payment Method",
    "Order Status",
    "Action",
  ];

  const handleDeleteConfirm = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return;

    try {
      await axiosFetch.delete(`/orders/${orderId}`);

      await fetchOrders();
      alert("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order", error);
      alert("Failed to delete order. Please try again.");
    }
  };

  return (
    <DisplayTable tableData={{ tableHeader }}>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-row p-2 py-4 border-b border-custom-gray-border text-base gap-2"
          >
            <div className="flex-1 break-all">{order.orderId}</div>
            <div className="flex-1">
              {new Date(order.createdAt).toDateString()}
            </div>
            <div className="flex-1">{order.customerId.name}</div>
            <div className="flex-1">{order.customerId.mobile}</div>
            <div className="flex-1 line-clamp-2">
              {Object.entries(order.delivery_location ?? {})
                .map(([key, value]) => `${key}: ${value ?? "Not available"}`)
                .join(", ")}
            </div>
            <div className="flex-1">{Math.round(order.totalAmount)}</div>
            <div className="flex-1">{order.paymentId?.paymentMode}</div>
            <div className="flex-1 break-all">{order.status}</div>
            <div className="flex  items-center gap-3 flex-1">
              <button
                className="text-base font-medium text-custom-violet inline-flex"
                onClick={() => handleOpenModal("view-order", order)}
              >
                View
              </button>
              <button
                onClick={() => handleOpenModal("edit-order", order)}
                className="text-base font-medium text-custom-blue inline-flex"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteConfirm(order._id)}
                className="text-base font-medium text-red-500 inline-flex"
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
  );
};

export default OrdersTable;
