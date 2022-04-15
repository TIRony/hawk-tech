import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutHeader from "../../components/Layout";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import { addToCart, getCartItems, removeCartItem } from "../../actions";
import PriceDetails from "../../components/PriceDetails";
import "./style.css";
import { MaterialButton } from "../../components/MaterialUI";

import { Layout, notification } from 'antd';
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Content } = Layout;

/**
 * @author
 * @function CartPage
 **/

/*
Before Login
Add product to cart
save in localStorage
when try to checkout ask for credentials and 
if logged in then add products to users cart database from localStorage


*/

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  // console.log("caaaaaaaart");
  // console.log(cart);
  const auth = useSelector((state) => state.auth);
  // const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    //console.log({_id, qty});
    const { name, price, img, quantity } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img, quantity }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img, quantity } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img, quantity }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            key={index}
            cartItem={cartItems[key]}
            onQuantityInc={onQuantityIncrement}
            onQuantityDec={onQuantityDecrement}
            onRemoveCartItem={onRemoveCartItem}
          />
        ))}
      </>
    );
  }

  return (
    <LayoutHeader>
      <Layout className="site-layout-background" style={{ padding: '12px 0' }}>
        <div className="cartContainer">
          <Content style={{ padding: '1px 12px' }}>
            <Card
              headerLeft={`My Cart`}
              headerRight={<div>Deliver to</div>}
              style={{ width: "100%", overflow: "hidden" }}
            >
              {Object.keys(cartItems).map((key, index) => (
                <CartItem
                  key={index}
                  cartItem={cartItems[key]}
                  onQuantityInc={onQuantityIncrement}
                  onQuantityDec={onQuantityDecrement}
                  onRemoveCartItem={onRemoveCartItem}
                />
              ))}

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  background: "#ffffff",
                  justifyContent: "flex-end",
                  boxShadow: "0 0 10px 10px #eee",
                  padding: "10px 0",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ width: "250px" }}>
                  <MaterialButton
                    title="PLACE ORDER"
                    onClick={() => Object.keys(cartItems).length ? props.history.push(`/checkout`) :
                      notification.open({
                        message: 'You need to add someting to cart for place an order !',
                        icon: <ExclamationCircleOutlined style={{ color: "orange" }} />,
                      })}
                  />
                </div>
              </div>
            </Card>
          </Content>
          <Content style={{ padding: '1px 12px' }}>
            <PriceDetails
              totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                const { quantity } = cart.cartItems[key];
                
                qty = qty + cart.cartItems[key].qty;
                if (qty > quantity) {
                  qty = quantity;
                }
                return qty;
              }, 0)}
              totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                const { price, qty } = cart.cartItems[key];
                return totalPrice + price * qty;
              }, 0)}
            />
          </Content>
        </div>
      </Layout>
    </LayoutHeader>
  );
};

export default CartPage;
