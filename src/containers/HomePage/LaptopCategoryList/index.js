import React from 'react'
import { Layout, Row, Col, Card } from 'antd';
import "./style.css";
import { Link } from 'react-router-dom';

const { Meta } = Card;

/**
* @author
* @function LaptopCategoryList
**/

const { Content } = Layout;

const LaptopCategoryList = (props) => {

  return (
    <Card title="Laptop's">
      <Row>
        <div className="SmallLaptopContent">
          
            <Link
              to={`/Budget-Laptop-2r70MfLuWc?cid=613a3a6c4f25d800168af662&type=product`}
            >
              <Card
                hoverable
                style={{ width: 240, backgroundColor: "#fffff7" }}
                cover={<img alt="example" src="https://res.cloudinary.com/hawktech-cloud/image/upload/v1631527637/lhocy2wj9ebi6paz0egm.webp" />}
              >
                <Meta title="Budget Laptop" description="Limited stock, Click & grab" />
              </Card>
            </Link>
          
            <Link
              to={`/MID-Range-Laptop-sSz01QDQL5?cid=613a3a7f4f25d800168af663&type=product`}
            >
              <Card
                hoverable
                style={{ width: 240, backgroundColor: "#f7fff7" }}
                cover={<img alt="example" src="https://res.cloudinary.com/hawktech-cloud/image/upload/v1631527637/jwhwwgfd2rghwddyavcb.webp" />}
              >
                <Meta title="MID Tier laptop" description="Limited stock, Click & grab" />
              </Card>
            </Link>
          
            <Link
              to={`/High-End-Laptop-EbSScE3nxe?cid=613a3a944f25d800168af664&type=product`}
            >
              <Card
                hoverable
                style={{ width: 240, backgroundColor: "#f7f9ff" }}
                cover={<img alt="example" src="https://res.cloudinary.com/hawktech-cloud/image/upload/v1631528843/x349asgiikpkbskoiwmd.webp" />}
              >
                <Meta title="High-End Laptop" description="Best Laptops" />
              </Card>
            </Link>
        </div>
      </Row>
    </Card>
  )
}

export default LaptopCategoryList