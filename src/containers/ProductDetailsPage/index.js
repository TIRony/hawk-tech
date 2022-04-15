import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import LayoutHeader from "../../components/Layout";
import { IoIosStar, IoMdCart } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";
import { loaderPage, MaterialButton } from "../../components/MaterialUI";
import "antd/dist/antd.css";
import "./style.css";
import { addToCart } from "../../actions";
import { generatePublicUrl } from "../../urlConfig";
import { Image, Carousel, Layout, Descriptions, Badge, message } from "antd";

const { Content } = Layout;
/**
 * @author
 * @function ProductDetailsPage
 **/

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const { productId } = props.match.params;
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }
  // const clicked = () => {
  //   document.querySelectorAll('.small').forEach(image => {
  //     image.addEventListener('click', () => {
  //       console.log("click");
  //       var src = image.getAttribute('src');
  //       if (document.querySelector('.big') != null) {
  //         document.querySelector('.big').src = src;
  //       }
  //     })
  //   })
  // }
  //its need to me refresh or herf to hover a small image to convert in into big
  let pre = product.productDetails.price;
  let post = product.productDetails.price - product.productDetails.price * 0.2;
  let pertentage = ((pre - post) / pre) * 100;
  const render = () => {
    return (
      <>
        <div className="productDescriptionContainer">
          <div className="productWithButton">
            <div className="productDescContainer">
              {/* <div className="verticalImageStack">
                {product.productDetails.productPictures.map((thumb, index) => (
                  <div className="thumbnail">
                    <img src={generatePublicUrl(thumb.img)} alt={thumb.img} className={'small'}></img>
                  </div>
                ))}
              </div> */}
              {/* <Image src={generatePublicUrl(product.productDetails.productPictures[0].img)} className="bigImage"></Image> */}
              <div className="detailsMobileHidden">
                <div className="productDescImgContainer">
                  <Image
                    className="bigImage"
                    preview={{ visible: false }}
                    src={generatePublicUrl(product.productDetails.productPictures[0].img)}
                    onClick={() => setVisible(true)}
                  ></Image>
                  <div style={{ display: "none" }}>
                    <Image.PreviewGroup
                      preview={{ visible, onVisibleChange: vis => setVisible(vis) }}
                    >
                      {product.productDetails.productPictures.map((thumb, index) => (
                        <Image src={generatePublicUrl(thumb.img)} alt={thumb.img} className="bigImage"></Image>
                      ))}
                    </Image.PreviewGroup>
                  </div>
                </div>
              </div>
              <div className="detailsMobileVisible">
                <Carousel className="productDescImgContainerM" autoplay>
                  {product.productDetails.productPictures.map((thumb, index) => (
                    <img src={generatePublicUrl(thumb.img)} alt={thumb.img} className="bigImage"></img>
                  ))}
                </Carousel>
              </div>
            </div>

            {/* {product.productDetails.productPictures.map((thumb, index) => (
                  <Image src={generatePublicUrl(thumb.img)} alt={thumb.img} className="bigImage"></Image>
                ))} */}
            <div className="buttonBox">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#1890ff"
                textColor="#ffffff"
                style={{
                  // marginRight: "5px",
                }}
                icon={<IoMdCart />}
                onClick={() => {
                  const { _id, name, price, quantity } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  if (quantity > 0) {
                    dispatch(addToCart({ _id, name, price, img }));
                    message.success(name + ' is added to your cart.', 5);
                  }
                  else {
                    message.warning(name + ' is out of stock now !', 5);
                  }
                }}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#03ac44"
                textColor="#ffffff"
                style={{
                  // marginLeft: "5px",
                }}
                icon={<AiFillThunderbolt />}
                onClick={() => {
                  const { _id, name, price, quantity } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  if (quantity > 0) {
                    dispatch(addToCart({ _id, name, price, img }));
                    props.history.push(`/cart`);
                  }
                  else {
                    message.warning(name + ' is out of stock now !', 5);
                  }
                }}
              />
            </div>
          </div>
          {/* product description */}
          <div className="productDetails">
            <p className="productTitle">{product.productDetails.name}</p>
            <div>
              <span className="ratingCount">
                4.3 <IoIosStar />
              </span>
              <span className="ratingNumbersReviews">
                72,234 Ratings & 8,140 Reviews
              </span>
            </div>
            <div className="extraOffer">
              Extra ৳ {product.productDetails.price * 0.2}{" "}
            </div>
            <div className="priceContainer">
              <span className="price">
                ৳ {(product.productDetails.price - product.productDetails.price * 0.2)}
              </span>
              <span className="discount" style={{ margin: "0 10px" }}>
                {pertentage}{"%"} off
              </span>
              <span className="discount" style={{ margin: "0 10px" }}>
                Only {product.productDetails.quantity} in stock !
              </span>
              {/* <span>i</span> */}
            </div>
            <div>
              <p
                style={{
                  color: "#212121",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Available Offers
              </p>
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    width: "100px",
                    fontSize: "12px",
                    color: "#878787",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  Description
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#212121",
                  }}
                >
                  {product.productDetails.description}
                </span>
              </p>
            </div>
          </div>
        </div>
        <Demo />
      </>
    )
  }
  const Demo = () => (
    <div style={{ padding: '12px 0' }}>
      <Descriptions
        title="More Specifications"
        bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        style={{ backgroundColor: "white" }}
      >
        <Descriptions.Item label="Product">{product.productDetails.name}</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid / Cash on Delivery</Descriptions.Item>
        <Descriptions.Item label="Status">
          {product.productDetails.quantity > 0 ?
            <Badge status="success" text="Available" /> :
            <Badge status="error" text="Unavailable" />
          }
        </Descriptions.Item>
        <Descriptions.Item label="Amount">৳ {product.productDetails.price}</Descriptions.Item>
        <Descriptions.Item label="Discount">৳ {product.productDetails.price * 0.2}</Descriptions.Item>
        <Descriptions.Item label="Official">৳ {(product.productDetails.price - product.productDetails.price * 0.2)}</Descriptions.Item>
        <Descriptions.Item label="Description" span={3}>
          {product.productDetails.description}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
  return (
    <LayoutHeader>
      <Layout className="site-layout-background" style={{ padding: '12px 0' }}>
        <Content style={{ padding: '1px 12px' }}>
          {/* <Row gutter={[16, 16]}> */}
          <div class="containerDetails">
            {/* {render()} */}
            {product.loading ? loaderPage() : render()}
          </div>
          {/* </Row> */}
        </Content>
      </Layout>
    </LayoutHeader>
  );
};

export default ProductDetailsPage;
