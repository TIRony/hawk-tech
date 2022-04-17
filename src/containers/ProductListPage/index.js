import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import MainFooter from "../../components/MainFooter";
import { loaderPage } from "../../components/MaterialUI";
import getParams from "../../utils/getParams";
import ProductList from "./ProductList";
import ProductPage from "./ProductPage";
import ProductStore from "./ProductStore";
import "./style.css";

/**
 * @author
 * @function ProductListPage
 **/

const ProductListPage = (props) => {
  const renderProduct = () => {
    const params = getParams(props.location.search);
    let content = null;
    // console.log(part);
    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
      case "page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = <ProductList {...props} />;
    }

    return content;
  };
  return (
    <Layout>
      {/* {product.loading ? loaderPage()
        :
        renderProduct()
      } */}
      {renderProduct()}
      <MainFooter />
    </Layout>
  );
}

export default ProductListPage;
