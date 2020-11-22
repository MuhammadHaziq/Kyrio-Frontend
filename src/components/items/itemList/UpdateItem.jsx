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
import ConformationAlert from "../../conformationAlert/ConformationAlert";
import AddItemVariant from "./AddItemVariant";
import VariantDatatable from "./VariantDatatable";
import NumberFormat from "react-number-format";
import {
  update_item_record,
  toggle_item_stock,
  delete_item_list,
  remove_row_data,
} from "../../../actions/items/itemActions";
const AddItem = (props) => {
  const [fields, setFields] = useState({
    item_name: "",
    categoryId: "0",
    sold_by: "Each",
    price: "",
    cost: "$0.00",
    represent_type: "Color_and_shape",
    color: "rgb(224, 224, 224)",
    availableForSale: false,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [itemImage, setItemImage] = useState(null);
  const [inventorySwitch, setInventorySwitch] = useState([false, false]);
  const [modifierSwitch, setModifierSwitch] = useState([false, false]);
  const [receiptFile, setrReceiptFile] = useState("");
  const [variantModal, setVariantModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [errors, setErrors] = useState({
    item_name: false,
  });

  const category = useSelector((state) => state.items.categoryReducer);
  const item = useSelector((state) => state.items.itemReducer);

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
    if (props.item_row_data !== undefined && props.item_row_data !== null) {
      console.log(props.item_row_data);
      setFields({
        ...fields,
        item_name: props.item_row_data.name,
        categoryId: props.item_row_data.category.id,
        sold_by: props.item_row_data.soldByType,
        price: props.item_row_data.price,
        cost: "$" + props.item_row_data.cost,
        represent_type: props.item_row_data.repoOnPos,
        color: props.item_row_data.color,
        availableForSale: props.item_row_data.availableForSale,
      });
      setInventorySwitch([
        props.item_row_data.compositeItem,
        props.item_row_data.trackStock,
      ]);
      setModifierSwitch([
        props.item_row_data.modifiersStatus,
        props.item_row_data.dsd,
      ]);
    }
  }, [props.item_row_data]);

  const goBack = () => {
    props.goBack();
    dispatch(remove_row_data());
  };

  const updateItem = () => {
    if (fields.item_name === "") {
      setErrors({
        ...errors,
        item_name: validator.isEmpty(fields.item_name),
      });
      return false;
    }
    let modifiers = [];
    item.store_list
      .filter((item) => item.isSelected === true)
      .map((item) => {
        return (item.modifiers || []).map((modi) => {
          modifiers.push({
            id: modi._id,
            title: modi.title,
          });
        });
      });
    let taxes = [];
    item.store_list
      .filter((item) => item.isSelected === true)
      .map((item) => {
        return (item.taxes || []).map((tax) => {
          taxes.push({
            id: tax._id,
            title: tax.title,
            type: tax.tax_type.title,
            value: tax.tax_rate,
          });
        });
      });
    const ReturnNumber = (params) => {
      let num = params;
      num = Number.isInteger(num) ? num : num.replace("$", "");
      num = Number.isInteger(num) ? num : num.replace(",", "");
      return num;
    };
    const data = {
      item_id: props.item_row_data._id,
      name: fields.item_name,
      availableForSale: false,
      category:
        fields.categoryId !== "0"
          ? JSON.stringify({
              id: fields.categoryId,
              name: category.category_list
                .filter((item) => item._id)
                .map((item) => {
                  return item.catTitle;
                })[0],
            })
          : JSON.stringify({ id: "0", name: "No Category" }),
      soldByType: fields.sold_by,
      price: fields.price !== null ? ReturnNumber(fields.price) : fields.price,
      cost: fields.cost !== null ? ReturnNumber(fields.cost) : fields.cost,
      color: fields.color,
      compositeItem: inventorySwitch[0],
      trackStock: inventorySwitch[1],
      modifiersStatus: modifierSwitch[0],
      dsd: modifierSwitch[1],
      modifiers:
        modifierSwitch[0] === true
          ? JSON.stringify(modifiers)
          : JSON.stringify([]),
      taxes: JSON.stringify(taxes),
      stores: JSON.stringify(
        item.store_list.filter((item) => item.isSelected === true)
      ),
      variants: JSON.stringify(item.item_variants),
      repoOnPos: fields.represent_type,
      itemColor:
        fields.represent_type === "Color_and_shape" ? fields.color : "",
      image: itemImage,
      stockQty: 200,
    };
    dispatch(update_item_record(data));
    console.log(data);
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
    { id: 0, color: "rgb(224, 224, 224)" },
    { id: 1, color: "rgb(244, 67, 54)" },
    { id: 2, color: "rgb(233, 30, 99)" },
    { id: 3, color: "rgb(255, 152, 0)" },
    { id: 4, color: "rgb(205, 220, 57)" },
    { id: 5, color: "rgb(76, 175, 80)" },
    { id: 6, color: "rgb(33, 150, 243)" },
    { id: 7, color: "rgb(156, 39, 176)" },
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
    setModifierSwitch(state);
  };
  const toggleVariantModal = () => {
    setVariantModal(!variantModal);
  };

  const delete_category = () => {
    const data = [props.item_row_data._id];
    dispatch(delete_item_list(JSON.stringify(data)));
  };

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
                    placeholder="Category Name"
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
      <CCard>
        <CCardHeader>
          <h4>
            <strong>Modifier</strong>
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
                  borderBottom: "1px solid #00000024",
                }}
              >
                <h6>
                  Modifire
                  <CSwitch
                    className={"mx-1 float-right"}
                    shape="pill"
                    color={"success"}
                    checked={modifierSwitch[0]}
                    onChange={handleChangeModifier(0)}
                  />
                </h6>
                <p style={{ lineHeight: "normal" }}>Available in all stores</p>
              </CListGroupItem>
              <CListGroupItem
                key={1}
                className="justify-content-between"
                style={{
                  border: "none",
                }}
              >
                <h6>
                  dsd
                  <CSwitch
                    className={"mx-1 float-right"}
                    shape="pill"
                    color={"success"}
                    checked={modifierSwitch[1]}
                    onChange={handleChangeModifier(1)}
                  />
                </h6>
                <p style={{ lineHeight: "normal" }}>Available in all stores</p>
              </CListGroupItem>
            </CListGroup>
          </CCol>
        </CCardBody>
      </CCard>
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
                  <CLabel htmlFor="upload-button-receipt">
                    {itemImage !== null ? (
                      <CImg
                        src={itemImage}
                        alt=""
                        width="100px"
                        height="80px"
                      />
                    ) : (
                      <CIcon name="cil-file" height="50px" />
                    )}
                  </CLabel>
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
          >
            Update
          </CButton>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default AddItem;
