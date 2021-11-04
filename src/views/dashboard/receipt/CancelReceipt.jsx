import "./index.css"
import React, { useEffect, useState } from 'react'
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
    CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { toggle_receipt_sideBar, cancel_receipt } from "../../../actions/reports/salesReceiptActions"
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment'
import { confirmAlert } from "react-confirm-alert";
import { groupBy, sumBy } from 'lodash';
import authAxios from '../../../constants/authAxios'

const CancelReceipt = props => {
    const show = useSelector(state => state.reports.salesReceiptReducer.show_receipt_detail)
    const sales_receipt_data = useSelector(state => state.reports.salesReceiptReducer.sales_receipt_data)
    
    const dispatch = useDispatch()
    const closeReceiptDetail = () => {
        dispatch(toggle_receipt_sideBar(false))
    }

    const cancelReceiptFunc = () => {
        const type = sales_receipt_data?.[0]?.receipt_type
        if(type === "REFUND"){
            showAlert({
                button_text: "Disbale",
                heading: "Cancel receipt",
                section:
                  "Receipt will not be accounted in reports. Are you sure you want to continue?",
              });
        } else if(type === "SALE"){
            const data = {
                receipt_number: (sales_receipt_data || [])[0] !== undefined && (sales_receipt_data || [])[0] !== null ? (sales_receipt_data || [])[0].receipt_number : ''
            }
            // dispatch(check_if_refunded(data))
            authAxios({
                method: "GET",
                url: `sales/check/${data.receipt_number}`
        
              }).then(res => {
                if(res.data.refund){
                    showAlert({
                        button_text: "Disbale",
                        heading: "Cancel receipt",
                        section:
                          "Unable to cancel receipt that was fully or partially refunded. Please cancel refund receipt first: "+data.receipt_number,
                        refund: true
                      });
                } else {
                    showAlert({
                        button_text: "Disbale",
                        heading: "Cancel receipt",
                        section: <div>
                            <ul>
                                <li>Receipt will not be accounted in reports</li>
                                <li>Items will be returned to stock</li>
                            </ul>
                            Are you sure you want to continue?
                        </div>,
                         refund: false
                      });
                }
              }).catch(err => {
                  console.log(err.message)
              })
        }
        
    }
    const cancelReceiptConfirm = () => {
        const data = {
            receipt_number: (sales_receipt_data || [])[0] !== undefined && (sales_receipt_data || [])[0] !== null ? (sales_receipt_data || [])[0].receipt_number : '',
            storeId: (sales_receipt_data || [])[0] !== undefined && (sales_receipt_data || [])[0] !== null ? (sales_receipt_data || [])[0].store !== undefined && (sales_receipt_data || [])[0].store !== null ? (sales_receipt_data || [])[0].store._id || '' : '' : '',
            cancelled_at: new Date()
        }
        dispatch(cancel_receipt(data))
    }

    const showAlert = (param) => {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='custom-ui'>
                <h3>{param.heading}</h3>
                <p>{param.section}</p>
                <CRow>
                  <CCol sm xs="6" md="6" lg="6" className="text-center mt-3">
                    <CButton
                      color="secondary"
                      block
                      className="btn-pill pull-right"
                      outline="outline"
                      onClick={() => { onClose(); }}
                    >
                    {param.refund ? "OK" : "No"}
                    </CButton>
                  </CCol>
                  {param.refund ? "" :
                  <CCol sm xs="6" md="6" lg="6" className="text-center mt-3">
                    <CButton
                      color="danger"
                      block
                      className="btn-pill pull-right"
                      outline="outline"
                      onClick={() => {
                        cancelReceiptConfirm();
                        onClose();
                      }}
                    >
                      Yes
                    </CButton>
                  </CCol>
                    }
                </CRow>
              </div>
            );
          }
        });
    };
    const ShowTaxes = ({ items }) => {
        const taxes = []
        items.map(ite => ite.taxes.map(tax => taxes.push({
            _id: tax._id,
            title: tax.title +" "+ tax.tax_rate + "%",
            type: tax.tax_type == 'Included in the price' ? '(included)' : '',
            // price: parseFloat((tax.tax_rate/100)*ite.total_price).toFixed(2)
            price: parseFloat(tax.tax_total).toFixed(2)
        })))
        let group = groupBy(taxes,'_id')
        let keys = Object.keys(group)
        
        return keys.map(key => {
            return <>
                <CCol sm="8" md="8" lg="8" style={{ textAlign: "left" }}>
                    <p>{group[key][0].title} <span style={{color: 'gray'}}>{group[key][0].type}</span></p>
                </CCol>
                <CCol sm="4" md="4" lg="4" style={{ textAlign: "right" }}>
                    <p>{parseFloat(sumBy(group[key].map(p => parseFloat(p.price)))).toFixed(2)}</p>
                </CCol>
                </>
        })
    }
    const ShowPercentDiscounts = ({ items }) => {
        const discounts = []
        items.map(ite => ite.discounts.map(dis => discounts.push({
            _id: dis._id,
            title: dis.title,
            percent: dis.type == 'Percentage' ? dis.value+"%" : '',
            type: dis.type,
            // price: dis.type == 'Percentage' ? parseFloat((dis.value/100)*ite.total_price).toFixed(2) : parseFloat(dis.value).toFixed(2)
            price: parseFloat(dis.discount_total).toFixed(2)
        })))
        
        let group = groupBy(discounts,'_id')
        let keys = Object.keys(group)
        
        return keys.map(key => {
            return <>
                 <CCol sm="8" md="8" lg="8" style={{ textAlign: "left" }}>
                     <p>{group[key][0].title} {group[key][0].percent}</p>
                 </CCol>
                 <CCol sm="4" md="4" lg="4" style={{ textAlign: "right" }}>
                     <p>-{parseFloat(sumBy(group[key].map(p => parseFloat(p.price)))).toFixed(2)}</p>
                 </CCol>
                 </>
        })
    }
    const ShowAmountDiscounts = ({ receipt }) => {
        const discounts = []
        receipt.discounts.map(ite => discounts.push({
            _id: ite._id,
            title: ite.title,
            percent: ite.type == 'Percentage' ? ite.value+"%" : '',
            type: ite.type,
            price: parseFloat(ite.value).toFixed(2)
        }))
        
        let group = groupBy(discounts,'_id')
        let keys = Object.keys(group)
        
        return keys.map(key => {
            return <>
                 <CCol sm="8" md="8" lg="8" style={{ textAlign: "left" }}>
                     <p>{group[key][0].title} {group[key][0].percent}</p>
                 </CCol>
                 <CCol sm="4" md="4" lg="4" style={{ textAlign: "right" }}>
                     <p>-{parseFloat(sumBy(group[key].map(p => parseFloat(p.price)))).toFixed(2)}</p>
                 </CCol>
                 </>
        })
    }
    
    return (
        <CSidebar
            aside
            colorScheme='light'
            size='xl'
            unfoldable
            show={show}
            onShowChange={closeReceiptDetail}
            
        >

            <CNav variant='tabs' className='nav-underline nav-underline-primary ml-auto ' >
                <CNavItem>
                    <CSidebarClose onClick={closeReceiptDetail} style={{ left: '0' }} />
                </CNavItem>
                
                <CNavItem>
                    <CDropdown
                        inNav
                        className="c-header-nav-item mx-2"
                    >
                        <CDropdownToggle  caret={false}>
                        {sales_receipt_data?.[0]?.cancelled_at ? "" :
                            <CIcon name="cil-options" />
                        }
                        </CDropdownToggle>
                        {sales_receipt_data?.[0]?.cancelled_at ? "" :
                        <CDropdownMenu placement="bottom-end" className="pt-0">
                            <CDropdownItem onClick={cancelReceiptFunc}><CIcon name="cil-basket" className="mr-2" /> Cancel Receipt</CDropdownItem>
                        </CDropdownMenu>
                        }
                    </CDropdown>
                </CNavItem>
                
            </CNav>
            {(sales_receipt_data || []).map((item, index) => (
                <CCard style={{ overflowX: "hidden", overflowY: "scroll"}}>
                    <CCardBody>
                        <CRow className="p-3">
                            <CCol sm="12" md="12" lg="12" style={{ textAlign: "center" }}>
                                <h2>{parseFloat(item.total_price !== undefined && item.total_price !== null ? item.total_price || 0 : 0).toFixed(2)}</h2>
                                <h6>Total</h6>
                            </CCol>
                        </CRow>
                        <hr />
                        <CRow>
                            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
                                <h6>Cashier: {item.cashier !== undefined && item.cashier !== null ? item.cashier.name !== undefined && item.cashier.name !== null ? item.cashier.name || '' : '' : ''}</h6>
                                <h6>POS: {item.store !== undefined && item.store !== null ? item.store.name !== undefined && item.store.name !== null ? item.store.name || '' : '' : ''}</h6>
                            </CCol>
                        </CRow>
                        <hr />
                        <CRow>
                            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
                                <h6>Customer: {item.customer !== undefined && item.customer !== null ? item.customer.name !== undefined && item.customer.name !== null ? item.customer.name || '' : '' : ''}</h6>
                                <h6>{item.customer !== undefined && item.customer !== null ? item.customer.email !== undefined && item.customer.email !== null ? item.customer.email || '' : '' : ''}</h6>
                            </CCol>
                        </CRow>
                        <hr />
                        <CRow>
                            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
                                <h6><b>{item.dining_option !== undefined && item.dining_option !== null ? item.dining_option.name !== undefined && item.dining_option.name !== null ? item.dining_option.name || '' : '' : ''}</b></h6>
                            </CCol>
                        </CRow>
                        <hr />
                        <CRow>
                            {(item.items || []).map((ite) => (
                                <React.Fragment>
                                    <CCol sm="8" md="8" lg="8" style={{ textAlign: "left" }}>
                                        <h6><b>{ite.name}</b></h6>
                                        <span>{ite.quantity} x {parseFloat(ite.price).toFixed(2)}</span><br/>
                                        {(ite.modifiers || []).map(mod => {
                                            return (mod.options || []).map(op => {
                                                return <><span>+ {op.option_name} ({parseFloat(op.price*ite.quantity).toFixed(2)})</span><br/></>
                                            })
                                        })}
                                        <span><i>{ite.comment}</i></span>
                                        <br/><br/>
                                    </CCol>
                                    <CCol sm="4" md="4" lg="4" style={{ textAlign: "right" }}>
                                        <h6><b>{parseFloat(ite.total_price).toFixed(2)}</b></h6>
                                    </CCol>
                                </React.Fragment>
                            ))}
                            
                        </CRow>
                        <hr />
                        <CRow>
                            <ShowAmountDiscounts receipt={item} />
                            <ShowPercentDiscounts items={item.items} />
                        </CRow>
                        <hr />
                        <CRow>
                            <CCol sm="8" md="8" lg="8" style={{ textAlign: "left" }}>
                                <h6><b>Subtotal</b></h6>
                            </CCol>
                            <CCol sm="4" md="4" lg="4" style={{ textAlign: "right" }}>
                                <h6><b>{parseFloat(sumBy(item.items,'total_price') - parseFloat(item.total_discount)).toFixed(2)}</b></h6>
                            </CCol>
                        </CRow>
                        <CRow>
                            <ShowTaxes items={item.items}/>
                        </CRow>
                        <hr />
                        <CRow>
                            <CCol sm="6" md="6" lg="6" style={{ textAlign: "left" }}>
                                <h6><b>Total</b></h6>
                            </CCol>
                            <CCol sm="6" md="6" lg="6" style={{ textAlign: "right" }}>
                                <h6><b>{parseFloat(item.total_price !== undefined && item.total_price !== null ? item.total_price || 0 : 0).toFixed(2)}</b></h6>
                            </CCol>
                            <br />
                            <CCol sm="6" md="6" lg="6" style={{ textAlign: "left" }}>
                                <p>{item.payment_method}</p>
                            </CCol>
                            <CCol sm="6" md="6" lg="6" style={{ textAlign: "right" }}>
                                <p>{parseFloat(item.cash_received !== undefined && item.cash_received !== null ? item.cash_received || 0 : 0).toFixed(2)}</p>
                            </CCol>
                            
                            {item?.cash_return > 0 ? <>
                            <CCol sm="6" md="6" lg="6" style={{ textAlign: "left" }}>
                                <p>Change</p>
                            </CCol>
                            <CCol sm="6" md="6" lg="6" style={{ textAlign: "right" }}>
                                <p>{parseFloat(item.cash_return !== undefined && item.cash_return !== null ? item.cash_return || 0 : 0).toFixed(2)}</p>
                            </CCol>
                            </>
                            : ""}
                        </CRow>
                        <hr />
                        <CRow>
                            <CCol sm="6" md="6" lg="6" style={{ textAlign: "left" }}>
                                <h6><b>{moment(item.sale_timestamp).format('MMM Do YYYY, h:mm A')}</b></h6>
                            </CCol>
                            <CCol sm="6" md="6" lg="6" style={{ textAlign: "right" }}>
                                <h6><b>{item.receipt_number !== undefined && item.receipt_number !== null ? item.receipt_number || '' : ''}</b></h6>
                            </CCol>
                        </CRow>
                    </CCardBody>

                </CCard>

            ))}

        </CSidebar >
    )
}
export default CancelReceipt