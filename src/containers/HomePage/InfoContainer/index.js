import React from 'react'
import { Layout, Row, Col } from 'antd';
import info1 from "../../../images/logo/info-icon-1.png";
import info2 from "../../../images/logo/info-icon-2.png";
import info3 from "../../../images/logo/info-icon-3.png";
import "./style.css";

/**
* @author
* @function InfoContainer
**/

const { Content } = Layout;

const InfoContainer = (props) => {

  return (
    <Row>
      <div className="info_content">
        <Col xs={22} sm={12} md={12} lg={8} xl={8}>
          <div className="card">
            <img src={info1} />
            <div>
              <div className="card_header">
                <p className="price">Fast Delivery</p>
                <h2>Within 30 Minutes</h2>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={22} sm={12} md={12} lg={8} xl={8}>
          <div className="card">
            <img src={info2} />
            <div>
              <div className="card_header">
                <p className="price">24/7 Available</p>
                <h2>Call Us Anytime</h2>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={22} sm={12} md={12} lg={8} xl={8}>
          <div className="card">
            <img src={info3} />
            <div>
              <div className="card_header">
                <p className="price">Easy Payments</p>
                <h2>Cash Or Credits</h2>
              </div>
            </div>
          </div>
        </Col>
      </div>
    </Row>
  )
}

export default InfoContainer