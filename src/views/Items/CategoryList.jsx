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
import { get_category_list } from "../../actions/items/categoryActions";
import { useSelector, useDispatch } from "react-redux";

const CategoryList = () => {
  const category = useSelector((state) => state.items.categoryReducer);
  const dispatch = useDispatch();
  console.log("item_list", category);
  // const [items, setItems] = useState(usersData)

  useEffect(() => {
    dispatch(get_category_list());
  }, []);

  const fields = [
    { key: "catTitle", _style: { width: "40%" } },
    // { key: "categoryName", _style: { width: "20%" } },
    // { key: "cost", _style: { width: "20%" } },
    // {
    //   key: "price",
    //   _style: { width: "20%" },
    // },
  ];

  return (
    <CCard>
      <CCardHeader>Categories Detail</CCardHeader>

      <CCardBody>
        <CDataTable
          items={category.category_list}
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

export default CategoryList;
