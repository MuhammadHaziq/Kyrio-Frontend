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
import { CIcon } from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import StoresDatatable from "./StoresDatatable";
// import { add_new_category } from "../../../actions/items/categoryActions";
import AddItemVariant from "./AddItemVariant";
import VariantDatatable from "./VariantDatatable";
import NumberFormat from "react-number-format";
import {
  save_item,
  toggle_item_stock,
  set_item_store_values,
} from "../../../actions/items/itemActions";
const AddItem = (props) => {
  const [fields, setFields] = useState({
    item_name: "",
    categoryId: "0",
    sold_by: "Each",
    price: "",
    cost: 0.0,
    sku: "",
    item_barcode: "",
    represent_type: "Color_and_shape",
    color: "#E0E0E0",
    availableForSale: false,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [itemImage, setItemImage] = useState(null);
  const [inventorySwitch, setInventorySwitch] = useState([false, false]);
  const [modifierSwitch, setModifierSwitch] = useState([false, false]);
  const [taxesSwitch, setTaxesSwitch] = useState([]);
  const [modifiers, setModifiers] = useState([]);
  const [receiptFile, setrReceiptFile] = useState("");
  const [variantModal, setVariantModal] = useState(false);
  const [errors, setErrors] = useState({
    item_name: false,
  });
  const [itemTax, setItemTax] = useState([]);
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const category = useSelector((state) => state.items.categoryReducer);
  const item = useSelector((state) => state.items.itemReducer);
  const modifire = useSelector((state) => state.items.modifiresReducer);
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
            isSelected: true,
          };
        })
      );
      const taxesSwitch = [];
      (item.item_taxes || []).map((item) => {
        taxesSwitch.push(true);
      });
      setTaxesSwitch(taxesSwitch);
    }
  }, [item.item_taxes]);

  useEffect(() => {
    let modifierSwitch = [];
    (modifire.modifiers_list || []).map((item) => {
      modifierSwitch.push(false);
    });
    setModifierSwitch(modifierSwitch);
    setModifiers(modifire.modifiers_list);
  }, [modifire.modifiers_list]);
  const goBack = () => {
    props.goBack();
  };

  const submitItem = () => {
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
        return modifier.push({
          id: item._id,
          title: item.title,
        });
      });
    // let taxes = [];
    // item.store_list
    //   .filter((item) => item.isSelected === true)
    //   .map((item) => {
    //     (item.taxes || []).map((tax) => {
    //       return taxes.push({
    //         id: tax._id,
    //         title: tax.title,
    //         type: tax.tax_type.title,
    //         value: tax.tax_rate,
    //       });
    //     });
    //   });
    const ReturnNumber = (params) => {
      let num = params;
      num = Number.isInteger(num) ? num : num.replace("$", "");
      num = Number.isInteger(num) ? num : num.replace(",", "");
      return num;
    };
    console.log(
      (itemTax || []).filter((item) => {
        return item.isSelected === true;
      })
    );
    var formData = new FormData();
    formData.append("name", fields.item_name);
    formData.append("availableForSale", fields.availableForSale);
    formData.append(
      "category",
      fields.categoryId !== "0"
        ? JSON.stringify({
          id: fields.categoryId,
          name: category.category_list
            .filter((item) => (item._id) === (fields.categoryId))
            .map((item) => {
              return item.catTitle;
            })[0],
        })
        : null
    );
    formData.append("soldByType", fields.sold_by);
    formData.append(
      "price",
      fields.price !== null ? ReturnNumber(fields.price) : 0
    );
    formData.append(
      "cost",
      fields.cost !== null ? ReturnNumber(fields.cost) : 0
    );
    formData.append("color", fields.color);
    formData.append("compositeItem", inventorySwitch[0]);
    formData.append("trackStock", inventorySwitch[1]);
    formData.append("sku", fields.sku);
    formData.append("barcode", fields.item_barcode);
    formData.append("modifiers", JSON.stringify(modifier));
    formData.append(
      "taxes",
      JSON.stringify(
        (itemTax || []).filter((item) => {
          return item.isSelected === true;
        })
      )
    );
    formData.append(
      "stores",
      JSON.stringify(item.store_list.filter((item) => item.isSelected === true))
    );
    formData.append(
      "varients",
      JSON.stringify(
        item.item_variants.map((item) => {
          return {
            optionName: item.optionName,
            optionValue: (item.optionValue || []).map((ite) => {
              return {
                ...ite,
                price: ReturnNumber(ite.price),
                cost: ReturnNumber(ite.cost),
              };
            }),
          };
        })
      )
    );
    formData.append("repoOnPos", fields.represent_type);
    formData.append(
      "itemColor",
      fields.represent_type === "Color_and_shape" ? fields.color : ""
    );
    formData.append("image", receiptFile);
    formData.append("stockQty", stockQty);
    dispatch(save_item(formData));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "price") {
      dispatch(set_item_store_values("Price", "", value));
      setFields({
        ...fields,
        [name]: value,
      });
    } else {
      setFields({
        ...fields,
        [name]: value,
      });
    }
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
  const toggleVariantModal = () => {
    setVariantModal(!variantModal);
  };

  const removeSelectedImages = (name) => {
    setItemImage(null);
  };

  const disable =
    fields.item_name == undefined ||
    fields.item_name == null ||
    fields.item_name == "";

  console.log("taxesSwitch", itemTax);
  console.log(fields.categoryId)
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
                  custom
                  size="md"
                  name="categoryId"
                  id="categoryId"
                  value={fields.categoryId}
                  onChange={handleOnChange}
                >
                  <option value="0">No Category</option>
                  {(category.category_list || []).map((item) => {
                    return <option value={item._id}>{item.catTitle}</option>;
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
                <CInputGroup variant="custom-radio" inline>
                  <CInputRadio
                    id="sold_by"
                    name="sold_by"
                    onChange={handleOnChange}
                    value={"Each"}
                    checked={fields.sold_by === "Each"}
                  />
                  <CLabel htmlFor="sold_by">Each</CLabel>
                </CInputGroup>
              </CCol>
              <CCol sm="2">
                <CInputGroup variant="custom-radio" inline>
                  <CInputRadio
                    id="sold_by"
                    name="sold_by"
                    onChange={handleOnChange}
                    value={"Weight/Volume"}
                    checked={fields.sold_by === "Weight/Volume"}
                  />
                  <CLabel htmlFor="sold_by">Weight/Volume</CLabel>
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
                    onChange={handleOnChange}
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
                    onChange={handleOnChange}
                    decimalScale={2}
                    className="form-control"
                    prefix={"$"}
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
                  {/*  <CInvalidFeedback>
                    {errors.item_barcode === true ? "Please Enter Barcode" : ""}
                  </CInvalidFeedback>*/}
                </CInputGroup>
              </CFormGroup>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      {/**  Variants  */}
      <CCard>
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
                price={fields.price}
                cost={fields.cost}
                variantModal={variantModal}
                toggleVariantModal={toggleVariantModal}
                variants={item.item_variants}
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
      </CCard>
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
              <CListGroupItem
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
              </CListGroupItem>
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
                {modifire.modifiers_list.map((item, index) => (
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
                            checked={modifierSwitch[index]}
                            onChange={handleChangeModifier(index)}
                          />
                        </h6>
                        <p style={{ lineHeight: "normal" }}>
                          {item.stores.length === store.stores_list.length
                            ? "Available in all stores"
                            : item.stores.map((str) => str.name).join(",")}
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
                          {item.allStores === true
                            ? "Available in all stores"
                            : item.stores
                              .map((str) => str.storeTitle)
                              .join(",")}
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
            <StoresDatatable stores={props.store} stock={inventorySwitch[1]} />
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
              <CCol sm="6" md="6" lg="6">
                <CInputGroup variant="custom-radio" inline>
                  <CInputRadio
                    id="represent_type"
                    name="represent_type"
                    onChange={handleOnChange}
                    value={"Color_and_shape"}
                    checked={fields.represent_type === "Color_and_shape"}
                  />
                  <CLabel htmlFor="represent_type">Color and shape</CLabel>
                </CInputGroup>
              </CCol>
              <CCol sm="6" md="6" lg="6">
                <CInputGroup
                  variant="custom-radio"
                  inline
                  style={{ float: "right", width: "15%" }}
                >
                  <CInputRadio
                    id="represent_type"
                    name="represent_type"
                    onChange={handleOnChange}
                    value={"image"}
                    checked={fields.represent_type === "image"}
                  />
                  <CLabel htmlFor="represent_type">Image</CLabel>
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
                    className="ml-2"
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
                          class="fa fa-times"
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
        <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
          <CButton
            block
            variant="outline"
            className="btn-pill pull-right"
            color="danger"
            onClick={goBack}
          >
            BACK
          </CButton>
        </CCol>
        <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0 form-actions">
          <CButton
            block
            type="submit"
            variant="outline"
            className="btn-pill pull-right"
            color="success"
            onClick={submitItem}
            disabled={disable}
          >
            SAVE
          </CButton>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default AddItem;
// const data = {
//   name: fields.item_name,
//   availableForSale: false,
//   category:
//     fields.categoryId !== "0"
//       ? JSON.stringify({
//           id: fields.categoryId,
//           name: category.category_list
//             .filter((item) => item._id)
//             .map((item) => {
//               return item.catTitle;
//             })[0],
//         })
//       : JSON.stringify({ id: "0", name: "No Category" }),
//   soldByType: fields.sold_by,
//   price: ReturnNumber(fields.price),
//   cost: ReturnNumber(fields.cost),
//   represent_type: fields.represent_type,
//   color: fields.color,
//   compositeItem: inventorySwitch[0],
//   trackRecord: inventorySwitch[1],
//   modifierSwitch: modifierSwitch[0],
//   dsd: modifierSwitch[1],
//   modifiers:
//     modifierSwitch[0] === true
//       ? JSON.stringify(modifiers)
//       : JSON.stringify([]),
//   taxes: JSON.stringify(taxes),
//   stores: JSON.stringify(
//     item.store_list
//       .filter((item) => item.isSelected === true)
//       .map((item) => {
//         return {
//           id: item.id,
//           title: item.title,
//         };
//       })
//   ),
//   variants: JSON.stringify(item.variants),
//   repoOnPos: fields.represent_type,
//   itemColor: fields.color,
//   image: itemImage,
//   stockQty: 200,
// };
