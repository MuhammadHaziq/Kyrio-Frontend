import React, {useState, useEffect} from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CFade,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CFormText,
  CLink,
  CInputGroupAppend,
  CForm,
  CInputCheckbox
} from "@coreui/react";
import {CIcon} from "@coreui/icons-react";
import {TextMask, InputAdapter} from 'react-text-mask-hoc'
import {add_new_pos_device} from '../../../actions/settings/posDeviceActions.js'
import {useDispatch, useSelector} from "react-redux";
const AddPosDevice = (props) => {
  const store = useSelector((state) => state.settingReducers.storeReducer)
  const [collapse, setCollapse] = useState([true, true]);
  const [expRight, setExpRight] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [timeout, setTimeout] = useState(300);
  const [fields, setFields] = useState({pos_device_name: ''})
  const [errors, setErrors] = useState({pos_device_name: ''})
  const [stores_checked, setChecked] = useState([])
  const [fade, setFade] = useState(true)
  const dispatch = useDispatch()
  const toggle = (tab) => {
    const state = collapse.map((x, index) => (
      tab === index
      ? !x
      : x));
    setCollapse(state)
  };
  const goBack = () => {
    props.goBack();
  }
  const submitStoreForm = (e) => {
    e.preventDefault()
    const data = {
      title: fields.pos_device_name,
      store: JSON.stringify(stores_checked)
    }
    dispatch(add_new_pos_device(data))
    console.log('sote_name', fields)
    console.log('stores_checked', stores_checked)

  }
  const handleOnChange = (e) => {
    const {name, value} = e.target
    setFields({
      ...fields,
      [name]: value
    })
  }
  const handleOnChangeCheck = (e) => {
    const {name, value} = e.target
    const store = props.stores.filter(item => item._id == value)
    const storeData = {
      storeId: store[0]._id,
      storeName: store[0].title
    }
    if (stores_checked.length === 0) {
      setChecked([storeData])
    } else {
      const exist = stores_checked.filter(item => item.storeId == value)
      if (exist.length > 0) {
        const alreadyExist = stores_checked.filter(item => item.storeId !== value)
        setChecked(alreadyExist)
      } else {
        setChecked([
          ...stores_checked,
          storeData
        ])
      }
    }

  }
  return (<CCard>
    <CCardHeader>
      <h4>
        <strong>Add New Pos Device</strong>
        <div className="card-header-actions">

          <CLink className="card-header-action" onClick={() => toggle(0)}>
            <CIcon name={collapse[0]
                ? 'cil-chevron-bottom'
                : 'cil-chevron-top'}/>
          </CLink>

        </div>

      </h4>
    </CCardHeader>
    <CCollapse show={collapse[0]}>
      <CCardBody>
        <CForm onSubmit={submitStoreForm}>
          <CFormGroup row="row">
            <CCol md="12">
              <CLabel htmlFor="store_name">Pos Device Name</CLabel>
              <CInputGroup>
                <CInputGroupPrepend>
                  <CInputGroupText><CIcon name="cil-device"/></CInputGroupText>
                </CInputGroupPrepend>
                <CInput id="pos_device_name" name="pos_device_name" placeholder="Pos Device Name" onChange={handleOnChange}/>

              </CInputGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup row="row">
            <CCol md="3">
              <CLabel>Stores</CLabel>
            </CCol>
            <CCol md="9">
              {
                props.stores.map(item => (<React.Fragment>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox id="stores_checked" name="stores_checked" value={item._id} onChange={handleOnChangeCheck}/>
                    <CLabel variant="checkbox" className="form-check-label" htmlFor='stores_checked'>{item.title}</CLabel>
                  </CFormGroup>
                </React.Fragment>))
              }
            </CCol>
          </CFormGroup>
          <CRow>
            <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
              <CButton block="block" variant="outline" className="btn-pill pull-right" color="default" onClick={goBack}>BACK</CButton>
            </CCol>
            <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
              <CButton block="block" variant="outline" className="btn-pill pull-right" color="danger" onClick={goBack}>CANCEL</CButton>
            </CCol>
            <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0 form-actions">
              <CButton type='submit' block="block" variant="outline" className="btn-pill pull-right" color="primary">SAVE</CButton>
            </CCol>
          </CRow>
        </CForm>

      </CCardBody>
    </CCollapse>
  </CCard>);
}

export default AddPosDevice;
