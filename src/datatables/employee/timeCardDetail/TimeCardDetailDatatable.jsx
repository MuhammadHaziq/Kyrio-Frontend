import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
    toggle_employee_single_select,
    toggle_employee_all_select,
    update_row_data,
} from "../../../actions/employee/employeeListActions";
import { useSelector, useDispatch } from "react-redux";

const TimeCardDetailDatatable = (props) => {
    const dispatch = useDispatch();

    const onRowSelect = (row, isSelected, e) => {
        // dispatch(toggle_employee_single_select(row));
        console.log(row);
    };

    const onSelectAll = (isSelected, rows) => {
        if (isSelected) {
            // dispatch(toggle_employee_all_select(true));
        } else {
            // dispatch(toggle_employee_all_select(false));
        }
    };

    const selectRowProp = {
        mode: "checkbox",
        onSelect: onRowSelect,
        onSelectAll: onSelectAll,
    };
    /**
     *
     *  Datatable functions End
     *
     ***/
    const options = {
        sizePerPageList: [
            {
                text: "5",
                value: 5,
            },
            {
                text: "10",
                value: 10,
            },
            {
                text: "All",
                value: props.timeCard_detail.length,
            },
        ],
        sizePerPage: 5,
        onRowClick: function (row) {
            console.log(row);
            // dispatch(update_row_data(row));
        },
    };
    return (
        <React.Fragment>
            <BootstrapTable
                data={props.timeCard_detail}
                version="4"
                hover={true}
                selectRow={selectRowProp}
                options={options}
                pagination={true}
            >
                <TableHeaderColumn
                    dataField="_id"
                    dataSort={true}
                    hidden={true}
                    isKey={true}
                >
                    Id
        </TableHeaderColumn>
                <TableHeaderColumn dataField="created_date" width="20%">
                    Date
        </TableHeaderColumn>
                <TableHeaderColumn dataField="event" width="20%">
                    Event
        </TableHeaderColumn>
                <TableHeaderColumn dataField="clockIn" width="20%">
                    Clock in
        </TableHeaderColumn>
                <TableHeaderColumn dataField="clockOut" dataSort={true} width="20%">
                    Clock out
        </TableHeaderColumn>
            </BootstrapTable>
        </React.Fragment>
    );
};

export default TimeCardDetailDatatable;