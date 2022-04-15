import React from 'react'
import { Layout, Row, Col } from 'antd';
import info1 from "../../../images/logo/bd-map.png";
import info2 from "../../../images/logo/pc-build.png";
import info3 from "../../../images/logo/pc-testing.png";
import info4 from "../../../images/logo/support.png";
import info5 from "../../../images/logo/warrenty.png";
import "./style.css";

/**
* @author
* @function SupportInfoContainer
**/

const { Content } = Layout;

const SupportInfoContainer = (props) => {

  return (
    <Row>
      <div className="support_info_content">
      <Col xs={22} sm={12} md={12} lg={8} xl={8}>
          <div className="card">
            <img src={info2} />
            <div>
              <div className="card_header">
                <p className="price">100+ PC'S BUILD</p>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={22} sm={12} md={12} lg={8} xl={8}>
          <div className="card">
            <img src={info1} />
            <div>
              <div className="card_header">
                <p className="price">NATIONAL SHIPPING</p>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={22} sm={12} md={12} lg={8} xl={8}>
          <div className="card">
            <img src={info3} />
            <div>
              <div className="card_header">
                <p className="price">48 HRS OF TESTING PER PC</p>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={22} sm={12} md={12} lg={8} xl={8}>
          <div className="card">
            <img src={info5} />
            <div>
              <div className="card_header">
                <p className="price">TWO YEARS ONSITE WARRANTY</p>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={22} sm={12} md={12} lg={8} xl={8}>
          <div className="card">
            <img src={info4} />
            <div>
              <div className="card_header">
                <p className="price">LIFETIME TECHNICAL SUPPORT</p>
              </div>
            </div>
          </div>
        </Col>
      </div>
    </Row>
  )
}

export default SupportInfoContainer