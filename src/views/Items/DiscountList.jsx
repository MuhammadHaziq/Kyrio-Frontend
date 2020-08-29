import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CBadge,
  CButton,
  CCollapse,
  CDataTable,
} from "@coreui/react";
import usersData from "../users/UsersData.js";
import { get_discount_list } from "../../actions/items/discountActions";
import { useSelector, useDispatch } from "react-redux";

const DiscountList = () => {
  const discount = useSelector((state) => state.items.discountReducer);
  const dispatch = useDispatch();
  console.log("discount_list", discount);
  // const [items, setItems] = useState(usersData)

  useEffect(() => {
    dispatch(get_discount_list());
  }, []);

  const fields = [
    { key: "title", _style: { width: "40%" } },
    { key: "value", _style: { width: "40%" } },
    { key: "restricted", _style: { width: "40%" } },
    // { key: "categoryName", _style: { width: "20%" } },
    // { key: "cost", _style: { width: "20%" } },
    // {
    //   key: "price",
    //   _style: { width: "20%" },
    // },
  ];

  return (
    <CCard>
      <CCardHeader>Discount Detail </CCardHeader>

      <CCardBody>
        <CDataTable
          items={discount.discount_list}
          fields={fields}
          columnFilter
          tableFilter
          footer
          itemsPerPageSelect
          itemsPerPage={5}
          hover
          sorter
          pagination
          // loading
          // onRowClick={(item,index,col,e) => console.log(item,index,col,e)}
          // onPageChange={(val) => console.log('new page:', val)}
          // onPagesChange={(val) => console.log('new pages:', val)}
          // onPaginationChange={(val) => console.log('new pagination:', val)}
          // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
          // onSorterValueChange={(val) => console.log('new sorter value:', val)}
          // onTableFilterChange={(val) => console.log('new table filter:', val)}
          // onColumnFilterChange={(val) => console.log('new column filter:', val)}
        />
      </CCardBody>
    </CCard>
  );
};

export default DiscountList;
