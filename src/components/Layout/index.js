import React from 'react';
import Headerr from '../Header';
import MenuHeader from '../MenuHeader';

/**
* @author
* @function CLayout
**/

const CLayout = (props) => {
  return (
    <>
      <Headerr />
      <MenuHeader />
      {props.children}
    </>
  )
}

export default CLayout