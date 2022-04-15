import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { Link } from "react-router-dom";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";
import { generatePublicUrl } from "../../../urlConfig";

import { Layout, Card, Divider } from 'antd';
import { emptyProduct, loaderPage } from "../../../components/MaterialUI";
const { Content } = Layout;
/**
 * @author
 * @function ProductStore
 **/

const ProductStore = (props) => {
  const product = useSelector((state) => state.product);
  const priceRange = product.priceRange;
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  const renerItems = () => {
    return (
      <Content>
        <Divider orientation="left">{`${props.match.params.slug}`}</Divider>
        {
          Object.keys(product.productsByPrice).map((key, index) => {
            return (
              <Card
                type="inner"
                title={"Under " + `${priceRange[key]}`}
                extra={<Link to="/AllProducts">More</Link>}
              >
                <div style={{ display: "flex" }}>
                  {product.productsByPrice[key].map((product) => (
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
            );
          })
        }
      </Content>
    )
  }

  return (
    <>
      {product.loading ? loaderPage() : renerItems()}
    </>
  );
};

export default ProductStore;
