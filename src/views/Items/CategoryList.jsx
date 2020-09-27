import React, { useState, useEffect } from "react";
import { CCard, CCardHeader } from "@coreui/react";
import { get_category_list } from "../../actions/items/categoryActions";
import { useSelector, useDispatch } from "react-redux";
import CategoryDatatable from "../../datatables/category/CategoryDatatable";
const CategoryList = (props) => {
  const category = useSelector((state) => state.items.categoryReducer);
  const dispatch = useDispatch();
  console.log("item_list", category);
  // const [items, setItems] = useState(usersData)

  useEffect(() => {
    dispatch(get_category_list());
  }, [dispatch]);

  return (
    <CCard>
      <CCardHeader>Categories Detail</CCardHeader>
      <CategoryDatatable categories={category.category_list} {...props} />
    </CCard>
  );
};

export default CategoryList;
