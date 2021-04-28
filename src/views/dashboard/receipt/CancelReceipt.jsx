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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { toggle_receipt_sideBar, cancel_receipt } from "../../../actions/reports/salesReceiptActions"
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment'
const CancelReceipt = props => {
    const show = useSelector(state => state.reports.salesReceiptReducer.show_receipt_detail)
    const sales_receipt_data = useSelector(state => state.reports.salesReceiptReducer.sales_receipt_data)
    const dispatch = useDispatch()
    const closeReceiptDetail = () => {
        dispatch(toggle_receipt_sideBar(false))
    }
    console.log('sales_receipt_data', sales_receipt_data)
    const cancelReceipt = () => {
        const data = {
            receipt_number: (sales_receipt_data || [])[0] !== undefined && (sales_receipt_data || [])[0] !== null ? (sales_receipt_data || [])[0].receipt_number : '',
            storeId: (sales_receipt_data || [])[0] !== undefined && (sales_receipt_data || [])[0] !== null ? (sales_receipt_data || [])[0].store !== undefined && (sales_receipt_data || [])[0].store !== null ? (sales_receipt_data || [])[0].store._id || '' : '' : '',
            cancelled_at: new Date()
        }
        console.log(data)
        // dispatch(cancel_receipt(data))
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

            <CNav variant='tabs' className='nav-underline nav-underline-primary ml-auto'>
                <CNavItem>
                    <CSidebarClose onClick={closeReceiptDetail} style={{ left: '0' }} />
                </CNavItem>
                <CNavItem>
                    <CDropdown
                        inNav
                        className="c-header-nav-item mx-2"
                    >
                        <CDropdownToggle className="c-header-nav-link" caret={false}>
                            <CIcon name="cil-options" />
                        </CDropdownToggle>
                        <CDropdownMenu placement="bottom-end" className="pt-0">
                            <CDropdownItem onClick={cancelReceipt}><CIcon name="cil-basket" className="mr-2" /> Cancel Receipt</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CNavItem>
            </CNav>
            {(sales_receipt_data || []).map((item, index) => (
                <CCard>
                    <CCardBody>
                        <CRow className="p-3">
                            <CCol sm="12" md="12" lg="12" style={{ textAlign: "center" }}>
                                <h2>{item.total_price !== undefined && item.total_price !== null ? item.total_price || '' : ''}</h2>
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
                                    <CCol sm="6" md="6" lg="6" style={{ textAlign: "left" }}>
                                        <h6><b>{ite.name}</b></h6>
                                        <span>{ite.quantity} x {ite.price}</span>
                                    </CCol>
                                    <CCol sm="6" md="6" lg="6" style={{ textAlign: "right" }}>
                                        <h6><b>{ite.total_price}</b></h6>
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
                                <h6><b>{item.total_price !== undefined && item.total_price !== null ? item.total_price || '' : ''}</b></h6>
                            </CCol>
                            <br />
                            <CCol sm="6" md="6" lg="6" style={{ textAlign: "left" }}>
                                <p>Card</p>
                            </CCol>
                            <CCol sm="6" md="6" lg="6" style={{ textAlign: "right" }}>
                                <p>{item.total_price !== undefined && item.total_price !== null ? item.total_price || '' : ''}</p>
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