import React from "react";
import {
  CNav,
  CNavItem,
  CSidebar,
  CSidebarClose,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { toggle_shift_sidebar } from "../../../actions/reports/salesShiftActions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import { groupBy, sumBy, orderBy } from "lodash";
import authAxios from "../../../constants/authAxios";
import Amount from "../../../components/utils/Amount";

const CancelReceipt = (props) => {
  const show = useSelector(
    (state) => state.reports.salesShiftReducer.show_shift_detail
  );
  const sales_shift_data = useSelector(
    (state) => state.reports.salesShiftReducer.sales_shift_data
  );

  const dispatch = useDispatch();

  const closeShiftDetail = () => {
    dispatch(toggle_shift_sidebar(false));
  };

  return (
    <CSidebar
      aside
      colorScheme="light"
      size="xl"
      unfoldable
      show={show}
      onShowChange={closeShiftDetail}
    >
      <CNav
        variant="tabs"
        className="nav-underline nav-underline-primary ml-auto "
      >
        <CNavItem>
          <CSidebarClose onClick={closeShiftDetail} style={{ left: "0" }} />
        </CNavItem>

        <CNavItem>
          <CDropdown inNav className="c-header-nav-item mx-2">
            <CDropdownToggle caret={false}></CDropdownToggle>
          </CDropdown>
        </CNavItem>
      </CNav>
      <CCard>
        <CCardBody></CCardBody>
      </CCard>
    </CSidebar>
  );
};
export default CancelReceipt;
