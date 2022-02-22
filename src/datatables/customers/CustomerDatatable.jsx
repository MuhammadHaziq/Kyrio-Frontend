import React from "react";
import {
  toggle_customer_single_select,
  toggle_customer_all_select,
  update_row_data,
} from "../../actions/customer/customerActions";
import { CDataTable, CInputCheckbox, CFormGroup, CLabel } from "@coreui/react";
import { useDispatch } from "react-redux";

const CustomerDatatable = (props) => {
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = React.useState(false);

  const check = (e, item) => {
    dispatch(toggle_customer_single_select(item));
  };
  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(update_row_data(item));
    }
  };

  const checkAll = (e, selectAll) => {
    setSelectAll(!selectAll);
    dispatch(toggle_customer_all_select(!selectAll));
  };

  return (
    <React.Fragment>
      <CDataTable
        itemsPerPageSelect
        items={props.customers}
        fields={[
          {
            key: "select",
            label: "Select",
            filter: false,
            _style: { width: "5%" },
          },
          { key: "name", label: "Name", filter: true },
          { key: "email", label: "Email", filter: true },
          { key: "firstVisit", label: "First visit", filter: true },
          { key: "lastVisit", label: "Last visit", filter: true },
          { key: "totalVisit", label: "Total Visits", filter: true },
          { key: "totalSpent", label: "Total Spent", filter: true },
          { key: "pointsBalance", label: "Points Balance", filter: true },
        ]}
        itemsPerPage={10}
        columnFilter
        sorter
        hover
        outlined
        pagination
        clickableRows
        onRowClick={clickRow}
        columnHeaderSlot={{
          select: [
            <CFormGroup variant="custom-checkbox">
              <CInputCheckbox
                custom
                id={`checkbox`}
                onClick={(e) => checkAll(e, selectAll)}
              />
              <CLabel variant="custom-checkbox" htmlFor={`checkbox`} />
            </CFormGroup>,
          ],
        }}
        scopedSlots={{
          select: (item) => {
            return (
              <td>
                <CFormGroup variant="custom-checkbox">
                  <CInputCheckbox
                    custom
                    id={`checkbox${item._id}`}
                    checked={item.isDeleted}
                    onChange={(e) => check(e, item)}
                  />
                  <CLabel
                    variant="custom-checkbox"
                    htmlFor={`checkbox${item._id}`}
                  />
                </CFormGroup>
              </td>
            );
          },
          name: (item) => {
            return (
              <td>
                <b style={{ fontSize: "smaller" }}>{item.name || "-"}</b>
                <span>
                  <p>{item.note || ""}</p>
                </span>
              </td>
            );
          },
          email: (item) => {
            return (
              <td>
                {item.email}
                <span>
                  <p>{item.phone}</p>
                </span>
              </td>
            );
          },
          firstVisit: (item) => {
            return <td>{item.firstVisitData || "-"}</td>;
          },
          lastVisit: (item) => {
            return <td>{item.lastVisitData || "-"}</td>;
          },
          totalVisit: (item) => {
            return <td>{item.totalVisit || "0"}</td>;
          },
          totalSpent: (item) => {
            return <td>{item.totalSpent || "0.00"}</td>;
          },
          pointsBalance: (item) => {
            return <td>{item.pointBalance || "0.00"}</td>;
          },
        }}
      />
    </React.Fragment>
  );
};

export default CustomerDatatable;
