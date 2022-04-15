import React from 'react'
import { Layout, Row, Col, Card } from 'antd';
import "./style.css";
import { Link } from 'react-router-dom';

const { Meta } = Card;

/**
* @author
* @function GamingCategoryList
**/

const { Content } = Layout;

const GamingCategoryList = (props) => {

  return (
    <Card title="Gaming Section">
      <Row>
        <div className="SmallGamingContent">

          <Link
            to={`/High-End-Gaming-PC-_EINs93ZiF?cid=613a3b4c4f25d800168af669&type=product`}
          >
            <Card
              hoverable
              style={{ width: 240, backgroundColor: "#f7f9ff" }}
              cover={<img alt="example" src="https://res.cloudinary.com/hawktech-cloud/image/upload/v1631528927/ickqqwtedcymxqglkvfo.png" />}
            >
              <Meta title="High-End Gaming" description="Best Laptops" />
            </Card>
          </Link>

          <Link
            to={`/MID-Range-Gaming-PC-jHgwkbJY7U?cid=613a3b304f25d800168af668&type=product`}
          >
            <Card
              hoverable
              style={{ width: 240, backgroundColor: "#fffff7" }}
              cover={<img alt="example" src="https://res.cloudinary.com/hawktech-cloud/image/upload/v1631528927/rjsxryqbxid4fspe697e.png" />}
            >
              <Meta title="Gaming PC" description="Limited stock, Click & grab" />
            </Card>
          </Link>

          <Link
            to={`/Budget-Gaming-PC-Li78Jevc2-?cid=613a3b134f25d800168af667&type=product`}
          >
            <Card
              hoverable
              style={{ width: 240, backgroundColor: "#f7fff7" }}
              cover={<img alt="example" src="https://res.cloudinary.com/hawktech-cloud/image/upload/v1631527003/v9lpmffvnnd9rhhjkrr0.png" />}
            >
              <Meta title="Budget Gaming PC" description="Limited stock, Click & grab" />
            </Card>
          </Link>

          <Link
            to={`/High-End-Gaming-Laptop-nC4muOM0Ex?cid=613a3bcf4f25d800168af66d&type=product`}
          >
            <Card
              hoverable
              style={{ width: 240, backgroundColor: "#fff7ff" }}
              cover={<img alt="example" src="https://res.cloudinary.com/hawktech-cloud/image/upload/v1631528843/x349asgiikpkbskoiwmd.webp" />}
            >
              <Meta title="Gaming Laptop" description="Best Laptops" />
            </Card>
          </Link>
        </div>
      </Row>
    </Card>
  )
}

export default GamingCategoryList