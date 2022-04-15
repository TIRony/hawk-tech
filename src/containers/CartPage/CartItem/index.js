import React, { useState } from "react";
import { generatePublicUrl } from "../../../urlConfig";
import "./style.css";
import { Alert, Button, message, Popconfirm } from 'antd';
import { loader } from "../../../components/MaterialUI";
import { useSelector } from "react-redux";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useLocation } from 'react-router-dom';

/**
 * @author
 * @function CartItem
 **/

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);
  const cart = useSelector((state) => state.cart);
  const { _id, name, price, img, quantity } = props.cartItem;
  const location = useLocation();
  // console.log("cartItemmmmmmmmmmmmmmmmmmmmmmmmmm");
  // console.log(props.cartItem);

  const warning = () => {
    message.warning('Out of stock !!');
  };
  const onQuantityIncrement = () => {
    if (qty >= quantity) {
      warning();
      return;
    };
    // if (qty == quantity) return;
    setQty(qty + 1);
    props.onQuantityInc(_id, qty + 1);
  };

  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    props.onQuantityDec(_id, qty - 1);
  };

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    props.onRemoveCartItem(_id);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={generatePublicUrl(img)} alt={""} />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>৳ {price}</p>
          </div>
          <div>Only {quantity} in stock</div>
          <div>Delivery within  3 - 5 days</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        {/* quantity control */}
        <div className="quantityControl">
          <Button.Group>
            <Button onClick={onQuantityDecrement} icon={<MinusOutlined />} />
            <input value={qty} readOnly />
            <Button onClick={onQuantityIncrement} icon={<PlusOutlined />} />
          </Button.Group>
        </div>
        {/* <div className="quantityControl">
          <button onClick={onQuantityDecrement}>-</button>
          <input value={qty} readOnly />
          <button onClick={onQuantityIncrement}>+</button>
        </div> */}
        {location.pathname == "/cart" ?
          <button className="cartActionBtn">save for later</button>
          :
          null
        }
        {location.pathname == "/cart" ?
          <Popconfirm
            title="Are you sure to remove this product?"
            visible={visible}
            // onConfirm={cart.loading ? loader() : handleOk}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            // okButtonProps={cart.loading && loader()}
            onCancel={handleCancel}
          >
            <button
              className="cartActionBtn"
              // onClick={() => props.onRemoveCartItem(_id)}
              onClick={showPopconfirm}
            >
              Remove
            </button>
          </Popconfirm>
          :
          null
        }
      </div>
    </div >
  );
};

export default CartItem;
