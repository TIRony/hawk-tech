import React from 'react'
import { Layout, Row, Col, Card } from 'antd';
import "./style.css";
import { Link } from 'react-router-dom';

const { Meta } = Card;

/**
* @author
* @function PCCategoryList
**/

const { Content } = Layout;

const PCCategoryList = (props) => {

  return (
    <Card title="PC's">
      <Row>
        <div className="SmallPcCategryContent">

          <Link
            to={`/Budget-PC-VxMWotv3g?cid=613a39334f25d800168af65d&type=product`}
          >
            <Card
              hoverable
              style={{ width: 240, backgroundColor: "#f7f9ff" }}
              cover={<img alt="example" src="https://res.cloudinary.com/hawktech-cloud/image/upload/v1631527003/v9lpmffvnnd9rhhjkrr0.png" />}
            >
              <Meta title="Budget PC" description="Under your budget" />
            </Card>
          </Link>
          <Link
            to={`/Mid-Range-TUHxbQSTt?cid=613a39654f25d800168af65e&type=product`}
          >
            <Card
              hoverable
              style={{ width: 240, backgroundColor: "#fffff7" }}
              cover={<img alt="example" src="https://res.cloudinary.com/hawktech-cloud/image/upload/v1631527336/tpo04mpsedn94vxwtrkv.png" />}
            >
              <Meta title="MID Range PC" description="Click & see details" />
            </Card>
          </Link>

          <Link
            to={`/High-End-maCPPU4DN?cid=613a39974f25d800168af65f&type=product`}
          >
            <Card
              hoverable
              style={{ width: 240, backgroundColor: "#fff7ff" }}
              cover={<img alt="example" src="https://res.cloudinary.com/hawktech-cloud/image/upload/v1631527740/yz4cu6d9fypbptpmad6n.png" />}
            >
              <Meta title="High end PC" description="Click & Grab our best" />
            </Card>
          </Link>
        </div>
      </Row>
    </Card>
  )
}

export default PCCategoryList