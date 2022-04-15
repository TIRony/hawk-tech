import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { Link } from "react-router-dom";
import "./style.css";
import { generatePublicUrl } from "../../../urlConfig";
import { Card, Layout } from 'antd';
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";

/**
 * @author
 * @function BudgetLaptopProductList
 **/
const { Content } = Layout;
const BudgetLaptopProductList = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsBySlug('MID-Range-Laptop-sSz01QDQL5'));
  }, []);

  return (
    <Content>
      <Card
        type="inner"
        title='Budget Laptop (Under 50k)'
        extra={<Link href="#">More</Link>}
        size="large"
      >
        <div className="firstProductList">
          {product.products.map((product) => (
            <Link
              to={`/${product.slug}/${product._id}/p`}
              style={{
                display: "block",
                textDecoration: "none",
                color: "#000",
              }}
              className="productContainer"
            >
              <div className="productImgContainer">
                <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
              </div>
              <div className="productInfo">
                <div style={{ margin: "10px 0" }}>{product.name}</div>
                <div>
                  <Rating value="4.5" />
                  &nbsp;&nbsp;
                  <span
                    style={{
                      color: "#777",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    (3353)
                  </span>
                </div>
                <Price value={product.price} />
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </Content>
  );
};

export default BudgetLaptopProductList;