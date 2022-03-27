import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CSelect,
  CForm,
  CFormGroup,
  CCardHeader,
  CCardBody,
  CCollapse,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CLink,
  CButton,
  CFade,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ItemsListDatatable from "../../datatables/items/ItemsListDatatable.jsx";
import ItemListServerSideDatatable from "../../datatables/items/ItemListServerSideDatatable"
import {
  // get_items_list,
  // get_items_stock,
  search_item_list,
  get_items_store,
  delete_item_list,
  redirect_back_items,
  remove_row_data,
  get_item_taxe,
} from "../../actions/items/itemActions";
import { get_category_list } from "../../actions/items/categoryActions";
import ConformationAlert from "../../components/conformationAlert/ConformationAlert";
import AddItem from "../../components/items/itemList/AddItem";
import ImportItem from "../../components/items/itemList/ImportItem";
import ImportItemCsv from "../../components/items/itemList/ImportItemCsv";
import UpdateItem from "../../components/items/itemList/UpdateItem";
import { get_modifires_list } from "../../actions/items/modifiresActions";
import { useSelector, useDispatch } from "react-redux";
import { get_stores } from "../../actions/settings/storeActions";
import { CSVLink } from "react-csv";
import PlusIcon from "../../components/icons/PlusIcon.js";
import ItemSplash from "../../components/splashScreen/ItemSplash.jsx";
import SearchIcon from "../../components/icons/SearchIcon.js";
const ItemsList = () => {
  let item = useSelector((state) => state.items.itemReducer);
  const category = useSelector((state) => state.items.categoryReducer);
  const auth = useSelector((state) => state.auth);
  const modifire = useSelector((state) => state.items.modifiresReducer);
  const store = useSelector((state) => state.settingReducers.storeReducer);

  const dispatch = useDispatch();
  // const [items, setItems] = useState(usersData)
  const [search, setSearch] = useState("");
  const [storeId, setStoreId] = useState("0");
  const [defaultStoreId, setDefaultStoreId] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const [selectStock, setSelectStock] = useState("0");
  const [selectCategory, setSelectCategory] = useState("-1");
  const [sendCall, setSendCall] = useState(false);
  const [pagination, setPagination] = useState(1);
  const [collapse, setCollapse] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [fadeItem, setFadeItem] = useState(true);
  const [fadeUpdateItem, setUpdateItem] = useState(false);
  const [fadeAddItem, setFadeAddItem] = useState(false);
  const [importItem, setUpdateImport] = useState(false);
  const [timeout] = useState(300);

  // useEffect(() => {
  //   setDefaultStoreId(auth.user.stores[0]._id);
  //   setStoreId(auth.user.stores[0]._id);
  // }, [auth]);
  useEffect(() => {
    // dispatch(get_items_list());
    dispatch(get_category_list());
    // dispatch(get_items_stock());
    dispatch(get_items_store());
    dispatch(get_item_taxe());
    dispatch(get_stores());
    if (auth.user.stores.length > 0 && auth.user.stores !== undefined) {
      dispatch(get_modifires_list(auth.user.stores[0]._id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (item.redirect_update !== undefined && item.redirect_update === true) {
      setFadeItem(false);
      setFadeAddItem(false);
      setUpdateItem(true);
      setUpdateImport(false);
    }
  }, [item.redirect_update]);

  useEffect(() => {
    // if (defaultStoreId !== undefined) {
      searchFilterRecords();
      // dispatch(get_items_list(data));
    // }
  }, []);

  const getItemsOnImport = () => {
    const data = {
      page: pagination,
      limit: 500,
      storeId: defaultStoreId,
    };
    if (defaultStoreId !== undefined) {
      // dispatch(get_items_list(data));
    }
  };

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
  const storeHandleChange = (e) => {
    setStoreId(e.target.value);
    setSendCall(!sendCall);
  };

  const searchFilterRecords = () => {
    let data = {
      storeId: storeId ? storeId : "0",
      stockFilter: selectStock ? selectStock : "0",
      categoryFilter: selectCategory ? selectCategory : "0",
      search: search ? search : "",
      page: 1,
      columnFilterValue: JSON.stringify(''),
      tableFilterValue: "",
      sorterValue: JSON.stringify(''),
      itemsPerPage: 5
    };
    dispatch(search_item_list(data));
  };

  const searchFilterOnSubmit = (e) => {
    e.preventDefault();
    let data = {
      storeId: storeId ? storeId : "0",
      stockFilter: selectStock ? selectStock : "0",
      categoryFilter: selectCategory ? selectCategory : "0",
      search: search ? search : "",
      page: 1,
      columnFilterValue: JSON.stringify(''),
      tableFilterValue: "",
      sorterValue: JSON.stringify(''),
      itemsPerPage: 5
    };

    dispatch(search_item_list(data));
  };

  const deleteItem = () => {
    const item_id = item.item_list
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    dispatch(delete_item_list(item_id));
    setShowAlert(!showAlert);
  };

  const addItem = () => {
    setFadeItem(false);
    setFadeAddItem(true);
    setUpdateItem(false);
    setUpdateImport(false);
    dispatch(redirect_back_items(false));
  };
  const importList = () => {
    setFadeItem(false);
    setFadeAddItem(false);
    setUpdateItem(false);
    setUpdateImport(true);
    dispatch(redirect_back_items(false));
  };
  const goBack = () => {
    setFadeItem(true);
    setFadeAddItem(false);
    setUpdateItem(false);
    setUpdateImport(false);
    dispatch(redirect_back_items(true));
    if (search !== "") {
      closeSearch();
    }
    dispatch(remove_row_data());
  };
  const closeSearch = () => {
    setShowSearch(!showSearch);
    setSearch("");
    const data = {
      storeId: "0",
      stockFilter: "0",
      categoryFilter: "0",
      search: "",
    };

    dispatch(search_item_list(data));
  };
  const filters = {
    storeId: storeId,
    stockFilter: selectStock,
    categoryFilter: selectCategory,
    search: search
  }
  return (
    <React.Fragment>
      <div className="animated fadeIn">
        {fadeUpdateItem ? (
          <CFade timeout={timeout} in={fadeUpdateItem}>
            <UpdateItem
              goBack={goBack}
              store={item.store_list}
              item_row_data={item.item_row_data}
              key={"addItem" + 0}
            />
          </CFade>
        ) : (
          ""
        )}
        {fadeAddItem ? (
          <CFade timeout={timeout} in={fadeAddItem}>
            <AddItem goBack={goBack} store={item.store_list} key={"addItem" + 1} />
          </CFade>
        ) : (
          ""
        )}
        {importItem ? (
          <CFade timeout={timeout} in={importItem}>
            <ImportItemCsv
              goBack={goBack}
              getItemsOnImport={getItemsOnImport}
            />
          </CFade>
        ) : (
          ""
        )}
        {fadeItem ? (
          <React.Fragment>
            <CCard>
              {/* {item?.item_list?.length !== 0 && ( */}
              <CCardHeader>
                <CRow>
                  <CCol xs="12" sm="5" md="5" xl="xl" className="mb-3 mb-xl-0">
                    <CButton
                      color="success"
                      className="btn-square"
                      onClick={addItem}
                    >
                      <PlusIcon />
                      ADD ITEM
                    </CButton>
                    {item.item_list.filter((item) => item.isDeleted === true)
                      .length > 0 ? (
                      <React.Fragment>
                        <ConformationAlert
                          button_text="Delete"
                          heading="Delete item"
                          section={`Are you sure you want to delete (${item.item_list.length}) items  ?`}
                          buttonAction={deleteItem}
                          show_alert={showAlert}
                          hideAlert={setShowAlert}
                          variant="outline"
                          className="ml-2 btn-square"
                          color="danger"
                          block={false}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {/* <CButton
                          color="secondary"
                          className="ml-2 btn-square"
                          onClick={importList}
                        >
                          <b>IMPORT</b>
                        </CButton>
                        <CSVLink
                          color="secondary"
                          data={csvDownloadData}
                          headers={headers}
                          filename={"export_items.csv"}
                          className="ml-2 btn-square"
                          style={{ color: "#3c4b64", textDecoration: "none" }}
                        >
                          <b>EXPORT</b>
                        </CSVLink> */}
                      </React.Fragment>
                    )}
                  </CCol>
                  {showSearch === false ? (
                    <React.Fragment>
                      {item.store_list.length > 1 ? (
                        <React.Fragment>
                          <CCol xs="12" sm="2" md="2" xl="xl">
                            <CFormGroup>
                              <CSelect
                                size="md"
                                name="storeId"
                                id="storeId"
                                value={storeId}
                                onChange={storeHandleChange}
                              >
                                <option value="0">All Store</option>
                                {item.store_list.map((item) => {
                                  return (
                                    <option value={item.store._id} key={item.store._id}>
                                      {item.store.title}
                                    </option>
                                  );
                                })}
                              </CSelect>
                            </CFormGroup>
                          </CCol>
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                      <CCol xs="12" sm="2" md="2" xl="xl">
                        <CFormGroup>
                          <CSelect
                            size="md"
                            name="selectCategory"
                            id="selectCategory"
                            value={selectCategory}
                            onChange={categoryHandleChange}
                          >
                            <option value="-1">All Category</option>
                            <option value="0">No Category</option>
                            {category.category_list.map((item) => {
                              return (
                                <option value={item._id} key={item._id}>
                                  {item.title}
                                </option>
                              );
                            })}
                          </CSelect>
                        </CFormGroup>
                      </CCol>

                      <CCol xs="12" sm="2" md="2" xl="xl">
                        <CFormGroup>
                          <CSelect
                            size="md"
                            name="selectStock"
                            id="selectStock"
                            value={selectStock}
                            onChange={stockHandleChange}
                          >
                            <option value="0">All Stock</option>
                            {item.stock_list.map((item) => {
                              return (
                                <option value={item._id} key={item._id}>
                                  {item.stockTitle}
                                </option>
                              );
                            })}
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="1" md="1" xl="xl">
                        <SearchIcon setShowSearch={setShowSearch} showSearch={showSearch} style={{ marginTop: "10px", cursor: "pointer" }} />
                      </CCol>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <CCol xs="12" sm="12" md="7">
                        <CForm onSubmit={searchFilterOnSubmit} method="post">
                          <CFormGroup>
                            <div className="controls">
                              <CInputGroup className="input-prepend">
                                <CInput
                                  id="prependedInput"
                                  size="50"
                                  type="text"
                                  name="search"
                                  placeholder="Search"
                                  onChange={handleOnChange}
                                />
                                <CInputGroupPrepend onClick={closeSearch}>
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
              </CCardHeader>
              {/* )} */}

              <CCardBody>
                {/* {item?.item_list?.length === 0 ? (<ItemSplash buttonName="ADD ITEM" onClick={addItem} description={"Here you can manage your items."} descriptionLink={""} title="Items" secondButton="IMPORT ITEMS" secondClick={importList} />) : ( */}
                <ItemListServerSideDatatable filters={filters} itemList={item.item_list} item_pages={item.item_pages} />
                 {/* )} */}
              </CCardBody>
            </CCard>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default ItemsList;
//
