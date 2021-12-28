import React, { useState, useEffect } from "react";
import {
  CDataTable,
  // CCollapse
} from "@coreui/react";
import ModifierIcon from '../../assets/icons/modifierIcon.svg'
import { useSelector } from "react-redux";
import Amount from "../../components/utils/Amount";

const SalesModifierDatatableNew = (props) => {

  const darkMode = useSelector((state) => state.settings.darkMode);
  // const [collapsed, setCollapsed] = React.useState(Array(props.sale_modifier_summary.length).fill(true));
  const [fields, setFields] = useState([]);
  const [fieldLength, setFieldLength] = useState(0);

  useEffect(() => {
    if (props.columns.length > 0) {
      let result = props.columns.filter(itm => itm.isShow);
      setFieldLength(100 / result.length)
      setFields(result)
    }
  }, [props.columns])
  

  // const onRowClick = (e,i) => {
  //   let shadow = collapsed;
  //   shadow[i] = !shadow[i];
  //   setCollapsed(shadow);
  // }
  return (
    <CDataTable
      itemsPerPageSelect
      items={props.sale_modifier_summary}
      fields={fields}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      outlined
      pagination
      // onRowClick={onRowClick}
      scopedSlots={{
        'Modifier': (item) => (
          <td style={{ borderRight: "1px solid #d8dbe0", width: fieldLength + "%" }}>
            <strong>
              <img
                src={ModifierIcon}
                className="c-sidebar-brand-full"
                alt="kyrio POS"
                style={{ width: "40px", height: "40px" }}
              />&nbsp;&nbsp;
              {item.Modifier}</strong>
          </td>
        ),
        'quantitySold': (item) => (
          <td>
            <strong>{item.quantitySold}</strong>
          </td>
        ),
        'grossSales': (item) => (
          <td>
            <strong>{<Amount value={item.grossSales} />}</strong>
          </td>
        ),
        'refundQuantitySold': (item) => (
          <td>
            <strong>{item.refundQuantitySold}</strong>
          </td>
        ),
        'refundGrossSales': (item) => (
          <td>
            <strong>{<Amount value={item.refundGrossSales} />}</strong>
          </td>
        ),
        'net_sales': (item) => (
          <td>
            <strong>{<Amount value={(item.grossSales - item.refundGrossSales)} />}</strong>
          </td>
        ),
        'details':
          (item, index) => {
            return (
              // <CCollapse show={collapsed[index]}>
                <table style={{ width: "100%", backgroundColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "#F5F5F5" }}>
                  <tbody>
                    {item.options.map((op) => {
                      return (<tr>
                        {fields.find(item => item.key == "Modifier")?.isShow ?
                          <td style={{ width: fieldLength + "%", paddingLeft: "6%" }}><span>{op.Option}</span></td>
                          : ""}
                        {fields.find(item => item.key == "quantitySold")?.isShow ?
                          <td style={{ width: fieldLength + "%" }}>{op.quantitySold}</td>
                          : ""}
                        {fields.find(item => item.key == "grossSales")?.isShow ?
                          <td style={{ width: "16%" }}>{<Amount value={op.grossSales} />}</td>
                          : ""}
                        {fields.find(item => item.key == "refundQuantitySold")?.isShow ?
                          <td style={{ width: fieldLength + "%" }}>{op.refundQuantitySold}</td>
                          : ""}
                        {fields.find(item => item.key == "refundGrossSales")?.isShow ?
                          <td style={{ width: fieldLength + "%" }}>{<Amount value={op.refundGrossSales} />}</td>
                          : ""}
                        {fields.find(item => item.key == "net_sales")?.isShow ?
                          <td style={{ width: fieldLength + "%" }}>{<Amount value={(op.grossSales - op.refundGrossSales)} />}</td>
                          : ""}
                      </tr>
                      )
                    })}

                  </tbody>
                </table>
              // </CCollapse>
            )
          }
      }}
    />
  );
};

export default SalesModifierDatatableNew;
