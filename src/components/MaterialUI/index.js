import React, { useEffect, useState } from "react";
import "./style.css";
import { BackTop, Layout, Empty, Avatar, Space, Spin, message, notification, Skeleton } from 'antd';
import { DribbbleOutlined, ExclamationCircleOutlined, LoadingOutlined, UpCircleFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Content } = Layout;

/**
 * @author
 * @function
 **/

const MaterialInput = (props) => {
  const [focus, setFocus] = useState(props.value === "" ? false : true);
  const [touch, setTouch] = useState(false);

  return (
    <Content>
      <div className="materialInput">
        <label
          className={`label ${focus ? "focus" : ""}`}
          style={{
            top: 0,
            lineHeight: "none",
          }}
        >
          {props.label && `Enter ${props.label}`}
        </label>
        <div
          style={{
            display: "flex",
          }}
        >
          <input
            className="input"
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            onFocus={(e) => {
              setFocus(true);
              setTouch(true);
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                setFocus(false);
              } else {
                setTouch(false);
              }
            }}
          />
          {props.rightElement ? props.rightElement : null}
        </div>
        {touch && (
          <div
            style={{
              fontSize: "10px",
              color: "red",
              fontWeight: 500,
            }}
          >
            {`${props.label} is Required`}
          </div>
          // notification.open({
          //   message: `${props.label}`,
          //   icon: <ExclamationCircleOutlined style={{ color: "red" }} />,
          // })
        )}
      </div>
    </Content>
  );
};

const MaterialButton = (props) => {
  const onClick = () => {
    props.onClick && props.onClick();
  };
  return (
    <div
      style={{
        width: "100%",
        ...props.style,
      }}
    >
      <button
        className="materialButton"
        style={{
          backgroundColor: props.bgColor,
          color: props.textColor,
          fontSize: props.fontSize,
        }}
        onClick={onClick}
      >
        {props.icon && props.icon}
        {props.title && props.title}
        <div style={{ position: "relative", float: "right" }}>{props.loading && props.loading}</div>
      </button>
    </div>
  );
};

const DropdownMenu = (props) => {
  return (
    <div className="headerDropdownContainer">
      {props.menu}
      <div className="dropdown">
        <div className="upArrow"></div>
        {props.firstMenu}
        <ul className="headerDropdownMenu">
          {props.menus &&
            props.menus.map((item, index) => (
              <li key={index}>
                <Link
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick && item.onClick();
                    }
                  }}
                  to={`${item.href}`}
                >
                  <Space size="large">
                    <Avatar size="large" style={{ backgroundColor: 'white' }} icon={item.icon} />
                    {item.label}
                  </Space>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

const DropdownMenuForMobile = (props) => {
  return (
    <ul className="headerDropdownMenu">
      {props.menus &&
        props.menus.map((item, index) => (
          <li key={index}>
            <Link
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick && item.onClick();
                }
              }}
              to={`${item.href}`}
            >
              <Space size="large">
                <Avatar size="large" style={{ backgroundColor: 'white' }} icon={item.icon} />
                {item.label}
              </Space>
            </Link>
          </li>
        ))}
    </ul>
  );
};

const Anchor = (props) => {
  return (
    <button {...props} className="anchorButton">
      {props.name}
    </button>
  );
};

const Breed = (props) => {
  return (
    <div className="breed">
      <ul>
        {props.breed &&
          props.breed.map((item, index) => (
            <li key={index}>
              <Link to={item.href}>{item.name}</Link>
              {props.breedIcon}
            </li>
          ))}
      </ul>
    </div>
  );
};

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#03ac44',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
const backToTop = () => {
  return (
    <BackTop style={{paddingTop:"30px", paddingLeft:"10px"}}>
      <UpCircleFilled style={style} />
    </BackTop>
  );
};

const empty = () => {

  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <span>
          No product, Buy <Link to="/AllProducts">Something</Link>
        </span>
      }
    />
  );
};
const emptyProduct = () => {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      imageStyle={{
        height: 320,
      }}
      description={
        <span>
          No product here, Buy from <Link to="/AllProducts">Store</Link>
        </span>
      } />
  );
}


const loader = () => {
  const antIcon = <DribbbleOutlined style={{ fontSize: 20, color: "orange" }} spin />;
  return (
    <Spin indicator={antIcon} />
    // console.log("loaaaaaaaaaaaaaaading")
  );
}

const loaderPage = () => {
  const antIcon = <DribbbleOutlined className="loaderPage" spin />;
  return (
    <Spin indicator={antIcon} />
  );
};

const skletonPage = () => {
  return (
    <Skeleton active paragraph={{ rows: 5 }}/>
  );
};
export { MaterialInput, MaterialButton, DropdownMenu, Anchor, Breed, backToTop, empty, emptyProduct, DropdownMenuForMobile, loader, loaderPage, skletonPage };
