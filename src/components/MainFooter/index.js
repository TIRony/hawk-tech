import React from 'react'
import { Layout, Row, Col, Card, Avatar } from 'antd';
import "./style.css";
import { HeartFilled, HeartTwoTone, HomeFilled, MailFilled, PhoneFilled } from '@ant-design/icons';

/**
* @author
* @function MainFooter
**/

const { Content } = Layout;

const MainFooter = (props) => {

  return (
    <section class="footer">

      <Row>
        <div className="footer_content">
          <Col xs={22} sm={12} md={12} lg={8} xl={8}>
            <div className="card">
              <Avatar size={64} icon={<PhoneFilled />} style={{ color: "#1890ff", backgroundColor: "white" }} />
              <div>
                <div className="card_header">
                  <p>Our Number</p>
                  <h1> +8801951265659 </h1>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={22} sm={12} md={12} lg={8} xl={8}>
            <div className="card">
              <Avatar size={64} icon={<MailFilled />} style={{ color: "#f83434", backgroundColor: "white" }} />
              <div>
                <div className="card_header">
                  <p>Our Mail</p>
                  <h1> rony120114@gmail.com </h1>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={22} sm={12} md={12} lg={8} xl={8}>
            <div className="card">
              <Avatar size={64} icon={<HomeFilled />} style={{ color: "#d4f834", backgroundColor: "white" }} />
              <div>
                <div className="card_header">
                  <p>Our Address</p>
                  <h1> uttara </h1>
                </div>
              </div>
            </div>
          </Col>

          <iframe
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14592.393303754105!2d90.386323!3d23.8861318!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c46b6de8f207%3A0x638eb6830d10167d!2sSector%2010%2C%20Dhaka%201230!5e0!3m2!1sen!2sbd!4v1634405334937!5m2!1sen!2sbd"
            width="400"
            height="300"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy">

          </iframe>
        </div>
      </Row>

      <section class="credit">Created with <HeartFilled style={{color:"red"}} /> by Hawk-Tech || All rights reserved !</section>
    </section>
  )
}

export default MainFooter