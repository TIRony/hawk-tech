import React from 'react'
import { Layout, Row, Col, Card } from 'antd';
import "./style.css";
import { Link, Switch, Route } from 'react-router-dom';

const { Meta } = Card;

/**
* @author
* @function TopCategoryList
**/

const { Content } = Layout;

const TopCategoryList = (props) => {

  return (
    <Card title="Top Categories">
      <Row>
        <div className="SmallBannerContent">

          <Link
            to={`/Mid-Range-TUHxbQSTt?cid=613a39654f25d800168af65e&type=product`}
          >
            <Card
              hoverable
              style={{ width: 240, backgroundColor: "#fffff7" }}
              cover={<img alt="example" src="https://res.cloudinary.com/hawktech-cloud/image/upload/v1631528927/rjsxryqbxid4fspe697e.png" />}
            >
              <Meta title="Best MID tier PC" description="Upto 50% off" />
              <Meta description="Limited stock, Click & grab" />
            </Card>
          </Link>

          <Link
            to={`/High-End-Laptop-EbSScE3nxe?cid=613a3a944f25d800168af664&type=product`}
          >
            <Card
              hoverable
              style={{ width: 240, backgroundColor: "#f7fff7" }}
              cover={<img alt="example" src="https://res.cloudinary.com/hawktech-cloud/image/upload/v1631528843/x349asgiikpkbskoiwmd.webp" />}
            >
              <Meta title="Best laptop" description="Upto 40% off" />
              <Meta description="Limited stock, Click & grab" />
            </Card>
          </Link>

          <Link
            to={`/High-End-Gaming-PC-_EINs93ZiF?cid=613a3b4c4f25d800168af669&type=product`}
          >
            <Card
              hoverable
              style={{ width: 240, backgroundColor: "#f7f9ff" }}
              cover={<img alt="example" src="https://res.cloudinary.com/hawktech-cloud/image/upload/v1631528927/ickqqwtedcymxqglkvfo.png" />}
            >
              <Meta title="Gaming Meta" description="upto 20% off" />
              <Meta description="Limited gaming PC" />
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
              <Meta title="High end PC" description="Upto 10% off" />
              <Meta description="Click & Grab our best" />
            </Card>
          </Link>
        </div>
      </Row>
    </Card>
  )
}

export default TopCategoryList