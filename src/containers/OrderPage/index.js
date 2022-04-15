import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import LayoutHeader from "../../components/Layout";
import { IoIosArrowForward } from "react-icons/io";
import "./style.css";
import { Breed, empty, loaderPage } from "../../components/MaterialUI";
import { generatePublicUrl } from "../../urlConfig";
import { Layout, Card } from 'antd';
import { DropboxCircleFilled } from "@ant-design/icons";

const { Content } = Layout;
const { Meta } = Card;
/**
 * @author
 * @function OrderPage
 **/

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const orderDetails = useSelector((state) => state.user.orderDetails);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const orderList = user.orders.map((order) => {
    return order.items.map((item) => (
      <Card
        style={{ display: "block", margin: "10px" }}
        type="inner"
        title={item.productId.name}
        size={"small"}
        hoverable={"true"}
      >
        <Link
          to={`/order_details/${order._id}`}
          className="orderItemContainer"
        >
          <div className="orderImgContainer">
            <img
              className="orderImg"
              src={generatePublicUrl(item.productId.productPictures[0].img)}
            />
          </div>
          <div className="orderRow">
            {/* <div className="orderName">{item.productId.name}</div> */}
            <div className="orderPrice">
              {"("}
              {" "}
              {item.payablePrice}
              {"x"}
              {item.purchasedQty}
              {")"}
              {"="}
              {'৳'}
              {item.payablePrice * item.purchasedQty}
            </div>
            {/* <div>{order.paymentStatus}</div> */}
            <div>
              {order.orderStatus[3].isCompleted ?
                order.orderStatus[3].type :
                order.orderStatus[2].isCompleted ?
                  order.orderStatus[2].type :
                  order.orderStatus[1].isCompleted ?
                    order.orderStatus[1].type :
                    order.orderStatus[0].isCompleted ?
                      order.orderStatus[0].type :
                      null
              }
            </div>
          </div>
        </Link>
      </Card>
    ));
  })

  return (
    <LayoutHeader>
      <Layout className="site-layout-background" style={{ padding: '12px 0' }}>
        <Content>
          <div className="orderContainer">
            <Breed
              breed={[
                { name: "Home", href: "/" },
                { name: "My Account", href: "/account" },
                { name: "My Orders", href: "/account/orders" },
              ]}
              breedIcon={<IoIosArrowForward />}
            />
            {user.loading ?
              loaderPage()
              :
              <Card
                style={{ marginTop: 16 }}
                type="inner"
              >
                <Meta
                  avatar={<DropboxCircleFilled />}
                  title={"Your Orders"}
                  style={{
                    color: "green"
                  }}
                />
                {user.orders.length ?
                  orderList :
                  empty()
                }
              </Card>
            }
          </div>
        </Content>
      </Layout>
    </LayoutHeader >
  );
};

export default OrderPage;
