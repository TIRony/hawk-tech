import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { Link } from "react-router-dom";
import "./style.css";
import { generatePublicUrl } from "../../../urlConfig";
import { Row, Col, Layout, BackTop } from 'antd';
import { emptyProduct, loaderPage, skletonPage } from "../../../components/MaterialUI";

const { Content } = Layout;
/**
 * @author
 * @function ProductList
 **/

const ProductList = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const { match } = props;
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    dispatch(getProductsBySlug(match.params.slug));
    window.scrollTo(0, 0);
  }, []);

  const renerItems = () => {
    return (
      <Row>
        <div className="main_content">
          {product.products.map((product) => (
            <Col xs={16} sm={12} md={12} lg={8} xl={8}>
              <Link
                className="card"
                to={`/${product.slug}/${product._id}/p`}
              >
                <div className="card_img">
                  <img src={generatePublicUrl(product.productPictures[0].img)} />
                  <div>
                    <div className="card_header">
                      <h2>{product.name}</h2>
                      <p className="price">৳ {product.price}</p>
                      <p>{product.description}</p>
                      {/* <div className="btn">Add to cart</div> */}
                      <div className="btn">View</div>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </div>
      </Row>
    )
  }

  return (
    <Content>

      {/* {product.loading ? renerItems() : loaderPage() } */}
      {/* {product.products.length ? renerItems() : emptyProduct()} */}

      {/* {product.loading ? loaderPage() : product.products.length ? renerItems() : emptyProduct() } */}
      {isLoading ? skletonPage() : product.loading ? skletonPage() : product.products.length ? renerItems() : emptyProduct()}
    </Content>
  )
}

export default ProductList;