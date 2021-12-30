import React from "react";
import {
  CDataTable
} from "@coreui/react";
import Amount from "../../components/utils/Amount";

const SalesTaxDatatableNew = (props) => {
  return (
    <CDataTable
   itemsPerPageSelect
      items={props.taxes_sales_summary}
      fields={[
        { key: "title", label: "Tax name", filter: true },
        {
          key: "tax_rate",
          label: "Tax rate",
          filter: true,
        },
        { key: "taxableSale", label: "Taxable sales", filter: true },
        { key: "taxAmount", label: "Tax amount", filter: true },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      outlined
      pagination
      scopedSlots={{
        'taxableSale': (item) => (
          <td>
            <strong><Amount value={item.taxableSale} /></strong>
          </td>
        ),
        'taxAmount': (item) => (
          <td>
            <strong><Amount value={item.taxAmount} /></strong>
          </td>
        ),
      }}
    />
  );
};

export default SalesTaxDatatableNew;
