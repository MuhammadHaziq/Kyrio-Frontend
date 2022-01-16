import React from "react";
import {
    CButton,
    CCol,
    CContainer,
    CRow
} from "@coreui/react";
import PlusIcon from "../icons/PlusIcon";
import CategroyIcon from "../icons/CategroyIcon";
import DiscountIcon from "../icons/DiscountIcon";
import ModifierIcon from "../icons/ModifierIcon";
import ItemIcon from '../icons/ItemIcon'
const ItemSplash = (props) => {
    const { buttonName, onClick, description, descriptionLink,
        title, secondButton, secondClick } = props
    return (
        <React.Fragment>
            <CRow>
                <CContainer className='text-center' style={{
                    width: "135px",
                    height: "135px",
                    borderRadius: "70px",
                    backgroundColor: "#f5f5f5",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    {title === "Categories" && (<CategroyIcon />)}
                    {title === "Discounts" && (<DiscountIcon style={{
                        height: '50px',
                        width: '50px',
                        fill: '#9e9e9e',
                        background: '#f5f5f5',
                        marginLeft: "25px",
                    }} />)}
                    {title === "Item modifiers" && (<ModifierIcon style={{
                        height: '50px',
                        width: '50px',
                        fill: '#9e9e9e',
                        background: '#f5f5f5',
                        marginLeft: "25px",
                    }} />)}
                    {title === "Items" && (<ItemIcon style={{
                        height: '50px',
                        width: '50px',
                        fill: '#9e9e9e',
                        background: '#f5f5f5',
                        marginLeft: "25px",
                    }} />)}
                </CContainer>
                <CContainer style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                }}>
                    <h2>{title}</h2>
                    <p>{description}<a href={descriptionLink} target="_blank" >Learn more</a></p>
                </CContainer>
                <CContainer style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    textAlign: "center",
                }}>
                    <CCol sm="12" md="12" xl="xl" className="mb-sm-3 mb-xl-5 mb-md-4 mt-3 ">
                        <CButton
                            color="success"
                            className="btn-square pull right"
                            onClick={onClick}
                        >
                            <PlusIcon />
                            {buttonName}
                        </CButton>
                        {title === "Items" && (<CButton
                            color="default"
                            className="btn-square pull right ml-2"
                            onClick={secondClick}
                        >
                            {secondButton}
                        </CButton>)}
                    </CCol>
                </CContainer>
            </CRow>
        </React.Fragment >
    );
};

export default ItemSplash;
