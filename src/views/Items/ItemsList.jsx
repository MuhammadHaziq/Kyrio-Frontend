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
import { CIcon } from "@coreui/icons-react";
import ItemsListDatatable from "../../datatables/items/ItemsListDatatable.jsx";
import {
  get_items_list,
  get_items_stock,
  search_item_list,
  get_items_store,
  delete_item_list,
  redirect_back_items,
  remove_row_data,
} from "../../actions/items/itemActions";
import { get_category_list } from "../../actions/items/categoryActions";
import ConformationAlert from "../../components/conformationAlert/ConformationAlert";
import AddItem from "../../components/items/itemList/AddItem";
import ImportItem from "../../components/items/itemList/ImportItem";
import UpdateItem from "../../components/items/itemList/UpdateItem";
import { get_modifires_list } from "../../actions/items/modifiresActions";
import { useSelector, useDispatch } from "react-redux";
import { get_stores } from "../../actions/settings/storeActions";
import { CSVLink } from "react-csv";

const ItemsList = () => {
  let item = useSelector((state) => state.items.itemReducer);
  const category = useSelector((state) => state.items.categoryReducer);
  const auth = useSelector((state) => state.auth);
  const modifire = useSelector((state) => state.items.modifiresReducer);
  const store = useSelector((state) => state.settingReducers.storeReducer);

  const dispatch = useDispatch();
  // const [items, setItems] = useState(usersData)
  const [search, setSearch] = useState("");
  const [storeId, setStoreId] = useState();
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
  let csvStores = [];
  store.stores_list.map((item) => {
    return csvStores.push(
      {
        label: `Available for sale [${item.title}]`,
        key: `available_for_sale${item.title}`,
      },
      { label: `Price [${item.title}]`, key: `price${item.title}` },
      { label: `In stock [${item.title}]`, key: `in_stock${item.title}` },
      { label: `Low stock [${item.title}]`, key: `low_stock${item.title}` }
    );
  });
  let modifierCsv = [];
  modifire.modifiers_list.map((item) => {
    return modifierCsv.push({
      label: `Modifier-${item.title}`,
      key: `modifier${item.title}`,
    });
  });
  const headers = [
    { label: "Handle", key: "handle" },
    { label: "SKU", key: "sku" },
    { label: "Name", key: "name" },
    { label: "Category", key: "category" },
    { label: "Sold by weight", key: "sold_by_weight" },
    { label: "Option 1 name", key: "varient_1_name" },
    { label: "Option 1 value", key: "varient_1_value" },
    { label: "Option 2 name", key: "varient_2_name" },
    { label: "Option 2 value", key: "varient_2_value" },
    { label: "Option 3 name", key: "varient_3_name" },
    { label: "Option 3 value", key: "varient_3_value" },
    { label: "Default price", key: "price" },
    { label: "Cost", key: "cost" },
    { label: "Barcode", key: "barcode" },
    { label: "SKU of included item", key: "sku_of_included_item" },
    { label: "Quantity of included item", key: "quantity_of_included_item" },
    { label: "Track stock", key: "track_stock" },
    ...csvStores,
    ...modifierCsv,
  ];
  /* Export Csv Data*/
  let csvDownloadData = [];
  var maxLength = 0;
  var arrayIndex = 0;
  item.item_list.map((item, index) => {
    let varient = [];
    var selectedStores = [];
    var lengthOptionOne =
      item.varients !== null && item.varients !== undefined
        ? item.varients[0] !== undefined
          ? item.varients[0]["optionValue"] !== undefined
            ? item.varients[0]["optionValue"].length
            : 0
          : 0
        : 0;
    var lengthOptionTwo =
      item.varients !== null && item.varients !== undefined
        ? item.varients[1] !== undefined
          ? item.varients[1]["optionValue"] !== undefined
            ? item.varients[1]["optionValue"].length
            : 0
          : 0
        : 0;
    var lengthOptionThree =
      item.varients !== null && item.varients !== undefined
        ? item.varients[2] !== undefined
          ? item.varients[2]["optionValue"] !== undefined
            ? item.varients[2]["optionValue"].length
            : 0
          : 0
        : 0;

    var maxValue = Math.max(
      lengthOptionOne,
      lengthOptionTwo,
      lengthOptionThree
    );
    maxLength = Math.max(maxLength, maxValue);
    csvDownloadData.push({
      handle:
        item.name !== null && item.name !== undefined
          ? item.name.trim().replace(/\s+/g, "-").toLowerCase()
          : "",
      name:
        item.name !== null && item.name !== undefined ? item.name.trim() : "",
      category:
        item.category !== null && item.category !== undefined
          ? item.category["name"]
          : "",
      sold_by_weight: item.soldByType == "Weight/Volume" ? "Y" : "N",
      sku: item.sku !== null && item.sku !== undefined ? item.sku : "",
      varient_1_name:
        item.varients !== null && item.varients !== undefined
          ? item.varients[0] !== null && item.varients[0] !== undefined
            ? item.varients[0]["optionName"]
            : ""
          : "",
      varient_1_value:
        item.varients !== null && item.varients !== undefined
          ? item.varients[0] !== null && item.varients[0] !== undefined
            ? item.varients[0]["optionValue"] !== undefined
              ? item.varients[0]["optionValue"][0]["variantName"]
              : ""
            : ""
          : "",
      varient_2_name:
        item.varients !== null && item.varients !== undefined
          ? item.varients[1] !== null && item.varients[1] !== undefined
            ? item.varients[1]["optionName"]
            : ""
          : "",
      varient_2_value:
        item.varients !== null && item.varients !== undefined
          ? item.varients[1] !== null && item.varients[1] !== undefined
            ? item.varients[1]["optionValue"] !== undefined
              ? item.varients[1]["optionValue"][0]["variantName"]
              : ""
            : ""
          : "",
      varient_3_name:
        item.varients !== null && item.varients !== undefined
          ? item.varients[2] !== null && item.varients[2] !== undefined
            ? item.varients[2]["optionName"]
            : ""
          : "",
      varient_3_value:
        item.varients !== null && item.varients !== undefined
          ? item.varients[2] !== null && item.varients[2] !== undefined
            ? item.varients[2]["optionValue"] !== undefined
              ? item.varients[2]["optionValue"][0]["variantName"]
              : ""
            : ""
          : "",
      price:
        item.varients !== null && item.varients !== undefined
          ? item.varients[0] !== null && item.varients[0] !== undefined
            ? item.varients[0]["optionValue"] !== undefined
              ? item.varients[0]["optionValue"][0]["price"]
              : ""
            : ""
          : item.price,
      cost:
        item.varients !== null && item.varients !== undefined
          ? item.varients[0] !== null && item.varients[0] !== undefined
            ? item.varients[0]["optionValue"] !== undefined
              ? item.varients[0]["optionValue"][0]["cost"]
              : ""
            : ""
          : item.cost,
      barcode:
        item.varients !== null && item.varients !== undefined
          ? item.varients[0] !== null && item.varients[0] !== undefined
            ? item.varients[0]["optionValue"] !== undefined
              ? item.varients[0]["optionValue"][0]["barcode"]
              : ""
            : ""
          : item.barcode,
      sku_of_included_item: "",
      quantity_of_included_item: "",
      track_stock: item.trackStock == true ? "Y" : "N",
    });
    var exportStores =
      item.stores !== null && item.stores !== undefined
        ? (item.stores || []).map((stor) => {
            (store.stores_list || []).map((stoor, storIndex) => {
              if (stoor._id == stor.id) {
                csvDownloadData = csvDownloadData.map((it, ky) => {
                  if (arrayIndex == ky) {
                    return {
                      ...it,
                      [`available_for_sale${stor.title}`]: "Y",
                      [`in_stock${stor.title}`]: stor.inStock,
                      [`low_stock${stor.title}`]: stor.lowStock,
                    };
                  }
                  return it;
                });
              } else {
                csvDownloadData = csvDownloadData.map((it, ky) => {
                  if (arrayIndex == ky) {
                    return {
                      ...it,
                      [`available_for_sale${stor.title}`]: "N",
                      [`in_stock${stor.title}`]: stor.inStock,
                      [`low_stock${stor.title}`]: stor.lowStock,
                    };
                  }
                  return it;
                });
              }
            });
          })
        : [];
    var exportModifier = (modifire.modifiers_list || []).map(
      (modi, modIndex) => {
        (item.modifiers || []).map((itModi, itModIndex) => {
          if (itModi.id == modi._id) {
            csvDownloadData = csvDownloadData.map((it, ky) => {
              if (arrayIndex == ky) {
                return {
                  ...it,
                  [`modifier${modi.title}`]: "Y",
                };
              }
              return it;
            });
          } else {
            csvDownloadData = csvDownloadData.map((it, ky) => {
              if (arrayIndex == ky) {
                return {
                  ...it,
                  [`modifier${modi.title}`]: "N",
                };
              }
              return it;
            });
          }
        });
      }
    );
    if (item.varients !== null && item.varients !== undefined) {
      for (var j = 1; j < maxLength; j++) {
        csvDownloadData.push({
          handle: item.name.trim().replace(/\s+/g, "-").toLowerCase(),
          sku:
            item.varients[0] !== null && item.varients[0] !== undefined
              ? item.varients[0]["optionValue"] !== undefined
                ? item.varients[0]["optionValue"][j] !== undefined
                  ? item.varients[0]["optionValue"][j]["sku"] !== undefined
                    ? item.varients[0]["optionValue"][j]["sku"]
                    : ""
                  : ""
                : ""
              : "",
          varient_1_value:
            item.varients[0] !== null && item.varients[0] !== undefined
              ? item.varients[0]["optionValue"] !== undefined
                ? item.varients[0]["optionValue"][j] !== undefined
                  ? item.varients[0]["optionValue"][j]["variantName"] !==
                    undefined
                    ? item.varients[0]["optionValue"][j]["variantName"]
                    : ""
                  : ""
                : ""
              : "",
          varient_2_value:
            item.varients[1] !== null && item.varients[1] !== undefined
              ? item.varients[1]["optionValue"] !== undefined
                ? item.varients[1]["optionValue"][j] !== undefined
                  ? item.varients[1]["optionValue"][j]["variantName"] !==
                    undefined
                    ? item.varients[1]["optionValue"][j]["variantName"]
                    : ""
                  : ""
                : ""
              : "",
          varient_3_value:
            item.varients[2] !== null && item.varients[2] !== undefined
              ? item.varients[2]["optionValue"] !== undefined
                ? item.varients[2]["optionValue"][j] !== undefined
                  ? item.varients[2]["optionValue"][j] !== undefined
                    ? item.varients[2]["optionValue"][j]["variantName"] !==
                      undefined
                      ? item.varients[2]["optionValue"][j]["variantName"]
                      : ""
                    : ""
                  : ""
                : ""
              : "",
          price:
            item.varients[0] !== null && item.varients[0] !== undefined
              ? item.varients[0]["optionValue"] !== undefined
                ? item.varients[0]["optionValue"][j] !== undefined
                  ? item.varients[0]["optionValue"][j]["price"] !== undefined
                    ? item.varients[0]["optionValue"][j]["price"]
                    : ""
                  : ""
                : ""
              : "",
          cost:
            item.varients[0] !== null && item.varients[0] !== undefined
              ? item.varients[0]["optionValue"] !== undefined
                ? item.varients[0]["optionValue"][j] !== undefined
                  ? item.varients[0]["optionValue"][j]["cost"] !== undefined
                    ? item.varients[0]["optionValue"][j]["cost"]
                    : ""
                  : ""
                : ""
              : "",
          barcode:
            item.varients[0] !== null && item.varients[0] !== undefined
              ? item.varients[0]["optionValue"] !== undefined
                ? item.varients[0]["optionValue"][j] !== undefined
                  ? item.varients[0]["optionValue"][j]["barcode"] !== undefined
                    ? item.varients[0]["optionValue"][j]["barcode"]
                    : ""
                  : ""
                : ""
              : "",
        });
        arrayIndex++;
      }
    }
    arrayIndex = arrayIndex + 1;

    return csvDownloadData;
  });
  /* End Export Csv Data*/
  useEffect(() => {
    setDefaultStoreId(auth.user.stores[0]._id);
    setStoreId(auth.user.stores[0]._id);
  }, [auth]);
  useEffect(() => {
    // dispatch(get_items_list());
    dispatch(get_category_list());
    dispatch(get_items_stock());
    dispatch(get_items_store());
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
    const data = {
      page: pagination,
      limit: 500,
      storeId: defaultStoreId,
    };
    if (defaultStoreId !== undefined) {
      dispatch(get_items_list(data));
    }
  }, [dispatch, defaultStoreId, pagination]);

  const getItemsOnImport = () => {
    const data = {
      page: pagination,
      limit: 500,
      storeId: defaultStoreId,
    };
    if (defaultStoreId !== undefined) {
      dispatch(get_items_list(data));
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
    let data;
    data = {
      storeId: storeId,
      stockFilter: selectStock,
      categoryFilter: selectCategory,
      search: search,
    };
    dispatch(search_item_list(data));
  };

  const searchFilterOnSubmit = (e) => {
    e.preventDefault();
    let data;
    data = {
      storeId: storeId,
      stockFilter: selectStock,
      categoryFilter: selectCategory,
      search: search,
    };

    dispatch(search_item_list(data));
  };

  const deleteItem = () => {
    const item_id = item.item_list
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    dispatch(delete_item_list(JSON.stringify(item_id)));
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
      storeId: storeId,
      stockFilter: selectStock,
      categoryFilter: selectCategory,
      search: "",
    };

    dispatch(search_item_list(data));
  };

  return (
    <React.Fragment>
      <div className="animated fadeIn">
        {fadeUpdateItem ? (
          <CFade timeout={timeout} in={fadeUpdateItem}>
            <UpdateItem
              goBack={goBack}
              store={item.store_list}
              item_row_data={item.item_row_data}
            />
          </CFade>
        ) : (
          ""
        )}
        {fadeAddItem ? (
          <CFade timeout={timeout} in={fadeAddItem}>
            <AddItem goBack={goBack} store={item.store_list} />
          </CFade>
        ) : (
          ""
        )}
        {importItem ? (
          <CFade timeout={timeout} in={importItem}>
            <ImportItem goBack={goBack} getItemsOnImport={getItemsOnImport} />
          </CFade>
        ) : (
          ""
        )}
        {fadeItem ? (
          <React.Fragment>
            {/* <CRow>
              <CCol xs="12" sm="12">
                <CCard>
                  <CCardHeader>
                    {" "}
                    Items Filter
                    <div className="card-header-actions">
                      <CLink
                        className="card-header-action"
                        onClick={() => setCollapse(!collapse)}
                      >
                        <CIcon
                          name={
                            collapse ? "cil-chevron-bottom" : "cil-chevron-top"
                          }
                        />
                      </CLink>
                    </div>
                  </CCardHeader>

                  <CCollapse show={collapse}>
                    <CCardBody>
                      <CRow>
                        <CCol
                          xs="12"
                          sm="4"
                          md="4"
                          xl="xl"
                          className="mb-3 mb-xl-0"
                        >
                          <CButton
                            color="success"
                            className="btn-square"
                            onClick={addItem}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="c-icon c-icon-sm"
                              role="img"
                            >
                              <polygon
                                fill="var(--ci-primary-color, currentColor)"
                                points="440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240"
                                className="ci-primary"
                              ></polygon>
                            </svg>
                            ADD ITEM
                          </CButton>
                          {item.item_list.filter(
                            (item) => item.isDeleted === true
                          ).length > 0 ? (
                            <React.Fragment>
                              <ConformationAlert
                                button_text="Delete"
                                heading="Delete item"
                                section={`Are you sure you want to delete the item (${item.item_list
                                  .filter((item) => {
                                    return item.isDeleted === true;
                                  })
                                  .map((item) => {
                                    return item.name;
                                  })
                                  .join(",")}) ?`}
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
                              <CButton
                                color="default"
                                className="ml-2 btn-square"
                                variant="outline"
                                onClick={importList}
                              >
                                Import
                              </CButton>
                              <CSVLink
                                color="default"
                                data={csvDownloadData}
                                headers={headers}
                                filename={"export_items.csv"}
                                className="ml-2 btn-square"
                                style={{ color: "#3c4b64" }}
                              >
                                Export
                              </CSVLink>
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
                                      custom
                                      size="md"
                                      name="storeId"
                                      id="storeId"
                                      value={storeId}
                                      onChange={storeHandleChange}
                                    >
                                      <option value="0">All Store</option>
                                      {item.store_list.map((item) => {
                                        return (
                                          <option value={item.id} key={item.id}>
                                            {item.title}
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
                                  custom
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
                                        {item.catTitle}
                                      </option>
                                    );
                                  })}
                                </CSelect>
                              </CFormGroup>
                            </CCol>

                            <CCol xs="12" sm="2" md="2" xl="xl">
                              <CFormGroup>
                                <CSelect
                                  custom
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

                            <svg
                              viewBox="0 0 20 20"
                              className="c-icon c-icon-lg"
                              role="img"
                              style={{ marginTop: "10px", cursor: "pointer" }}
                              onClick={() => setShowSearch(!showSearch)}
                            >
                              <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                            </svg>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <CCol xs="12" sm="12" md="8">
                              <CForm
                                onSubmit={searchFilterOnSubmit}
                                method="post"
                              >
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
                    </CCardBody>
                  </CCollapse>
                </CCard>
              </CCol>
            </CRow>*/}
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol xs="12" sm="5" md="5" xl="xl" className="mb-3 mb-xl-0">
                    <CButton
                      color="success"
                      className="btn-square"
                      onClick={addItem}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="c-icon c-icon-sm"
                        role="img"
                      >
                        <polygon
                          fill="var(--ci-primary-color, currentColor)"
                          points="440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240"
                          className="ci-primary"
                        ></polygon>
                      </svg>
                      ADD ITEM
                    </CButton>
                    {item.item_list.filter((item) => item.isDeleted === true)
                      .length > 0 ? (
                      /*section={`Are you sure you want to delete the item (${item.item_list
                          .filter((item) => {
                            return item.isDeleted === true;
                          })
                          .map((item) => {
                            return item.name;
                          })
                          .join(",")}) ?`}*/
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
                        <CButton
                          color="default"
                          className="ml-2 btn-square"
                          variant="outline"
                          onClick={importList}
                        >
                          <b>Import</b>
                        </CButton>
                        <CSVLink
                          color="default"
                          data={csvDownloadData}
                          headers={headers}
                          filename={"export_items.csv"}
                          className="ml-2 btn-square"
                          variant="outline"
                          style={{ color: "#3c4b64", textDecoration: "none" }}
                        >
                          <b>Export</b>
                        </CSVLink>
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
                                custom
                                size="md"
                                name="storeId"
                                id="storeId"
                                value={storeId}
                                onChange={storeHandleChange}
                              >
                                <option value="0">All Store</option>
                                {item.store_list.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.title}
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
                            custom
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
                                  {item.catTitle}
                                </option>
                              );
                            })}
                          </CSelect>
                        </CFormGroup>
                      </CCol>

                      <CCol xs="12" sm="2" md="2" xl="xl">
                        <CFormGroup>
                          <CSelect
                            custom
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
                        <svg
                          viewBox="0 0 20 20"
                          className="c-icon c-icon-lg"
                          role="img"
                          style={{ marginTop: "10px", cursor: "pointer" }}
                          onClick={() => setShowSearch(!showSearch)}
                        >
                          <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                        </svg>
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
              <CCardBody>
                <ItemsListDatatable itemList={item.item_list} />
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
