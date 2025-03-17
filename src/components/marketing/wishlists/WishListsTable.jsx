import React from "react";
import DisplayTable from "../../global/DisplayTable";

const WishListsTable = ({ wishLists, loading }) => {
  const tableHeader = ["Customer Name", "Mobile No.", "Product", "Action"];
  return (
    <DisplayTable tableData={{ tableHeader }}>
      {wishLists && wishLists.length > 0 ? (
        wishLists.map((wishlist) => (
          <div
            key={wishlist._id}
            className="flex flex-row p-2 border-b border-custom-gray-border text-base"
          >
            <div className="flex-1">{wishlist.customer?.name}</div>
            <div className="flex-1">{wishlist.customer?.mobile}</div>
            <div className="flex-1 truncate">{wishlist.title}</div>
            <div className="flex  items-center gap-3 flex-1">
              <button className="text-base font-medium text-custom-violet">
                View
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

export default WishListsTable;
