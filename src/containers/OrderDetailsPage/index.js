import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../actions";
import LayoutHeader from "../../components/Layout";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";
import { Layout, Card, Steps } from "antd";
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  CarOutlined,
  SmileOutlined,
  CheckCircleTwoTone
} from "@ant-design/icons";
import { loaderPage } from "../../components/MaterialUI";

const { Step } = Steps;
const { Content } = Layout;

/**
 * @author
 * @function OrderDetails
 **/

const OrderDetailsPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const orderDetails = useSelector((state) => state.user.orderDetails);

  useEffect(() => {
    // console.log({ props });
    const payload = {
      orderId: props.match.params.orderId,
    };
    dispatch(getOrder(payload));
  }, []);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }
    return "";
  };

  const formatDate2 = (date) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (date) {
      const d = new Date(date);
      return `${d.getDate()} ${month[d.getMonth()]}, ${d.getFullYear()}`;
    }
  };

  if (!(orderDetails && orderDetails.address)) {
    return null;
  }

  const renerItems = () => {
    return (
      <Layout className="site-layout-background" style={{ padding: '12px 0' }}>
        <Content style={{ padding: '1px 12px' }}>
          <div
            style={{
              width: "100%",
              margin: "10px auto",
            }}
          >
            <Card
              style={{
                margin: "1px 0",
              }}
              type="inner"
              // title="Order Details"
              size="small"
            >
              <Content>
                <div className="delAdrContainer">
                  <div className="delAdrDetails">
                    <Card
                      type="inner"
                      title="Delivery Address"
                      size="small"
                    >
                      <div className="delName">{orderDetails.address.name}</div>
                      <div className="delAddress">{orderDetails.address.address}</div>
                      <div className="delPhoneNumber">
                        Phone number - +88{orderDetails.address.mobileNumber}
                      </div>
                    </Card>
                  </div>
                  <div className="delMoreActionContainer">
                    <Card
                      type="inner"
                      title="Delivery Address"
                      size="small"
                    >
                      <div className="delTitle">More Actions</div>
                      <div className="delName">Download Invoice</div>
                    </Card>
                  </div>
                </div>
              </Content>
            </Card>

            {orderDetails.items.map((item) => (
              <Card
                style={{ margin: "10px 0" }}
                type="inner"
                key="{item}"
                title={item.productId.name}
                size={"small"}
              >
                <div className="flexRow">
                  <div className="delItemImgContainer">
                    <img src={generatePublicUrl(item.productId.productPictures[0].img)} alt="" />
                  </div>
                  <div style={{ width: "70%", fontWeight: "500", fontSize: 14, padding: "30px" }}>
                    {"("}
                    {" "}
                    {item.payablePrice}
                    {"x"}
                    {item.purchasedQty}
                    {")"}
                    {" "}
                    {"="}
                    {" "}
                    {'৳'}
                    {" "}
                    {item.payablePrice * item.purchasedQty}
                  </div>
                </div>
                <Content>
                  <Steps direction="vertical" className="orderDetailsMobileVisible" >
                    <Step status={`${orderDetails.orderStatus[0].isCompleted ? "finish" : "process"}`} title={orderDetails.orderStatus[0].type} description={formatDate(orderDetails.orderStatus[0].date)} icon={<ShoppingCartOutlined />} />
                    <Step status={`${orderDetails.orderStatus[1].isCompleted ? "finish" : "wait"}`} title={orderDetails.orderStatus[1].type} description={formatDate(orderDetails.orderStatus[1].date)} icon={<ShoppingOutlined />} />
                    <Step status={`${orderDetails.orderStatus[2].isCompleted ? "finish" : "wait"}`} title={orderDetails.orderStatus[2].type} description={formatDate(orderDetails.orderStatus[2].date)} icon={<CarOutlined />} />
                    <Step status={`${orderDetails.orderStatus[3].isCompleted ? "finish" : "wait"}`} title={orderDetails.orderStatus[3].type} description={formatDate(orderDetails.orderStatus[3].date)} icon={<SmileOutlined />} />
                  </Steps>
                  <Steps className="orderDetailsMobileHidden" >
                    <Step status={`${orderDetails.orderStatus[0].isCompleted ? "finish" : "process"}`} title={orderDetails.orderStatus[0].type} description={formatDate(orderDetails.orderStatus[0].date)} icon={<ShoppingCartOutlined />} />
                    <Step status={`${orderDetails.orderStatus[1].isCompleted ? "finish" : "wait"}`} title={orderDetails.orderStatus[1].type} description={formatDate(orderDetails.orderStatus[1].date)} icon={<ShoppingOutlined />} />
                    <Step status={`${orderDetails.orderStatus[2].isCompleted ? "finish" : "wait"}`} title={orderDetails.orderStatus[2].type} description={formatDate(orderDetails.orderStatus[2].date)} icon={<CarOutlined />} />
                    <Step status={`${orderDetails.orderStatus[3].isCompleted ? "finish" : "wait"}`} title={orderDetails.orderStatus[3].type} description={formatDate(orderDetails.orderStatus[3].date)} icon={<SmileOutlined />} />
                  </Steps>
                </Content>
                <div style={{ fontWeight: "500", fontSize: 14, padding: "20px", textAlign: "end" }}>
                  {<CheckCircleTwoTone twoToneColor="#52c41a" style={{ paddingRight: "10px" }} />}
                  {orderDetails.orderStatus[3].isCompleted &&
                    `Delivered on ${formatDate2(orderDetails.orderStatus[3].date)}`}
                </div>
              </Card>
            ))}
          </div>
        </Content>
      </Layout>
    )
  }

  return (
    <LayoutHeader>
      {user.loading ? loaderPage() : renerItems()}
      {/* {renerItems()} */}
    </LayoutHeader>
  );
};

export default OrderDetailsPage;





// slhcshfsifisjfpesjiejiewjiw

{/* <div style={{ padding: "25px 50px" }}>
  <div className="orderTrack">
    {orderDetails.orderStatus.map((status) => (
      <div
        className={`orderStatus ${status.isCompleted ? "active" : ""
          }`}
      >
        <div
          className={`point ${status.isCompleted ? "active" : ""}`}
        ></div>
        <div className="orderInfo">
          <div className="status">{status.type}</div>
          <div className="date">{formatDate(status.date)}</div>
        </div>
      </div>
    ))}
  </div>
</div> */}

            // <Steps>
            //   <Step status="finish" title="Login" icon={<UserOutlined />} />
            //   <Step status="process" title="Verification" icon={<SolutionOutlined />} />
            //   <Step status="process" title="Pay" icon={<LoadingOutlined />} />
            //   <Step status="wait" title="Done" icon={<SmileOutlined />} />
            // </Steps>