import React from "react";
import {
  CDataTable
} from "@coreui/react";
import Amount from "../../components/utils/Amount";

const SalesModifierDatatableNew = (props) => {

  return (
    <CDataTable
   itemsPerPageSelect
      items={props.sale_discount_summary}
      fields={[
        { key: "title", label: "Name", filter: true },
        {
          key: "applied",
          label: "Discounts applied",
          filter: true,
        },
        { key: "total", label: "Amount discounted", filter: true },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      outlined
      pagination
      scopedSlots={{
        'total': (item) => (
          <td>
            <strong><Amount value={item.total} /></strong>
          </td>
        ),
      }}
    />
  );
};

export default SalesModifierDatatableNew;
