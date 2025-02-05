import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CToggler,
  CBreadcrumbRouter,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { TheHeaderDropdown } from "./index";
import {
  sidebarToggle,
  themeToggle,
  asideToggle,
  toggleSettingSideBar,
} from "../actions/settingsAction";
import { MdSettings } from "react-icons/md";
// routes config
import routes from "../routes";

const TheHeader = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const asideShow = useSelector((state) => state.settings.asideShow);
  const darkMode = useSelector((state) => state.settings.darkMode);
  const sidebarShow = useSelector((state) => state.settings.sidebarShow);
  const settingSideBarShow = useSelector(
    (state) => state.settings.settingSideBarShow
  );

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch(sidebarToggle(val));
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch(sidebarToggle(val));
  };
  const toggleSettingSidebarMobile = () => {
    const val = [false, "responsive"].includes(settingSideBarShow)
      ? true
      : "responsive";
    dispatch(toggleSettingSideBar(val));
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      {location.pathname.includes("settings") ? (
        <CToggler
          inHeader
          className="ml-md-3 d-lg-none"
          onClick={toggleSettingSidebarMobile}
          children={
            <>
              <MdSettings />
            </>
          }
        />
      ) : (
        ""
      )}
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        Dashboard
        {/* <CIcon name="logo" height="48" alt="Logo" /> */}
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={() => dispatch(themeToggle(!darkMode))}
          title="Toggle Light/Dark Mode"
        >
          <CIcon
            name="cil-moon"
            className="c-d-dark-none"
            alt="CoreUI Icons Moon"
          />
          <CIcon
            name="cil-sun"
            className="c-d-default-none"
            alt="CoreUI Icons Sun"
          />
        </CToggler>
        <TheHeaderDropdown />
        <CToggler
          inHeader
          className="d-md-down-none"
          onClick={() => dispatch(asideToggle(!asideShow))}
        >
          <CIcon className="mr-2" size="lg" name="cil-applications-settings" />
        </CToggler>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
