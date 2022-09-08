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
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CButton,
  CFade,
} from "@coreui/react";
import EmployeeListDatatable from "../../datatables/employee/EmployeeListDatatable.jsx";
import ConformationAlert from "../../components/conformationAlert/ConformationAlert";
import AddEmployee from "../../components/employee/employeeList/AddEmployee.jsx";
import EditEmployee from "../../components/employee/employeeList/EditEmployee.jsx";
import {
  redirect_back_employee,
  get_employee_list,
  get_employee_search,
  get_store_employee_list,
  delete_employee,
} from "../../actions/employee/employeeListActions";
import { get_user_access_list } from "../../actions/employee/userRolesActions";
import { get_stores } from "../../actions/settings/storeActions";
import { useSelector, useDispatch } from "react-redux";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const employee = useSelector(
    (state) => state.employeeReducers.employeeListReducer
  );
  // const auth = useSelector((state) => state.auth);
  const userRoles = useSelector(
    (state) => state.employeeReducers.userRolesReducer
  );
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [fadeEmployee, setFadeEmployee] = useState(true);
  const [fadeEmployeeUpdate, setEmployeeUpdate] = useState(false);
  const [fadeAddEmployee, setFadeAddEmployee] = useState(false);
  const [timeout] = useState(300);
  const [selectedStoreId, setSelectedStoreId] = useState("");

  useEffect(() => {
    dispatch(get_stores());
    dispatch(get_employee_list());
    dispatch(get_user_access_list());
  }, [dispatch]);
  useEffect(() => {
    if (
      employee.redirect_update !== undefined &&
      employee.redirect_update === true
    ) {
      setFadeEmployee(false);
      setFadeAddEmployee(false);
      setEmployeeUpdate(true);
    }
  }, [employee.redirect_update]);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const storeHandleChange = (e) => {
    setSelectedStoreId(e.target.value);
    dispatch(get_store_employee_list(e.target.value));
  };

  const deleteEmployee = () => {
    const employee_id = employee.employee_list
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    dispatch(delete_employee(JSON.stringify(employee_id)));
    setShowAlert(!showAlert);
  };

  // const hideAlert = () => {
  //   setShowAlert(!showAlert);
  // };

  const addEmployee = () => {
    setFadeEmployee(false);
    setFadeAddEmployee(true);
    setEmployeeUpdate(false);
    dispatch(redirect_back_employee(false));
  };

  const goBack = () => {
    setFadeEmployee(true);
    setFadeAddEmployee(false);
    setEmployeeUpdate(false);
    dispatch(redirect_back_employee(true));
  };

  const searchFilterOnSubmit = (e) => {
    e.preventDefault();
    const data = {
      search: search,
      storeId: selectedStoreId,
    };
    dispatch(get_employee_search(data));
  };

  const closeSearch = () => {
    setShowSearch(!showSearch);
    setSearch("");
    let storeId = selectedStoreId ? selectedStoreId : "0";
    dispatch(get_store_employee_list(storeId));
  };

  return (
    <React.Fragment>
      <div className="animated fadeIn">
        {fadeEmployeeUpdate ? (
          <CFade timeout={timeout} in={fadeEmployeeUpdate}>
            <EditEmployee
              store={store.stores_list}
              goBack={goBack}
              employee_row_data={employee.employee_row_data}
              user_roles={userRoles.user_roles}
            />
          </CFade>
        ) : (
          ""
        )}
        {fadeAddEmployee ? (
          <CFade timeout={timeout} in={fadeAddEmployee}>
            <AddEmployee
              store={store.stores_list}
              goBack={goBack}
              user_roles={userRoles.user_roles}
            />
          </CFade>
        ) : (
          ""
        )}
        {fadeEmployee ? (
          <React.Fragment>
            <CRow>
              <CCol xs="12" sm="12">
                <CCard>
                  <CCardHeader>
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
                          className="btn-square pull right"
                          onClick={addEmployee}
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
                          ADD EMPLOYEE
                        </CButton>

                        {employee.employee_list.filter(
                          (item) => item.isDeleted === true
                        ).length > 0 ? (
                          <React.Fragment>
                            <ConformationAlert
                              button_text="Delete"
                              heading="Delete Employee"
                              section={`Are you sure you want to delete the Employee? Upon deleting, his or her data will no longer be displayed in Employee List.`}
                              buttonAction={deleteEmployee}
                              show_alert={showAlert}
                              hideAlert={setShowAlert}
                              variant="outline"
                              className="ml-2 btn-square"
                              color="danger"
                              block={false}
                            />
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                      </CCol>

                      {showSearch === false ? (
                        <React.Fragment>
                          {store.stores_list.length > 1 ? (
                            <CCol xs="12" sm="6" md="6" xl="xl">
                              <CFormGroup style={{ float: "right" }}>
                                <CSelect
                                  size="md"
                                  name="selectStore"
                                  id="selectStore"
                                  value={selectedStoreId}
                                  onChange={storeHandleChange}
                                >
                                  <option value="0">All Store</option>
                                  {store.stores_list.map((item, index) => {
                                    return (
                                      <option value={item._id} key={index}>
                                        {item.title}
                                      </option>
                                    );
                                  })}
                                </CSelect>
                              </CFormGroup>
                            </CCol>
                          ) : (
                            ""
                          )}
                          {/* <CCol xs="12" sm="2" md="2" xl="xl">
                            <svg
                              viewBox="0 0 20 20"
                              className="c-icon c-icon-lg"
                              role="img"
                              style={{
                                marginTop: "10px",
                                cursor: "pointer",
                                float: "right",
                              }}
                              onClick={() => setShowSearch(!showSearch)}
                            >
                              <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                            </svg>
                          </CCol> */}
                        </React.Fragment>
                      ) : (
                        <CCol xs="12" sm="8" md="8" xl="xl">
                          <React.Fragment>
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
                          </React.Fragment>
                        </CCol>
                      )}
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <EmployeeListDatatable
                      employee_list={employee.employee_list}
                    />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default EmployeeList;
