import React, { useEffect, useState } from "react";
import "./style.css";
import 'antd/dist/antd.css';
import logo from "../../images/logo/logo.png";
import {
  MaterialInput,
  MaterialButton,
  DropdownMenu,
  DropdownMenuForMobile,
  loader,
} from "../MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, login, signout, signup as _signup } from "../../actions";
import Cart from "../UI/Cart";
import { Link } from "react-router-dom";
import SearchFeature from "./SearchFeature";
import { Modal, Layout, Drawer, Alert, notification, Menu, Avatar, Badge, Collapse, Card, Progress } from 'antd';
import { BarsOutlined, CaretRightOutlined, CheckCircleTwoTone, DownCircleTwoTone, ExclamationCircleOutlined, HeartTwoTone, MessageTwoTone, NotificationTwoTone, PhoneTwoTone, RocketTwoTone, SmileTwoTone } from '@ant-design/icons';
import { generatePublicUrl } from "../../urlConfig";

const { SubMenu } = Menu;
const { Content } = Layout;
const { Panel } = Collapse;
const { Meta } = Card;

/**
 * @author
 * @function Headerr
 **/

const Headerr = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // state cart value
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const userSignup = () => {
    const user = { firstName, lastName, email, password };
    if (firstName === "" || lastName === "" || email === "" || password === "") {
      return (
        // message.warning('This is a warning message'),
        notification.open({
          message: 'Data required to Register',
          icon: <ExclamationCircleOutlined style={{ color: "red" }} />,
        })
      );
    }
    dispatch(_signup(user));
  };

  const userLoginValidate = () => {
    if (email === "" || password === "") {
      return (
        notification.open({
          message: 'Email or Password is required to Login',
          icon: <ExclamationCircleOutlined style={{ color: "red" }} />,
        })
      );
    }
    dispatch(login({ email, password }));
  };

  const userLogin = () => {
    if (signup) {
      userSignup();
    } else {
      userLoginValidate();
    }
  };

  const usersignout = () => {
    if (signup) {
      setLoginModal(true);
      setSignup(false);
    } else if (loginModal) {
      setSignup(true);
    }
  };

  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
      dispatch(getOrders());
    }
  }, [auth.authenticate]);

  // useEffect(() => {
  //   dispatch(getCartItems());
  // }, []);

  //For PC//
  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={<a className="fullName">{auth.user.fullName}</a>}
        menus={[
          { label: "My Profile", href: "", icon: <SmileTwoTone /> },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
          },
          { label: "Wishlist", href: "", icon: <HeartTwoTone twoToneColor="#eb2f96" /> },
          { label: "My Chats", href: "", icon: <MessageTwoTone /> },
          { label: "Logout", href: "", icon: <RocketTwoTone twoToneColor="#eb2f96" />, onClick: logout },
        ]}
      />
    );
  };
  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className="loginButton"
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
          >
            {/* Login */}

            <div className='cont'>
              <button className='button'>
                <div className='blob'>
                  <svg
                    viewBox='0 0 20 20'
                  >
                    <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>

                  </svg>
                </div>
                <div className='lineLogin'></div>
                <div className='textLogin'>
                  <p>L</p>
                  <p>O</p>
                  <p>G</p>
                  <p>&nbsp;&nbsp;</p>
                  <p>I</p>
                  <p>N</p>
                </div>
              </button>
            </div>
          </a>

        }
        menus={[
          { label: "My Profile", href: "", icon: <SmileTwoTone /> },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
            onClick: () => {
              !auth.authenticate && setLoginModal(true);
            },
          },
          { label: "Wishlist", href: "", icon: <HeartTwoTone twoToneColor="#eb2f96" /> },
          { label: "My Chats", href: "", icon: <MessageTwoTone /> },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{ color: "#2874f0" }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    );
  };

  // For Mobile //
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const renderLoggedInMenuForMobile = () => {
    return (
      <>
        <a
          className="fullName"
          type="primary"
          onClick={showDrawer}
        >
          {auth.user.fullName}
        </a>
        <Drawer
          title={auth.user.fullName + "'s Account"}
          placement="bottom"
          onClose={onClose}
          visible={visible}
          height="85%"
        >
          <DropdownMenuForMobile
            menus={[
              { label: "My Profile", href: "", icon: <SmileTwoTone /> },
              {
                label: "Orders",
                href: `/account/orders`,
                icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
              },
              { label: "Wishlist", href: "", icon: <HeartTwoTone twoToneColor="#eb2f96" /> },
              { label: "My Chats", href: "", icon: <MessageTwoTone /> },
              { label: "Logout", href: "", icon: <RocketTwoTone twoToneColor="#eb2f96" />, onClick: logout },
            ]}
          />
        </Drawer>
      </>
    );
  };
  const renderNonLoggedInMenuForMobile = () => {
    return (
      <>
        <a
          className="loginButton"
          onClick={() => {
            setSignup(false);
            setLoginModal(true);
          }}
        >
          {/* Login */}

          <div className='cont'>
            <button className='button'>
              <div className='blob'>
                <svg
                  viewBox='0 0 20 20'
                >
                  <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>

                </svg>
              </div>
              <div className='lineLogin'></div>
              <div className='textLogin'>
                <p>L</p>
                <p>O</p>
                <p>G</p>
                <p>&nbsp;&nbsp;</p>
                <p>I</p>
                <p>N</p>
              </div>
            </button>
          </div>
        </a>
      </>
    );
  };
  //............. notification start
  let process = 0;
  let processStatus = "active";
  let orderCount = Object.keys(user.orders).length;

  const notificationList = user.orders.map((order) => {
    if (order.orderStatus[3].isCompleted) {
      orderCount = orderCount - 1;
      process = 100;
      processStatus = "success";
    }
    else if (order.orderStatus[2].isCompleted) {
      process = 75;
      processStatus = "active"
    }
    else if (order.orderStatus[1].isCompleted) {
      process = 50;
      processStatus = "active"
    }
    else {
      process = 25;
      processStatus = "active"
    }
    return order.items.map((item) => (
      <Card
        hoverable
        style={{ marginLeft: "-24px", marginRight: "-24px", backgroundColor: "#f7fff7" }}
      >
        <Link
          to={`/order_details/${order._id}`}
          className="orderItemContainer"
        >
          <Meta
            avatar={<Avatar src={generatePublicUrl(item.productId.productPictures[0].img)} />}
            title={item.productId.name}
            description={order.orderStatus[3].isCompleted ?
              "Your order has been successfully " + order.orderStatus[3].type :
              order.orderStatus[2].isCompleted ?
                "Your order has been successfully " + order.orderStatus[2].type :
                order.orderStatus[1].isCompleted ?
                  "Your order has been successfully " + order.orderStatus[1].type :
                  order.orderStatus[0].isCompleted ?
                    "Your order has been successfully " + order.orderStatus[0].type :
                    null
            }
          />
          <Progress
            style={{ paddingTop: "10px" }}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            percent={process}
            status={processStatus}
          />
        </Link>
      </Card>
    ));
  })

  const [moreVisibleMobile, setmoreVisibleMobile] = useState(false);
  const showDrawerMoreMobile = () => {
    setmoreVisibleMobile(true);
  };

  const onCloseMoreMobile = () => {
    setmoreVisibleMobile(false);
  };
  const renderMoreForMobile = () => {
    return (
      <>
        <a className="more"
          type="primary"
          onClick={showDrawerMoreMobile}
        >
          <Badge
            count={orderCount}
            overflowCount={10}
            size="small"
            style={{ backgroundColor: '#108ee9' }}
          >
            <BarsOutlined style={{ fontSize: '22px', color: "white" }} />
          </Badge>
        </a>
        <Drawer
          title="More"
          placement="bottom"
          onClose={onCloseMoreMobile}
          visible={moreVisibleMobile}
          height="85%"
        >
          <Badge
            count={orderCount}
            overflowCount={10}
            style={{ display: "list-item" }}
          >
            <Collapse
              expandIconPosition='left'
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              ghost
            >
              <Panel
                style={{ fontSize: "15px" }}
                header={"Notification"}
                extra={<NotificationTwoTone style={{ fontSize: '22px' }} />}
              >
                <Content
                  style={{ display: "flex", flexDirection: "column-reverse" }}
                >
                  {notificationList}
                </Content>
              </Panel>
            </Collapse>
          </Badge>
          <DropdownMenuForMobile
            menus={[
              { label: "24x7 Customer Care", href: "", icon: <PhoneTwoTone twoToneColor="#03ac44" /> },
              { label: "Download App", href: "", icon: <DownCircleTwoTone twoToneColor="#eb2f96" /> },
            ]}
          />
        </Drawer>
      </>
    );
  };


  const [moreVisible, setmoreVisible] = useState(false);
  const showDrawerMore = () => {
    setmoreVisible(true);
  };

  const onCloseMore = () => {
    setmoreVisible(false);
  };
  const renderMore = () => {
    return (
      <>
        <a className="more"
          type="primary"
          onClick={showDrawerMore}
        >
          <Badge
            count={orderCount}
            overflowCount={10}
            size="small"
            style={{ backgroundColor: '#108ee9' }}
          >
            {/* <span>More &nbsp;</span> */}
            <BarsOutlined style={{ fontSize: '20px', paddingBottom: "10px", color: "white" }} />
          </Badge>
        </a>
        <Drawer
          title="More"
          placement="right"
          onClose={onCloseMore}
          visible={moreVisible}
          width="22%"
        >
          <Badge
            count={orderCount}
            overflowCount={10}
            style={{ display: "list-item" }}
          >
            <Collapse
              expandIconPosition='left'
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              ghost
            >
              <Panel
                style={{ fontSize: "15px" }}
                header={"Notification"}
                extra={<NotificationTwoTone style={{ fontSize: '22px' }} />}
              >
                <Content
                  style={{ display: "flex", flexDirection: "column-reverse" }}
                >
                  {/* {notificationList} */}
                  {auth.authenticate ? notificationList : null}
                </Content>
              </Panel>
            </Collapse>
          </Badge>
          <DropdownMenuForMobile
            menus={[
              { label: "24x7 Customer Care", href: "", icon: <PhoneTwoTone twoToneColor="#03ac44" /> },
              { label: "Download App", href: "", icon: <DownCircleTwoTone twoToneColor="#eb2f96" /> },
            ]}
          />
        </Drawer>
      </>
    );
  };


  const handleOk = () => {
    setLoginModal(false);
  };

  const handleCancel = () => {
    setLoginModal(false);
  };

  return (
    <Content>
      <div className="header">
        <Modal
          visible={loginModal}
          title={signup ? "Register here" : "Login here"}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
          width={400}
          footer={[

          ]}
        >
          <div className="authContainer">
            <div className="row">
              {/* <div className="leftspace">
              <h2>Login</h2>
              <p>Get Your Dream PC!</p>
            </div> */}
              <div className="rightspace">
                <div className="loginInputContainer">
                  {auth.error && (
                    // <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
                    <Alert
                      message={auth.error}
                      type="error"
                      showIcon

                    />
                  )}
                  {signup && (
                    <MaterialInput
                      type="text"
                      label="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  )}
                  {signup && (
                    <MaterialInput
                      type="text"
                      label="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  )}

                  <MaterialInput
                    type="text"
                    label="Email/Mobile Number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MaterialInput
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  // rightElement={<a href="#">Forgot?</a>}
                  />
                  <MaterialButton
                    title={signup ? "Register" : "Login"}
                    // icon= {<DownCircleTwoTone/>}
                    loading={auth.loading && loader()}
                    bgColor="#1890ff"
                    textColor="#ffffff"
                    style={{
                      margin: "40px 0 20px 0",
                    }}
                    onClick={userLogin}
                  />
                  <p style={{ textAlign: "center" }}>OR</p>
                  <MaterialButton
                    title={signup ? "Login" : "Register"}
                    bgColor="#03ac44"
                    textColor="#ffffff"
                    style={{
                      margin: "20px 0",
                    }}
                    onClick={usersignout}
                  // onClick={() => {
                  //   setLoginModal(true);
                  //   setSignup(true);
                  // }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <div className="subHeader">
          {/* Logo  */}
          <Link
            className="logo"
            to={`/`}
          >
            <img src={logo} className="logoimage" alt="" />
          </Link>
          {/* logo ends here */}

          {/* right side menu */}
          <div className="rightMenu">
            {/* search component */}
            <div>
              <SearchFeature />
            </div>
            {/* search component ends here */}

            <div className="loginMobileHidden">
              {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
              {renderMore()}
              {/* <DropdownMenu
                menu={
                  <a className="more">
                    <span>More &nbsp;</span>
                    <BarsOutlined style={{ fontSize: '16px' }} />
                  </a>
                }
                menus={[
                  { label: "Notification Preference", href: "", icon: <NotificationTwoTone /> },
                  { label: "24x7 Customer Care", href: "", icon: <PhoneTwoTone twoToneColor="#03ac44" /> },
                  { label: "Download App", href: "", icon: <DownCircleTwoTone twoToneColor="#eb2f96" /> },
                ]}
              /> */}
            </div>
            <div className="loginMobileVisible">
              {auth.authenticate ? renderLoggedInMenuForMobile() : renderNonLoggedInMenuForMobile()}
              {renderMoreForMobile()}
            </div>
            <div>
              <Link to="/cart" className="cart">
                <Cart count={Object.keys(cart.cartItems).length} />
              </Link>
            </div>
          </div>
          {/* right side menu ends here */}
        </div>
      </div>
    </Content>
  );
};

export default Headerr;
