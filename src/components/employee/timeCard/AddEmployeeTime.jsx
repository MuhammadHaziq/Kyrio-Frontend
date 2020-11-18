import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardFooter,
    CCol,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow,
    CInvalidFeedback,
    CFormGroup,
    CInputCheckbox,
    CLabel,
    CLink,
    CCollapse,
    CSelect,
    CFormText,
} from "@coreui/react";
import {
    MdAccountCircle,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { TextMask, InputAdapter } from "react-text-mask-hoc";
import { CIcon } from "@coreui/icons-react";
import NumberFormat from "react-number-format";
import { add_new_employee } from "../../../actions/employee/employeeListActions";
import validator from "validator";

const AddEmployeeTime = (props) => {
    const [fields, setFields] = useState({
        clockInDate: "",
        clockOutDate: "",
        clockInTime: "",
        clockOutTime: "",
        employeeId: "0",
        storeId: "0",
    });
    const [errors, setErrors] = useState({
        clockInDate: false,
        clockOutDate: false,
        clockInTime: false,
        clockOutTime: false,
        employeeId: false,
        storeId: false,
    });
    const [stores, setStores] = useState([])
    const [employees, setEmployees] = useState([])

    const dispatch = useDispatch();
    const employee = useSelector(
        (state) => state.employeeReducers.employeeListReducer
    );

    // useEffect(() => {
    //     if (
    //         employee.redirect_employee !== undefined &&
    //         employee.redirect_employee === true
    //     ) {
    //         props.goBack();
    //     }
    // }, [employee.redirect_employee]);

    useEffect(() => {
        if (
            props.store !== undefined &&
            props.store.length > 0
        ) {
            setStores(props.store)
        }
    }, [props.store]);

    useEffect(() => {
        if (
            employee.employee_list !== undefined &&
            employee.employee_list.length > 0
        ) {
            setEmployees(employee.employee_list)
        }
    }, [employee.employee_list]);


    const goBack = () => {
        props.goBack();
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
        console.log(name, value)
        if (e.target.name === "storeId" || e.target.value === "" || e.target.value === "0" || e.target.value === undefined || e.target.value === null) {
            setErrors({
                ...errors,
                role: true,
            });
        } else if (e.target.name === "employeeId" || e.target.value === "" || e.target.value === "0" || e.target.value === undefined || e.target.value === null) {
            setErrors({
                ...errors,
                employeeId: true,
            });
        } else {
            setErrors({
                ...errors,
                [name]: validator.isEmpty(value),
            });
        }
    };

    const saveTimeCard = () => {
        if (fields.employeeId === "" || fields.employeeId === "0" || fields.employeeId === undefined || fields.employeeId === null) {
            setErrors({
                ...errors,
                employeeId: true,
            });
            return false;
        }
        else if (fields.storeId === "" || fields.storeId === "0" || fields.storeId === undefined || fields.storeId === null) {
            setErrors({
                ...errors,
                storeId: true
            });
            return false;
        } else if (fields.clockInDate === "" || fields.clockInDate === undefined || fields.clockInDate === null) {
            setErrors({
                ...errors,
                clockInDate: validator.isEmpty(fields.clockInDate),
            });
            return false;
        } else if (fields.clockOutDate === "" || fields.clockOutDate === undefined || fields.clockOutDate === null) {
            setErrors({
                ...errors,
                clockOutDate: validator.isEmpty(fields.clockOutDate),
            });
            return false;
        } else if (fields.clockInTime === "" || fields.clockInTime === undefined || fields.clockInTime === null) {
            setErrors({
                ...errors,
                clockInTime: validator.isEmpty(fields.clockInTime),
            });
            return false;
        } else if (fields.clockOutTime === "" || fields.clockOutTime === undefined || fields.clockOutTime === null) {
            setErrors({
                ...errors,
                clockOutTime: validator.isEmpty(fields.clockOutTime),
            });
            return false;
        }
        else {
            const data = {
                store: JSON.stringify(
                    (stores || [])
                        .filter((item) => item._id === fields.storeId)
                        .map((item) => {
                            return {
                                id: item._id,
                                name: item.title,
                            };
                        })
                ),
                employee: JSON.stringify(
                    (employees || [])
                        .filter((item) => item._id === fields.employeeId)
                        .map((item) => {
                            return {
                                id: item._id,
                                name: item.name,
                            };
                        })
                ),
                clockInDate: fields.clockInDate,
                clockOutDate: fields.clockOutDate,
                clockInTime: fields.clockInTime,
                clockOutTime: fields.clockOutTime,
            };
            console.log(data)
            // dispatch(add_new_employee(data));
        }
    };

    console.log(errors)
    return (
        <React.Fragment>

            <CRow className="justify-content-left">
                <CCol md="9" lg="9" xl="6">
                    <CCard>
                        <CCardBody className="p-2">
                            <CRow>
                                <CCol sm='12' md='6' lg='6'>
                                    <CFormGroup>
                                        <CLabel>Employee</CLabel>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <MdAccountCircle />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CSelect
                                                className={
                                                    errors.employeeId === true
                                                        ? "form-control is-invalid"
                                                        : "form-control"
                                                }
                                                custom
                                                size="md"
                                                name="employeeId"
                                                id="employeeId"
                                                value={fields.employeeId}
                                                onChange={handleOnChange}
                                                onBlur={handleOnBlur}
                                                invalid={errors.employeeId}
                                            >
                                                <option value="0">Select Employee</option>
                                                {employees.map((item, index) => {
                                                    return (
                                                        <option value={item._id} key={index}>
                                                            {item.name}
                                                        </option>
                                                    );
                                                })}
                                            </CSelect>

                                            <CInvalidFeedback>
                                                {errors.employeeId === true ? "Please Enter Select Employee" : ""}
                                            </CInvalidFeedback>
                                        </CInputGroup>
                                    </CFormGroup>

                                </CCol>
                                <CCol sm='12' md='6' lg='6'>
                                    <CFormGroup>
                                        <CLabel> Store </CLabel>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <MdAccountCircle />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CSelect
                                                className={
                                                    errors.storeId === true
                                                        ? "form-control is-invalid"
                                                        : "form-control"
                                                }
                                                custom
                                                size="md"
                                                name="storeId"
                                                id="storeId"
                                                value={fields.storeId}
                                                onChange={handleOnChange}
                                                onBlur={handleOnBlur}
                                                invalid={errors.storeId}
                                            >
                                                <option value="0">Select Store</option>
                                                {stores.map((item, index) => {
                                                    return (
                                                        <option value={item._id} key={index}>
                                                            {item.title}
                                                        </option>
                                                    );
                                                })}
                                            </CSelect>

                                            <CInvalidFeedback>
                                                {errors.storeId === true ? "Please Enter Select Store" : ""}
                                            </CInvalidFeedback>
                                        </CInputGroup>
                                    </CFormGroup>

                                </CCol>

                            </CRow>


                        </CCardBody>
                    </CCard>
                    <CRow>
                        <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                            <CButton
                                block
                                variant="outline"
                                className="btn-pill pull-right"
                                color="secondary"
                                onClick={goBack}
                            >
                                BACK
                </CButton>
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
                                onClick={saveTimeCard}
                            >
                                SAVE
                </CButton>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>

        </React.Fragment>
    );
};

export default AddEmployeeTime;
