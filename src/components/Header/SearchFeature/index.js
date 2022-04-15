import React, { useState, useEffect } from 'react'
import { Input, Card, Modal, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import "./style.css";
import Axios from "axios";
import { api, generatePublicUrl } from '../../../urlConfig';
import { BrowserRouter, Link } from "react-router-dom";
const { Search } = Input;
const { Meta } = Card;

function SearchFeature(props) {

    const [Products, setProducts] = useState([])
    const [ProductMatch, setProductMatch] = useState([])

    // Modal
    const [isModalVisible, setIsModalVisible] = useState(false);


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //   Modal end

    useEffect(() => {
        getProducts();

    }, []);
    const getProducts = () => {
        Axios.post(api + '/AllProducts')
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.products)
                } else {
                    alert('Failed to fectch Product')
                }
            })
    }

    const searchProucts = (text) => {
        if (!text) {

            setProductMatch([]);
        }
        else {
            let matches = Products.filter((product) => {
                const regex = new RegExp(`${text}`, "gi");
                return product.name.match(regex);
            });
            setProductMatch(matches);
        }
    };
    return (

        <>
            <SearchOutlined type="primary" onClick={showModal} className="searchOutline" />
            <Modal
                title="Search Box"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[

                ]}
            >
                <Search
                    placeholder="Type to search any product..."
                    loading
                    enterButton
                    onChange={(e) => searchProucts(e.target.value)}
                    autoFocus
                />
                {ProductMatch && ProductMatch.map((product, index) => (
                    <BrowserRouter forceRefresh={true}>
                        <div key={index} class="autoComBox">
                            <Link
                                to={`/product/${product._id}/p`}
                            >
                                <Card class="product" style={{ cursor: "pointer" }}>
                                    <Meta
                                        avatar={
                                            <Avatar size="large" shape="square" src={generatePublicUrl(product.productPictures[0].img)} />
                                        }
                                        title={`${product.name}`}
                                        description={product.price}
                                    />
                                </Card>
                            </Link>
                        </div>
                    </BrowserRouter>
                ))}
            </Modal>
        </>
    );
}

export default SearchFeature