import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  CSidebar,
  CSidebarClose
} from '@coreui/react'
import { asideToggle } from "../actions/settingsAction";

const TheAside = () => {
  const show = useSelector(state => state.settings.asideShow)
  const dispatch = useDispatch()
  // const setState = (state) => dispatch({type: 'set', asideShow: state})
  const setState = (state) => dispatch(asideToggle(state))

  return (
    <CSidebar
      aside
      colorScheme='light'
      size='lg'
      overlaid
      show={show}
      onShowChange={(state) => setState(state)}
    >
      <CSidebarClose onClick={() => setState(false) } />
      {/*aside content*/}
      <div className="nav-underline">
        <div className="nav nav-tabs">
          <div className="nav-item">
            <div className="nav-link">Aside</div>
          </div>
        </div>
      </div>
    </CSidebar>
  )
}

export default React.memo(TheAside)
