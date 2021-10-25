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
                                <h2>{parseFloat(item.total_price !== undefined && item.total_price !== null ? item.total_price || 0 : 0,2)}</h2>
                                <h6>Total</h6>
                            </CCol>
                        </CRow>
                        <hr />
                        <CRow>
                            <CCol sm="12" md="12" lg="12" style={{ textAlign: "left" }}>
                                <h6>Cashier: {item.cashier !== undefined && item.cashier !== null ? item.cashier.name !== undefined && item.cashier.name !== null ? item.cashier.name || '' : '' : ''}</h6>
                                <h6>POS:{item.store !== undefined && item.store !== null ? item.store.name !== undefined && item.store.name !== null ? item.store.name || '' : '' : ''}</h6>
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
                            {(item.items || []).map((ite, iteIndex) => (
                                <React.Fragment>
                                    <CCol sm="8" md="8" lg="8" style={{ textAlign: "left" }}>
                                        <h6><b>{ite.name}</b></h6>
                                        <span>{ite.quantity} x {ite.price}</span><br/>
                                        {ite.modifiers.map(mod => {
                                            return mod.options.map(op => {
                                                return <><span>+ {op.option_name} ({op.price})</span><br/></>
                                            })
                                        })}
                                        <br/>
                                    </CCol>
                                    <CCol sm="4" md="4" lg="4" style={{ textAlign: "right" }}>
                                        <h6><b>{parseFloat(ite.total_price,2)}</b></h6>
                                    </CCol>
                                    {(ite.taxes || []).length > 0 ? (<React.Fragment> <CCol sm="6" md="6" lg="6" style={{ textAlign: "left" }}>
                                        <p>Included In Price 10% (included)</p>
                                    </CCol>
                                        <CCol sm="6" md="6" lg="6" style={{ textAlign: "right" }}>
                                            <p>20</p>
                                        </CCol>
                                        <CCol sm="6" md="6" lg="6" style={{ textAlign: "left" }}>
                                            <p>Added In Price 10%</p>
                                        </CCol>
                                        <CCol sm="6" md="6" lg="6" style={{ textAlign: "right" }}>
                                            <p>20</p>
                                        </CCol></React.Fragment>) : null}

                                </React.Fragment>
                            ))}

                        </CRow>
                        <hr />
                        <CRow>
                            <CCol sm="6" md="6" lg="6" style={{ textAlign: "left" }}>
                                <h6><b>Total</b></h6>
                            </CCol>
                            <CCol sm="6" md="6" lg="6" style={{ textAlign: "right" }}>
                                <h6><b>{parseFloat(item.total_price !== undefined && item.total_price !== null ? item.total_price || 0 : 0,2)}</b></h6>
                            </CCol>
                            <br />
                            <CCol sm="6" md="6" lg="6" style={{ textAlign: "left" }}>
                                <p>{item.payment_method}</p>
                            </CCol>
                            <CCol sm="6" md="6" lg="6" style={{ textAlign: "right" }}>
                                <p>{parseFloat(item.total_price !== undefined && item.total_price !== null ? item.total_price || 0 : 0,2)}</p>
                            </CCol>
                        </CRow>
                        <hr />
                        <CRow>
                            <CCol sm="6" md="6" lg="6" style={{ textAlign: "left" }}>
                                <h6><b>{moment(new Date()).format('MMMM Do YYYY, h:mm a')}</b></h6>
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