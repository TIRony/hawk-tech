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
import { Layout } from "antd";

const { Content } = Layout;
/**
 * @author
 * @function CustomBuild
 **/

const CustomBuild = () => {
    const dispatch = useDispatch();
    // const product = useSelector((state) => state.product);
    // const [visible, setVisible] = useState(false);
    return (
        <LayoutHeader>
            <Layout className="site-layout-background" style={{ padding: '12px 0' }}>
                <Content style={{ padding: '1px 12px' }}>
                    {/* <Row gutter={[16, 16]}> */}
                    <div>
                        {/* {render()} */}
                        {/* {product.loading ? loaderPage() : render()} */}
                        <h1>Under Construction</h1>
                    </div>
                    {/* </Row> */}
                </Content>
            </Layout>
        </LayoutHeader>
    );
};

export default CustomBuild;
