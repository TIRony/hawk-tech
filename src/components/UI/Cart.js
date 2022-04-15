import React from "react";
import { ShoppingFilled } from '@ant-design/icons';
import { Badge } from 'antd';

/**
 * @author
 * @function Cart
 **/

const Cart = (props) => {
  return (
    <div style={{ fontSize: "20px", position: "relative"}}>
      <Badge count={props.count} size="small">
        <ShoppingFilled style={{ fontSize: '22px', color:'white' }} />
      </Badge>
    </div>
  );
};

export default Cart;
