import React, { useState, useEffect } from "react";
import {
  CDataTable
} from "@coreui/react";
import ModifierIcon from '../../assets/icons/modifierIcon.svg'

const SalesModifierDatatableNew = (props) => {
  
  const [fields, setFields] = useState([]);
  const [fieldLength, setFieldLength] = useState(0);

  useEffect(() => {
    if(props.columns.length > 0){
      let result = props.columns.filter(itm => itm.isShow);
      setFieldLength(100/result.length)
      setFields(result)
    }
  },[props.columns])
  
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
      scopedSlots = {{
        'Modifier': (item)=>(
          <td style={{ borderRight: "1px solid #d8dbe0", width: fieldLength+"%" }}>
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
        'quantitySold': (item)=>(
          <td>
            <strong>{item.quantitySold}</strong>
          </td>
        ),
        'grossSales': (item)=>(
          <td>
            <strong>{item.grossSales}</strong>
          </td>
        ),
        'refundQuantitySold': (item)=>(
          <td>
            <strong>{item.refundQuantitySold}</strong>
          </td>
        ),
        'refundGrossSales': (item)=>(
          <td>
            <strong>{item.refundGrossSales}</strong>
          </td>
        ),
        'net_sales': (item)=>(
          <td>
            <strong>{parseFloat(item.grossSales - item.refundGrossSales).toFixed(2)}</strong>
          </td>
        ),
        'details':
            (item, index)=>{
              return (
                <table style={{width: "100%"}}>
                  <tbody>
                    {item.options.map((op) => {
                        return (<tr>
                          {fields.find(item => item.key == "Modifier")?.isShow ? 
                          <td style={{ width: fieldLength+"%", borderRight: "1px solid #d8dbe0", paddingLeft: "6%" }}><span>{op.Option}</span></td>
                          : "" }
                          {fields.find(item => item.key == "quantitySold")?.isShow ? 
                          <td style={{ width: fieldLength+"%" }}>{op.quantitySold}</td>
                          : "" }
                          {fields.find(item => item.key == "grossSales")?.isShow ? 
                          <td style={{ width: "16%" }}>{op.grossSales}</td>
                          : "" }
                          {fields.find(item => item.key == "refundQuantitySold")?.isShow ? 
                          <td style={{ width: fieldLength+"%" }}>{op.refundQuantitySold}</td>
                          : "" }
                          {fields.find(item => item.key == "refundGrossSales")?.isShow ? 
                          <td style={{ width: fieldLength+"%" }}>{op.refundGrossSales}</td>
                          : "" }
                          {fields.find(item => item.key == "net_sales")?.isShow ? 
                          <td style={{ width: fieldLength+"%" }}>{parseFloat(op.grossSales - op.refundGrossSales).toFixed(2)}</td>
                          : "" }
                          </tr>
                        )
                    })}
                    
                  </tbody>
                  </table>
            )
          }
      }}
    />
  );
};

export default SalesModifierDatatableNew;
