import React, { useState } from "react";
import {
    CDataTable,
    CCardBody,
    CInputCheckbox,
    CFormGroup,
    CLabel,
} from "@coreui/react";
import {
    toggle_employee_sales_summary_single_select,
    toggle_employee_sales_summary_all_select,
    update_row_data,
} from "../../actions/reports/salesEmployeeActions";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";

const SalesEmployeeDatatable = (props) => {
    const dispatch = useDispatch();

    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const check = (e, item) => {
        dispatch(toggle_employee_sales_summary_single_select(item));
    };

    const clickRow = (item, index, column) => {
        if (column !== "select") {
            dispatch(update_row_data(item));
        }
    };

    const checkAll = (e, selectAll) => {
        setSelectAll(!selectAll);
        dispatch(toggle_employee_sales_summary_all_select(!selectAll));
    };
    // { key: "receipt", label: "Receipts", filter: true },
    //             { key: "avg_sale", label: "Average Sale", filter: true },
    //             {
    //                 key: "customer_signed_up",
    //                 label: "Customers Signed Up",
    //                 filter: true,
    //             },
    return (
        <CDataTable
            items={props.sales_by_employee_detail}
            fields={[
                {
                    key: "select",
                    label: "Select",
                    filter: false,
                    _style: { width: "5%" },
                },
                { key: "Name", label: "Name", filter: true },
                { key: "GrossSales", label: "Gross sales", filter: true },
                { key: "Refunds", label: "Refunds", filter: true },
                { key: "discounts", label: "Discount", filter: true },
                { key: "NetSales", label: "Net sales", filter: true },

            ]}
            itemsPerPage={10}
            columnFilter
            sorter
            hover
            pagination
            // clickableRows
            // onRowClick={clickRow}
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
                                    disabled={
                                        item.role !== undefined && item.role !== null
                                            ? item.role["name"] !== undefined &&
                                                item.role["name"] !== null
                                                ? item.role["name"].toUpperCase() == "OWNER"
                                                : ""
                                            : ""
                                    }
                                />
                                <CLabel
                                    variant="custom-checkbox"
                                    htmlFor={`checkbox${item._id}`}
                                />
                            </CFormGroup>
                        </td>
                    );
                },
                GrossSales: (item) => {
                    return (
                        <td>
                            {typeof item.GrossSales !== "undefined" &&
                                item.GrossSales !== null ? new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }
                                ).format(Number(item.GrossSales))// '$100.00'
                                : new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }
                                ).format(0)}
                        </td>
                    );
                },
                Refunds: (item) => {
                    return (
                        <td>
                            {typeof item.Refunds !== "undefined" &&
                                item.Refunds !== null ? new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }
                                ).format(Number(item.Refunds))// '$100.00'
                                : new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }
                                ).format(0)}
                        </td>
                    );
                },
                discounts: (item) => {
                    return (
                        <td>
                            {typeof item.discounts !== "undefined" &&
                                item.discounts !== null ? new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }
                                ).format(Number(item.discounts))// '$100.00'
                                : new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }
                                ).format(0)}
                        </td>
                    );
                },
                NetSales: (item) => {
                    return (
                        <td>
                            {typeof item.NetSales !== "undefined" &&
                                item.NetSales !== null ? new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }
                                ).format(Number(item.NetSales))// '$100.00'
                                : new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }
                                ).format(0)}
                        </td>
                    );
                },
            }}
        />
    );
};

export default SalesEmployeeDatatable;