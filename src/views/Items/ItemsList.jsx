import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CSelect,
  CForm,
  CFormGroup,
  CFormText,
  CCardHeader,
  CCardBody,
  CBadge,
  CButton,
  CLabel,
  CCollapse,
  CDataTable,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CLink,
} from "@coreui/react";
import usersData from "../users/UsersData.js";
import { CIcon } from "@coreui/icons-react";
import { cifAU } from "@coreui/icons";
import {
  get_items_list,
  get_items_stock,
  search_item_list,
} from "../../actions/itemActions";
import { get_category_list } from "../../actions/categoryActions";
import { useSelector, useDispatch } from "react-redux";

const ItemsList = () => {
  let item = useSelector((state) => state.items.itemReducer);
  const category = useSelector((state) => state.items.categoryReducer);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const [items, setItems] = useState(usersData)
  const [search, setSearch] = useState("");
  const [storeId, setStoreId] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const [selectStock, setSelectStock] = useState(0);
  const [selectCategory, setSelectCategory] = useState(0);
  const [sendCall, setSendCall] = useState(false);
  const [pagination, setPagination] = useState(1);
  const [limit, setLimit] = useState(10);
  const [tableFilter, setTableFilter] = useState(false);
  const [collapse, setCollapse] = useState(false)

  useEffect(() => {
    setStoreId(auth.user.stores[0]._id);
  }, [auth]);
  useEffect(() => {
    dispatch(get_items_list());
    dispatch(get_category_list());
    dispatch(get_items_stock());
  }, []);

  useEffect(() => {
    const data = {
      page: pagination,
      limit: 500,
      storeId,
    };
    if (storeId !== undefined) {
      dispatch(get_items_list(data));
    }
  }, [storeId !== undefined]);

  useEffect(() => {
    const data = {
      page: pagination,
      limit: 500,
      storeId,
    };
    if (storeId !== undefined) {
      dispatch(get_items_list(data));
    }
  }, [tableFilter]);

  useEffect(() => {
    if (storeId !== undefined) {
      searchFilterRecords();
    }
  }, [sendCall]);
  const handleOnChange = (e) => {
    // setSendCall(!sendCall);
    setSearch(e.target.value);
  };
  const categoryHandleChange = (e) => {
    setSelectCategory(e.target.value);
    setSendCall(!sendCall);
  };
  const stockHandleChange = (e) => {
    setSelectStock(e.target.value);
    setSendCall(!sendCall);
  };
  const changeInPagination = (val) => {
    setPagination(val);
    setTableFilter(!tableFilter);
  };
  const changeInLimit = (val) => {
    setLimit(val);
    setTableFilter(!tableFilter);
  };
  const searchFilterRecords = () => {
    let data;
    if (selectStock == 0 && selectCategory == 0) {
      data = {
        storeId: storeId,
        search: search,
      };
    } else if (selectCategory == 0) {
      data = {
        storeId: storeId,
        stockFilter: selectStock,
        search: search,
      };
    } else if (selectStock == 0) {
      data = {
        storeId: storeId,
        categoryFilter: selectCategory,
        search: search,
      };
    } else {
      data = {
        storeId: storeId,
        stockFilter: selectStock,
        categoryFilter: selectCategory,
        search: search,
      };
    }

    dispatch(search_item_list(data));
  };

  const searchFilterOnSubmit = (e) => {
    e.preventDefault();
    let data;
    if (selectStock == 0 && selectCategory == 0) {
      data = {
        storeId: storeId,
        search: search,
      };
    } else if (selectCategory == 0) {
      data = {
        storeId: storeId,
        stockFilter: selectStock,
        search: search,
      };
    } else if (selectStock == 0) {
      data = {
        storeId: storeId,
        categoryFilter: selectCategory,
        search: search,
      };
    } else {
      data = {
        storeId: storeId,
        stockFilter: selectStock,
        categoryFilter: selectCategory,
        search: search,
      };
    }

    dispatch(search_item_list(data));
  };
  const fields = [
    { key: "name", _style: { width: "40%" } },
    { key: "name", _style: { width: "20%" } },
    { key: "cost", _style: { width: "20%" } },
    {
      key: "price",
      _style: { width: "20%" },
    },
    {
      key: "stockQty",
      _style: { width: "20%" },
      label: "Stock",
    },
  ];

  return (
    <React.Fragment>
      <CRow>
        <CCol xs="12" sm="12">
          <CCard>
            <CCardHeader> Items Filter
              <div className="card-header-actions">

                  <CLink className="card-header-action" onClick={() => setCollapse(!collapse)}>
                    <CIcon name={collapse ? 'cil-chevron-bottom':'cil-chevron-top'} />
                  </CLink>

                </div></CCardHeader>
  <CCollapse show={collapse}>
          <CCardBody>
              <CRow>
                {showSearch == false ? (
                  <React.Fragment>
                    <CCol xs="6" sm="2">
                      <CFormGroup>
                        <CSelect
                          custom
                          size="md"
                          name="selectCategory"
                          id="selectCategory"
                          value={selectCategory}
                          onChange={categoryHandleChange}
                        >
                          <option value="0">Select Category</option>
                          {category.category_list.map((item) => {
                            return (
                              <option value={item._id}>{item.catTitle}</option>
                            );
                          })}
                        </CSelect>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="6" sm="2">
                      <CFormGroup>
                        <CSelect
                          custom
                          size="md"
                          name="selectStock"
                          id="selectStock"
                          value={selectStock}
                          onChange={stockHandleChange}
                        >
                          <option value="0">Select Stock</option>
                          {item.stock_list.map((item) => {
                            return (
                              <option value={item._id}>
                                {item.stockTitle}
                              </option>
                            );
                          })}
                        </CSelect>
                      </CFormGroup>
                    </CCol>
                    <CIcon
                      name="cilPencil"
                      onClick={() => setShowSearch(!showSearch)}
                      style={{ marginTop: "10px" }}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <CCol xs="12" sm="12">
                      <CForm onSubmit={searchFilterOnSubmit} method="post">
                        <CFormGroup>
                          <div className="controls">
                            <CInputGroup className="input-prepend">
                              <CInput
                                id="prependedInput"
                                size="50"
                                type="text"
                                name="search"
                                onChange={handleOnChange}
                              />
                              <CInputGroupPrepend
                                onClick={() => setShowSearch(!showSearch)}
                              >
                                <CInputGroupText>X</CInputGroupText>
                              </CInputGroupPrepend>
                            </CInputGroup>
                          </div>
                        </CFormGroup>
                      </CForm>
                    </CCol>
                  </React.Fragment>
                )}
              </CRow>
            </CCardBody>
            </CCollapse>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" sm="12">
          <CCard>
            <CCardHeader>Items Detail</CCardHeader>

            <CCardBody>
              <CDataTable
                items={item.item_list}
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
                onPageChange={(val) =>
                  // changeInPagination(val)
                  console.log("new page:", val)
                }
                onPagesChange={(val) => console.log("new pages:", val)}
                onPaginationChange={(val) =>
                  // changeInLimit(val)
                  console.log("new pagination:", val)
                }
                // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
                // onSorterValueChange={(val) => console.log('new sorter value:', val)}
                // onTableFilterChange={(val) => console.log('new table filter:', val)}
                // onColumnFilterChange={(val) => console.log('new column filter:', val)}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default ItemsList;
