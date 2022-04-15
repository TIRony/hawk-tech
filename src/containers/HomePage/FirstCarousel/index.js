import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductPage } from '../../../actions';
// import getParams from '../../../utils/getParams';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { generatePublicUrl2 } from '../../../urlConfig';
import "./style.css";

import { Carousel } from 'antd';
import { Link } from 'react-router-dom';

/**
* @author
* @function FirstCarousel
**/

const FirstCarousel = (props) => {

  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const { page } = product;

  useEffect(() => {
    // const params = getParams(props.location.search);
    const params = {
      cid: '613a30bf4f25d800168af653',
      type: 'page',
    }
    const payload = {
      params
    }
    dispatch(getProductPage(payload));
  }, []);

  return (
    // <div className="productDescContainer">
      <Carousel className="productDescImgContainer" autoplay swipeToSlide draggable>
        {
          page.banners && page.banners.map((banner, index) =>
            <Link
              className="bannerContent"
              key={index}
              to={banner.navigateTo}
            >
              <img
              className="bannerImage"
                src={generatePublicUrl2(banner.img)} alt="" /> 
            </Link>
          )
        }
      </Carousel>
    // </div>

    // <Carousel autoplay swipeToSlide draggable>
    //   {
    //       page.banners && page.banners.map((banner, index) =>
    //         <Link
    //           // className="bannerContent"
    //           key={index}
    //           to={banner.navigateTo}
    //         >
    //           <img style={contentStyle}
    //             src={generatePublicUrl2(banner.img)} alt="" /> 
    //         </Link>
    //       )
    //     }
    // </Carousel>
  )

}

export default FirstCarousel