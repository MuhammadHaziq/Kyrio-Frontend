import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CNavLink,
  CHeaderNavLink
} from '@coreui/react'
import { MdPerson, MdLock } from "react-icons/md"

const TheHeaderDropdown = () => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/avatar.png'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem>
          <MdPerson />
          <CHeaderNavLink to="/">Profile</CHeaderNavLink>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem>
          <MdLock /> 
          <CHeaderNavLink to="/login">Lock Account</CHeaderNavLink>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
