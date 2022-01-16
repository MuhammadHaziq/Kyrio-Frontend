import React from "react";
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CRow,
    CContainer,
} from "@coreui/react";
import {
    MdFilterNone,
} from "react-icons/md";

const CategroySplash = (props) => {
    const { buttonName, onClick, description, descriptionLink,
        title } = props
    return (
        <React.Fragment>
            <CRow className="justify-content-left">
                <CCol md="9" lg="9" xl="6">
                    <CCard>
                        <CCardBody className="p-2">
                            <CContainer className='text-center' style={{
                                width: "135px",
                                height: "135px",
                                borderRadius: "50px",
                                backgroundColor: "#f5f5f5",
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}>
                                <MdFilterNone style={{
                                    height: '50px',
                                    width: '50px',
                                    fill: '#9e9e9e',
                                    background: '#f5f5f5',
                                    marginLeft: "25px",
                                }} />

                            </CContainer>
                            <CContainer style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                flexWrap: "wrap"
                            }}>
                                <h2>{title}</h2>
                                <p>{description}<a href={descriptionLink} target="_blank" >Learn more</a></p>
                            </CContainer>
                            <CContainer style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                                <CCol sm="6" md="6" xl="xl" className="mb-sm-3 mb-xl-5 mb-md-4 mt-3 ">
                                    <CButton
                                        color="success"
                                        className="btn-square pull right"
                                        onClick={onClick}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            className="c-icon c-icon-sm"
                                            role="img"
                                        >
                                            <polygon
                                                fill="var(--ci-primary-color, currentColor)"
                                                points="440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240"
                                                className="ci-primary"
                                            ></polygon>
                                        </svg>
                                        {buttonName}
                                    </CButton>
                                </CCol>
                            </CContainer>
                        </CCardBody>

                    </CCard>

                </CCol>
            </CRow>
        </React.Fragment>
    );
};

export default CategroySplash;
