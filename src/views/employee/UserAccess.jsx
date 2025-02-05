import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CFade,
  CButton,
} from "@coreui/react";
import UserRolesDatatable from "../../datatables/employee/UserRolesDatatable.jsx";
import ConformationAlert from "../../components/conformationAlert/ConformationAlert";
import AddRole from "../../components/employee/userRole/AddRole.jsx";
import EditUserRole from "../../components/employee/userRole/EditUserRole.jsx";
import {
  redirect_back_user_roles,
  get_user_access_list,
  get_roles_modules,
  delete_user_role,
} from "../../actions/employee/userRolesActions";
import { useSelector, useDispatch } from "react-redux";

const TimeCards = () => {
  const dispatch = useDispatch();
  const userRoles = useSelector(
    (state) => state.employeeReducers.userRolesReducer
  );
  const [showAlert, setShowAlert] = useState(false);
  const [fadeUserRoles, setFadeUserRoles] = useState(true);
  const [fadeUserRolesUpdate, setUserRolesUpdate] = useState(false);
  const [fadeAddUserRoles, setFadeAddUserRoles] = useState(false);
  const [timeout] = useState(300);

  useEffect(() => {
    if (
      userRoles.redirect_update !== undefined &&
      userRoles.redirect_update === true
    ) {
      setFadeUserRoles(false);
      setFadeAddUserRoles(false);
      setUserRolesUpdate(true);
    }
  }, [userRoles.redirect_update]);

  useEffect(() => {
    dispatch(get_user_access_list());
    dispatch(get_roles_modules());
  }, []);

  const deleteUserRole = () => {
    const roleId = userRoles.user_roles
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item.role_id;
      });
    // delete_user_role
    dispatch(delete_user_role(JSON.stringify(roleId)));
    setShowAlert(!showAlert);
  };

  const hideAlert = () => {
    setShowAlert(!showAlert);
  };

  const addRole = () => {
    setFadeUserRoles(false);
    setFadeAddUserRoles(true);
    setUserRolesUpdate(false);
    dispatch(redirect_back_user_roles(false));
  };

  const goBack = () => {
    setFadeUserRoles(true);
    setFadeAddUserRoles(false);
    setUserRolesUpdate(false);
    dispatch(redirect_back_user_roles(true));
  };

  return (
    <React.Fragment>
      <div className="animated fadeIn">
        {fadeUserRolesUpdate ? (
          <CFade timeout={timeout} in={fadeUserRolesUpdate}>
            <EditUserRole
              goBack={goBack}
              user_role_row_data={userRoles.user_role_row_data}
            />
          </CFade>
        ) : (
          ""
        )}
        {fadeAddUserRoles ? (
          <CFade timeout={timeout} in={fadeAddUserRoles}>
            <AddRole goBack={goBack} />
          </CFade>
        ) : (
          ""
        )}
        {fadeUserRoles ? (
          <React.Fragment>
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
                        onClick={addRole}
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
                        ADD ROLE
                      </CButton>

                      {userRoles.user_roles.filter(
                        (item) => item.isDeleted === true
                      ).length > 0 ? (
                        <React.Fragment>
                          <ConformationAlert
                            button_text="Delete"
                            heading="Delete User Role"
                            section={`Are you sure you want to delete the User Role?`}
                            buttonAction={deleteUserRole}
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
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <UserRolesDatatable user_roles={userRoles.user_roles} />
                </CCardBody>
              </CCard>
            </CCol>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default TimeCards;
