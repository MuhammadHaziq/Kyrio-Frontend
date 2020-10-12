import React, {useState, useEffect} from 'react'
import {
  CRow,
  CCol,
  CCard,
  CNavLink,
  CCardHeader,
  CCardBody,
  CProgress,
  CTabContent,
  CTabPane,
  CTabs,
  CNavItem,
  CNav
} from "@coreui/react"
import Charts from  "../charts/chart"
// import ApexCharts from 'apexcharts'

const Dashboard = () => {

  const [active, setActive] = useState(1)
  
  return (
    
    <React.Fragment>
      <CRow>
      <CCol xs="12" sm="12">
      <CTabs>
          <CCard>
            <CCardHeader>
            <CRow className="text-center">
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    <CCol md sm="12" className="mb-sm-2 mb-0">
                      <div>Gross sales</div>
                      <h4>11,570</h4>
                      <strong>+11,570 (+100%)</strong>
                      <CProgress
                        className="progress-xs mt-2"
                        precision={1}
                        color="success"
                        value={40}
                      />
                    </CCol>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CCol md sm="12" className="mb-sm-2 mb-0">
                      <div >Refunds</div>
                      <h4>8,900</h4>
                      <strong>+8,900 (+100%)</strong>
                      <CProgress
                        className="progress-xs mt-2"
                        precision={1}
                        color="danger"
                        value={100}
                      />
                    </CCol>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CCol md sm="12" className="mb-sm-2 mb-0">
                      <div >Discounts</div>
                      <h4>0</h4>
                      <strong>+0 (0%)</strong>
                      <CProgress
                        className="progress-xs mt-2"
                        precision={1}
                        color="info"
                        value={100}
                      />
                    </CCol>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CCol md sm="12" className="mb-sm-2 mb-0">
                      <div >Net sales</div>
                      <h4>2,670</h4>
                      <strong>+2,670 (+100%)</strong>
                      <CProgress
                        className="progress-xs mt-2"
                        precision={1}
                        color="primary"
                        value={100}
                      />
                    </CCol>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CCol md sm="12" className="mb-sm-2 mb-0">
                      <div >Gross profit</div>
                      <h4>970</h4>
                      <strong>+970 (+100%)</strong>
                      <CProgress
                        className="progress-xs mt-2"
                        precision={1}
                        color="warning"
                        value={100}
                      />
                    </CCol>
                  </CNavLink>
                </CNavItem>
              </CNav>
              </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow>
                <CTabContent>
                <CTabPane>
                <Charts type="area" />
                </CTabPane>
                <CTabPane>
                <Charts type="bar" />
                </CTabPane>
                <CTabPane>
                <Charts type="line" />
                </CTabPane>
                <CTabPane>
                <Charts type="area" />
                </CTabPane>
                <CTabPane>
                <Charts type="bar" />
                </CTabPane>
              </CTabContent>
                  
                </CRow>
              </CCardBody>
            </CCard>
          </CTabs>
    </CCol>
    </CRow>
    </React.Fragment>
  )
}

export default Dashboard
