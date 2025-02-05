import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CInputGroup,
  CInvalidFeedback,
  CInputRadio,
  CListGroup,
  CListGroupItem,
  CSwitch,
  CImg,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import StoresDatatable from "./StoresDatatable";
import ConformationAlert from "../../conformationAlert/ConformationAlert";
// import AddItemVariant from "./AddItemVariant";
// import VariantDatatable from "./VariantDatatable";
import NumberFormat from "react-number-format";
import { ImageUrl } from "../../../constants/baseUrls";
import {
  update_item_record,
  toggle_item_stock,
  delete_item_list,
  // remove_row_data,
} from "../../../actions/items/itemActions";
const AddItem = (props) => {
  const decimal = useSelector((state) => state.auth.user.decimal);

  const [fields, setFields] = useState({
    item_name: "",
    categoryId: "0",
    sold_by: "Each",
    price: "",
    cost: 0.0,
    sku: "",
    autoSKU: false,
    item_barcode: "",
    represent_type: "Color_and_shape",
    image: "",
    color: "#E0E0E0",
    availableForSale: false,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [ImageName, setImageName] = useState("");
  const [itemImage, setItemImage] = useState(null);
  const [inventorySwitch, setInventorySwitch] = useState([false, false]);
  const [modifierSwitch, setModifierSwitch] = useState([]);
  const [receiptFile, setrReceiptFile] = useState("");
  const [variantModal, setVariantModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [modifiers, setModifiers] = useState([]);
  const [itemTax, setItemTax] = useState([]);
  const [taxesSwitch, setTaxesSwitch] = useState([]);

  const [errors, setErrors] = useState({
    item_name: false,
  });
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const modifire = useSelector((state) => state.items.modifiresReducer);
  const category = useSelector((state) => state.items.categoryReducer);
  const item = useSelector((state) => state.items.itemReducer);
  const account = useSelector((state) => state.auth.user.account);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      item.redirect_itemList !== undefined &&
      item.redirect_itemList === true
    ) {
      props.goBack();
    }
  }, [item.redirect_itemList]);
  useEffect(() => {
    if (
      item.item_taxes !== undefined &&
      item.item_taxes !== null &&
      item.item_taxes.length > 0
    ) {
      setItemTax(
        (item.item_taxes || []).map((item) => {
          return {
            ...item,
            isSelected: false,
          };
        })
      );
      const taxesSwitch = [];
      (item.item_taxes || []).map((item) => taxesSwitch.push(true));
      setTaxesSwitch(taxesSwitch);
    }
  }, [item.item_taxes]);
  useEffect(() => {
    let modifierSwitch = [];
    (modifire.modifiers_list || []).map((item) => modifierSwitch.push(false));
    setModifierSwitch(modifierSwitch);
    setModifiers(modifire.modifiers_list);
  }, [modifire.modifiers_list]);

  useEffect(() => {
    if (props.item_row_data !== undefined && props.item_row_data !== null) {
      // console.log(props.item_row_data);
      let setTaxes = [];
      (item.item_taxes || []).map((str, index) => {
        let taxExist = (props.item_row_data.taxes || []).filter(
          (item) => item._id === str._id
        );
        if (
          taxExist !== undefined &&
          taxExist !== null &&
          taxExist.length > 0
        ) {
          taxExist = taxExist.map((item) => {
            return {
              ...item,
              isSelected: true,
            };
          });
          setTaxes.push(...taxExist);
        } else {
          str = { ...str, isSelected: false };
          setTaxes.push(str);
        }
      });
      setItemTax(setTaxes);
      const taxesSwitch = [];
      (setTaxes || []).map((item) => {
        taxesSwitch.push(
          item.isSelected !== undefined ? item.isSelected : false
        );
      });
      setTaxesSwitch(taxesSwitch);
      setFields({
        ...fields,
        item_name: props.item_row_data.title,
        categoryId:
          props.item_row_data.category !== undefined &&
          props.item_row_data.category !== null
            ? props.item_row_data.category._id
            : "0",
        sold_by: props.item_row_data.soldByType,
        price: props.item_row_data.price,
        cost: props.item_row_data.cost,
        represent_type: props.item_row_data.repoOnPos,
        color: props.item_row_data.color,
        sku: props.item_row_data.sku || "",
        autoSKU: props.item_row_data.autoSKU || false,
        image: props.item_row_data.image || false,
        item_barcode: props.item_row_data.barcode || "",
        availableForSale: props.item_row_data.availableForSale,
      });
      setImageName(props.item_row_data.image);
      setItemImage(
        props.item_row_data.image !== undefined &&
          props.item_row_data.image !== null &&
          props.item_row_data.image !== ""
          ? `${ImageUrl}media/items/${account}/${props.item_row_data.image}`
          : null
      );
      setInventorySwitch([
        props.item_row_data.compositeItem,
        props.item_row_data.trackStock,
      ]);
      let selectedModifier = modifire.modifiers_list;
      selectedModifier = selectedModifier.map((item) => {
        if (typeof props.item_row_data.modifiers !== "undefined") {
          if (
            props.item_row_data.modifiers.filter((ite) => ite._id === item._id)
              .length > 0
          ) {
            return {
              ...item,
              isSelected: true,
            };
          }
        }
        return item;
      });
      setModifiers(selectedModifier);
    }
  }, [props.item_row_data]);

  const goBack = () => {
    props.goBack();
    // dispatch(remove_row_data());
  };

  const updateItem = () => {
    const inStock = item.store_list
      .filter((item) => item.isSelected === true)
      .map((item) => {
        return item.inStock;
      });
    const stockQty = inStock.reduce((a, b) => a + b, 0);
    if (fields.item_name === "") {
      setErrors({
        ...errors,
        item_name: validator.isEmpty(fields.item_name),
      });
      return false;
    }
    let modifier = [];
    modifiers
      .filter((ite) => ite.isSelected === true)
      .map((item) => {
        return modifier.push(item._id);
        // return modifier.push({
        //   id: item._id,
        //   title: item.title,
        // });
      });
    let taxes = [];
    item.store_list
      .filter((item) => item.isSelected === true)
      .map((item) => {
        return (item.taxes || []).map(
          (tax) => taxes.push(tax._id)
          // taxes.push({
          //   id: tax._id,
          //   title: typeof tax.title == "undefined" ? "" : tax.title,
          //   type: typeof tax.tax_type == "undefined" ? "" : tax.tax_type.title,
          //   value: typeof tax.tax_rate == "undefined" ? null : tax.tax_rate,
          // });
        );
      });
    const ReturnNumber = (params) => {
      let num =
        typeof params !== undefined || typeof params !== null || params !== ""
          ? params
          : 0;
      num = Number.isInteger(num) ? num : num.toString().replace("$", "");
      num = Number.isInteger(num) ? num : num.toString().replace(",", "");
      return num;
    };
    var formData = new FormData();
    formData.append("item_id", props.item_row_data._id);
    formData.append("title", fields.item_name);
    formData.append("imageName", ImageName);
    formData.append("availableForSale", fields.availableForSale);
    formData.append(
      "category",
      fields.categoryId !== "0" ? fields.categoryId : null
    );
    formData.append("soldByType", fields.sold_by);
    formData.append("price", fields.price ? ReturnNumber(fields.price) : 0);
    formData.append("cost", fields.cost ? ReturnNumber(fields.cost) : 0);
    formData.append("color", fields.color);
    formData.append("compositeItem", inventorySwitch[0]);
    formData.append("trackStock", inventorySwitch[1]);
    formData.append("sku", fields.sku);
    formData.append("barcode", fields.item_barcode);
    formData.append("modifiers", JSON.stringify(modifier));
    formData.append(
      "taxes",
      JSON.stringify(
        (itemTax || [])
          .filter((item) => {
            return item.isSelected === true;
          })
          .map((item) => {
            return item._id;
          })
      )
    );
    formData.append(
      "stores",
      JSON.stringify(item.store_list.filter((item) => item.isSelected === true))
    );
    formData.append("varients", JSON.stringify(item.item_variants));
    formData.append("repoOnPos", fields.represent_type);
    formData.append(
      "itemColor",
      fields.represent_type === "Color_and_shape" ? fields.color : ""
    );
    formData.append("image", receiptFile == "" ? fields.image : receiptFile);
    formData.append("stockQty", stockQty);
    formData.append(
      "autoSKU",
      props.item_row_data.sku == fields.sku && fields.autoSKU
    );

    dispatch(update_item_record(formData));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: validator.isEmpty(value),
    });
  };

  const changeColor = (e) => {
    setFields({
      ...fields,
      color: e,
    });
  };

  const colors = [
    { id: 0, color: "#E0E0E0" },
    { id: 1, color: "#E04336" },
    { id: 2, color: "#E91E63" },
    { id: 3, color: "#FF9800" },
    { id: 4, color: "#CDDC39" },
    { id: 5, color: "#4CAF50" },
    { id: 6, color: "#2196F3" },
    { id: 7, color: "#9C27B0" },
  ];

  const handleClick = (event) => {
    // hiddenFileInput.current.click();
    document.getElementById("upload-button-receipt").click();
  };

  const uploadReceiptImage = (e) => {
    setrReceiptFile(e.target.files[0]);
    let reader = new FileReader();

    reader.onloadend = () => {
      setItemImage(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);

    // setItemImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleChangeInventory = (idx) => (e) => {
    const state = inventorySwitch.map((x, index) => (idx === index ? !x : x));
    setInventorySwitch(state);
    if (idx === 1) {
      toggle_item_stock(!inventorySwitch[1]);
    }
  };

  const handleChangeModifier = (idx) => (e) => {
    const state = modifierSwitch.map((x, index) => (idx === index ? !x : x));
    const modifier = (modifiers || []).map((item, index) => {
      if (idx === index) {
        return {
          ...item,
          isSelected: !item.isSelected,
        };
      }
      return item;
    });
    setModifiers(modifier);
    setModifierSwitch(state);
  };

  const toggleVariantModal = () => {
    setVariantModal(!variantModal);
  };

  const delete_category = () => {
    const data = [props.item_row_data._id];
    dispatch(delete_item_list(data));
  };

  const removeSelectedImages = (name) => {
    setItemImage(null);
  };
  const handleChangeTaxes = (idx) => (e) => {
    const state = taxesSwitch.map((x, index) => (idx === index ? !x : x));
    const taxes = (itemTax || []).map((item, index) => {
      if (idx === index) {
        return {
          ...item,
          isSelected: !item.isSelected,
        };
      }
      return item;
    });
    setItemTax(taxes);
    setTaxesSwitch(state);
  };
  const disable =
    fields.item_name == undefined ||
    fields.item_name == null ||
    fields.item_name == "";

  return (
    <React.Fragment>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol md="6">
              <CFormGroup>
                <CLabel htmlFor="item_name">Item Name</CLabel>
                <CInputGroup>
                  <CInput
                    id="item_name"
                    name="item_name"
                    placeholder="Item Name"
                    onChange={handleOnChange}
                    value={fields.item_name}
                    invalid={errors.item_name}
                    onBlur={handleOnBlur}
                  />
                  <CInvalidFeedback>
                    {errors.item_name === true ? "Please Enter Item Name" : ""}
                  </CInvalidFeedback>
                </CInputGroup>
              </CFormGroup>
            </CCol>
            <CCol md="6">
              <CFormGroup>
                <CLabel htmlFor="categoryId">Category</CLabel>
                <CSelect
                  size="md"
                  name="categoryId"
                  id="categoryId"
                  value={fields.categoryId}
                  onChange={handleOnChange}
                >
                  <option value="0">No Category</option>
                  {(category.category_list || []).map((item) => {
                    return <option value={item._id}>{item.title}</option>;
                  })}
                </CSelect>
              </CFormGroup>
            </CCol>
          </CRow>
          <CCol md="12">
            <CRow>
              <CCol sm="1">
                <CLabel>Sold by</CLabel>
              </CCol>
              <CCol sm="2">
                <CInputGroup
                  variant="custom-radio"
                  inline
                  className="form-group-space"
                >
                  <CInputRadio
                    className="form-check-input"
                    id="sold_by"
                    name="sold_by"
                    onChange={handleOnChange}
                    value={"Each"}
                    checked={fields.sold_by === "Each"}
                  />
                  <CLabel htmlFor="sold_by" className="checkbox-label">
                    Each
                  </CLabel>
                </CInputGroup>
              </CCol>
              <CCol sm="2">
                <CInputGroup
                  variant="custom-radio"
                  inline
                  className="form-group-space"
                >
                  <CInputRadio
                    className="form-check-input"
                    id="sold_by"
                    name="sold_by"
                    onChange={handleOnChange}
                    value={"Weight/Volume"}
                    checked={fields.sold_by === "Weight/Volume"}
                  />
                  <CLabel htmlFor="sold_by" className="checkbox-label">
                    Weight/Volume
                  </CLabel>
                </CInputGroup>
              </CCol>
            </CRow>
          </CCol>
          <CRow>
            <CCol sm="6">
              <CFormGroup>
                <CLabel htmlFor="price">Price</CLabel>
                <CInputGroup>
                  <NumberFormat
                    id="price"
                    name="price"
                    placeholder="Price"
                    value={fields.price}
                    thousandSeparator={true}
                    allowNegative={false}
                    onChange={handleOnChange}
                    decimalScale={decimal}
                    className="form-control"
                  />
                </CInputGroup>
              </CFormGroup>
            </CCol>
            <CCol sm="6">
              <CFormGroup>
                <CLabel htmlFor="cost">Cost</CLabel>
                <CInputGroup>
                  <NumberFormat
                    id="cost"
                    name="cost"
                    placeholder="Cost"
                    value={fields.cost}
                    thousandSeparator={true}
                    allowNegative={false}
                    onChange={handleOnChange}
                    decimalScale={decimal}
                    className="form-control"
                  />
                </CInputGroup>
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="6">
              <CFormGroup>
                <CLabel htmlFor="sku">SKU</CLabel>
                <CInputGroup>
                  <CInput
                    id="sku"
                    name="sku"
                    placeholder="SKU"
                    onChange={handleOnChange}
                    value={fields.sku}
                    invalid={errors.sku}
                    onBlur={handleOnBlur}
                  />
                  {/*  <CInvalidFeedback>
                    {errors.sku === true ? "Please Enter Sku" : ""}
                  </CInvalidFeedback>*/}
                </CInputGroup>
              </CFormGroup>
            </CCol>
            <CCol md="6">
              <CFormGroup>
                <CLabel htmlFor="item_barcode">Barcode</CLabel>
                <CInputGroup>
                  <CInput
                    id="item_barcode"
                    name="item_barcode"
                    placeholder="Barcode"
                    onChange={handleOnChange}
                    value={fields.item_barcode}
                    invalid={errors.item_barcode}
                    onBlur={handleOnBlur}
                  />
                </CInputGroup>
              </CFormGroup>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      {/**  Variants  */}
      {/* <CCard>
        <CCardHeader>
          <h4>
            <strong>Variants</strong>
          </h4>
        </CCardHeader>

        <CCardBody>
          <CCol xs="12" sm="12" md="12">
            {item.item_variants.length > 0 ? (
              <p>
                Options:{" "}
                {item.item_variants.map((item) => item.optionName).join("/")}
              </p>
            ) : (
              <p>
                Use variants if an item has different sizes, colors or other
                options
              </p>
            )}

            <CButton
              className="btn-square pull right mb-2"
              color="success"
              onClick={toggleVariantModal}
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
              {item.item_variants.length > 0 ? "EDIT VARIANT" : "ADD VARIANT"}
            </CButton>
          </CCol>
          <CRow>
            <CCol sm="12" md="12" lg="12">
              <AddItemVariant
                variantModal={variantModal}
                toggleVariantModal={toggleVariantModal}
                variants={item.item_variants}
                price={fields.price}
                cost={fields.cost}
              />
            </CCol>
          </CRow>

          {item.item_variants.length > 0 ? (
            <CRow>
              <CCol sm="12" md="12" lg="12">
                <VariantDatatable
                  item_variants={item.item_variants}
                  variants={item.variants}
                />
              </CCol>
            </CRow>
          ) : (
            ""
          )}
        </CCardBody>
      </CCard> */}
      {/**  Inventory  */}
      <CCard>
        <CCardHeader>
          <h4>
            <strong>Inventory</strong>
          </h4>
        </CCardHeader>

        <CCardBody>
          <CCol xs="12" sm="12" md="12">
            <CListGroup>
              {/* <CListGroupItem
                key={0}
                className="justify-content-between"
                style={{
                  border: "none",
                }}
              >
                <h6>
                  Composite item
                  <CSwitch
                    className={"mx-1 float-right"}
                    shape="pill"
                    color={"success"}
                    checked={inventorySwitch[0]}
                    onChange={handleChangeInventory(0)}
                  />
                </h6>
              </CListGroupItem> */}
              <CListGroupItem
                key={1}
                className="justify-content-between"
                style={{
                  border: "none",
                }}
              >
                <h6>
                  Track stock
                  <CSwitch
                    className={"mx-1 float-right"}
                    shape="pill"
                    color={"success"}
                    checked={inventorySwitch[1]}
                    onChange={handleChangeInventory(1)}
                  />
                </h6>
              </CListGroupItem>
            </CListGroup>
          </CCol>
        </CCardBody>
      </CCard>
      {/**  Modifiers  */}
      {modifire.modifiers_list.length > 0 ? (
        <>
          <CCard>
            <CCardHeader>
              <h4>
                <strong>Modifier</strong>
              </h4>
            </CCardHeader>

            <CCardBody>
              <CCol xs="12" sm="12" md="12">
                {modifiers.map((item, index) => (
                  <React.Fragment>
                    <CListGroup>
                      <CListGroupItem
                        key={1}
                        className="justify-content-between"
                        style={{
                          border: "none",
                        }}
                      >
                        <h6>
                          {item.title}
                          <CSwitch
                            className={"mx-1 float-right"}
                            shape="pill"
                            color={"success"}
                            checked={item.isSelected}
                            onChange={handleChangeModifier(index)}
                          />
                        </h6>
                        <p style={{ lineHeight: "normal" }}>
                          {item.stores.length === store.stores_list.length
                            ? "Available in all stores"
                            : "Available in " +
                              item.stores.map((str) => str.title).join(",")}
                        </p>
                      </CListGroupItem>
                    </CListGroup>
                  </React.Fragment>
                ))}
              </CCol>
            </CCardBody>
          </CCard>
        </>
      ) : (
        ""
      )}
      {/**  Taxes  */}
      {(itemTax || []).length > 0 ? (
        <>
          <CCard>
            <CCardHeader>
              <h4>
                <strong>Taxes</strong>
              </h4>
            </CCardHeader>

            <CCardBody>
              <CCol xs="12" sm="12" md="12">
                {(itemTax || []).map((item, index) => (
                  <React.Fragment>
                    <CListGroup>
                      <CListGroupItem
                        key={1}
                        className="justify-content-between"
                        style={{
                          border: "none",
                        }}
                      >
                        <h6>
                          {item.title} ({item.tax_rate} %)
                          <CSwitch
                            className={"mx-1 float-right"}
                            shape="pill"
                            color={"success"}
                            checked={taxesSwitch[index]}
                            onChange={handleChangeTaxes(index)}
                          />
                        </h6>
                        <p style={{ lineHeight: "normal" }}>
                          {item.stores.length === store.stores_list.length
                            ? "Available in all stores"
                            : "Available in " +
                              item.stores.map((str) => str.title).join(",")}
                        </p>
                      </CListGroupItem>
                    </CListGroup>
                  </React.Fragment>
                ))}
              </CCol>
            </CCardBody>
          </CCard>
        </>
      ) : (
        ""
      )}

      {/**  Stores  */}
      <CCard>
        <CCardHeader>
          <h4>
            <strong>Stores</strong>
          </h4>
        </CCardHeader>

        <CCardBody>
          <CCol xs="12" sm="12" md="12">
            <StoresDatatable
              stores={props.store}
              stock={inventorySwitch[1]}
              // stores={props.item_row_data.stores}
            />
          </CCol>
        </CCardBody>
      </CCard>
      {/**  Representation On POS  */}
      <CCard>
        <CCardHeader>
          <h4>
            <strong>Representation on POS</strong>
          </h4>
        </CCardHeader>

        <CCardBody>
          <CCol xs="12" sm="12" md="12">
            <CRow>
              <CCol sm="6" md="6" lg="6" xs="6">
                <CInputGroup
                  variant="custom-radio"
                  inline
                  className="form-group-space"
                >
                  <CInputRadio
                    className="form-check-input"
                    id="represent_type"
                    name="represent_type"
                    onChange={handleOnChange}
                    value={"Color_and_shape"}
                    checked={fields.represent_type === "Color_and_shape"}
                  />
                  <CLabel htmlFor="represent_type" className="checkbox-label">
                    Color and shape
                  </CLabel>
                </CInputGroup>
              </CCol>
              <CCol sm="6" md="6" lg="6" xs="6">
                <CInputGroup
                  variant="custom-radio"
                  inline
                  className="form-group-space"
                  style={{ float: "right", width: "15%" }}
                >
                  <CInputRadio
                    className="form-check-input"
                    id="represent_type"
                    name="represent_type"
                    onChange={handleOnChange}
                    value={"image"}
                    checked={fields.represent_type === "image"}
                  />
                  <CLabel htmlFor="represent_type" className="checkbox-label">
                    Image
                  </CLabel>
                </CInputGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                {colors.map((item, index) => (
                  <CCol
                    sm="2"
                    style={{
                      backgroundColor: `${item.color}`,
                      width: "50px",
                      height: "50px",
                      float: "left",
                      pointerEvents:
                        fields.represent_type === "image" ? "none" : "",
                      opacity: fields.represent_type === "image" ? 0.4 : "",
                    }}
                    className="ml-2 mb-2"
                    key={index}
                    onClick={() => changeColor(item.color)}
                  >
                    {item.color === fields.color ? (
                      <CImg
                        src="web-category-check.png"
                        alt="Image"
                        style={{
                          width: "25px",
                          marginTop: "13px",
                          marginLeft: "-4px",
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </CCol>
                ))}
                <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    float: "right",
                    pointerEvents:
                      fields.represent_type === "Color_and_shape" ? "none" : "",
                    opacity:
                      fields.represent_type === "Color_and_shape" ? 0.4 : "",
                  }}
                >
                  {itemImage !== null ? (
                    <>
                      <div onClick={() => removeSelectedImages("itemImage")}>
                        <i
                          className="fa fa-times"
                          aria-hidden="true"
                          style={{
                            display: "block",
                            position: "inherit",
                            float: "right",
                          }}
                        ></i>
                      </div>
                      <CImg src={itemImage} alt="" width="80px" height="80px" />
                    </>
                  ) : (
                    <CLabel htmlFor="upload-button-receipt">
                      <CIcon name="cil-file" height="50px" />
                    </CLabel>
                  )}
                  <CInput
                    type="file"
                    id="upload-button-receipt"
                    onChange={uploadReceiptImage}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  {/*ref={hiddenFileInput}}*/}
                  <CButton
                    color="success"
                    className="btn-square ml-2"
                    outline="true"
                    size="xs"
                    onClick={handleClick}
                    style={{
                      display: isHovered ? "block" : "none",
                      fontSize: "xx-small",
                    }}
                  >
                    UPLOAD
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </CCol>
        </CCardBody>
      </CCard>
      <CRow>
        <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
          <ConformationAlert
            button_text="Delete"
            heading="Please confirm your action"
            section="Are you sure you want to delete the selected Item?"
            buttonAction={delete_category}
            show_alert={showAlert}
            hideAlert={setShowAlert}
            variant="outline"
            className="btn-pill pull-right"
            color="danger"
            block={true}
          />
        </CCol>
        <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
          <CButton
            block
            variant="outline"
            className="btn-pill pull-right"
            color="danger"
            onClick={goBack}
          >
            CANCEL
          </CButton>
        </CCol>
        <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0 form-actions">
          <CButton
            block
            type="submit"
            variant="outline"
            className="btn-pill pull-right"
            color="success"
            onClick={updateItem}
            disabled={disable}
          >
            UPDATE
          </CButton>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default AddItem;
