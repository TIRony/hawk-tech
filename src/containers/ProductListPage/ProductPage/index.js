import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductPage } from '../../../actions';
import getParams from '../../../utils/getParams';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../components/UI/Card';
import { generatePublicUrl2 } from '../../../urlConfig';
import "./style.css";
import { Link } from "react-router-dom";
import { Layout } from 'antd';
import { loaderPage } from '../../../components/MaterialUI';
const { Content } = Layout;

/**
* @author
* @function ProductPage
**/

const ProductPage = (props) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const { page } = product;

    useEffect(() => {
        const params = getParams(props.location.search);
        console.log({ params });
        const payload = {
            params
        }
        dispatch(getProductPage(payload));
    }, []);

    const renerItems = () => {
        return (
            <div style={{
                margin: '0 0px',
                width: '100%',
                textAlign: 'center'
            }}>
                {/* <h3>{page.title}</h3> */}
                <Carousel
                    renderThumbs={() => { }}
                    autoPlay
                    interval="2000"
                    infiniteLoop
                >
                    {
                        page.banners && page.banners.map((banner, index) =>
                            <Link
                                className="bannerContent"
                                key={index}
                                to={banner.navigateTo}
                            >
                                <img className="bannerImage"
                                    src={generatePublicUrl2(banner.img)} alt="" />
                            </Link>
                        )
                    }
                </Carousel>
                <Content>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        margin: '10px 0'
                    }}>
                        {
                            page.products && page.products.map((product, index) =>
                                <Card
                                    className="cardContent"
                                    key={index}
                                >
                                    <img style={{
                                        width: '100%',
                                        height: '100%'
                                    }} src={generatePublicUrl2(product.img)} alt="" />
                                </Card>
                            )
                        }
                    </div>
                </Content>
            </div>
        )
    }

    return (
        <>
            {/* {renerItems()} */}
            {product.loading ? loaderPage() : renerItems()}
        </>
    )

}

export default ProductPage