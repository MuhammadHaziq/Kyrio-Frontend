import React, { useState } from "react";
import { CDataTable } from "@coreui/react";
import { update_row_data } from "../../actions/reports/salesShiftActions";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";
import { MdDone, MdWarning } from "react-icons/md";
import moment from "moment";
import Amount from "../../components/utils/Amount";

const SalesShiftDatatable = (props) => {
  const dispatch = useDispatch();

  const clickRow = (item) => {
    dispatch(update_row_data(item, true));
  };

  return (
    <CDataTable
      itemsPerPageSelect
      items={props.sale_receipt_sumary}
      fields={[
        { key: "pos_device_id", label: "POS", filter: true },
        { key: "opened_at", label: "Opening time", filter: true },
        {
          key: "closed_at",
          label: "Closing time",
          filter: true,
        },
        { key: "expected_cash", label: "Expected cash amount", filter: true },
        { key: "actual_cash", label: "Actual cash amount", filter: true },
        { key: "difference", label: "Difference", filter: true },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      outlined
      pagination
      clickableRows
      onRowClick={clickRow}
      scopedSlots={{
        pos_device_id: (item) => {
          return <td>{item?.pos_device_id?.title}</td>;
        },
        opened_at: (item) => {
          return (
            <td>{dateFormat(item?.opened_at, "mmm dd, yyyy, hh:mm TT")}</td>
          );
        },
        closed_at: (item) => {
          return (
            <td>{dateFormat(item?.closed_at, "mmm dd, yyyy, hh:mm TT")}</td>
          );
        },
        expected_cash: (item) => {
          return <td>{<Amount value={item?.expected_cash} />}</td>;
        },
        actual_cash: (item) => {
          return <td>{<Amount value={item?.actual_cash} />}</td>;
        },

        difference: (item) => {
          return (
            <td>
              {item?.expected_cash - item?.actual_cash === 0 ? (
                <>
                  — <MdDone style={{ color: "#689f38", fontSize: "24px" }} />
                </>
              ) : (
                <p style={{ color: "#d32f2f" }}>
                  <Amount value={item?.expected_cash - item?.actual_cash} />{" "}
                  <MdWarning style={{ color: "#d32f2f", fontSize: "24px" }} />
                </p>
              )}
            </td>
          );
        },
      }}
    />
  );
};

export default SalesShiftDatatable;
