import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useDispatch } from "react-redux";
import { Row, Layout, Menu, Radio, Space, Drawer, message } from 'antd';
import 'antd/dist/antd.css'
import { UserOutlined, LaptopOutlined, NotificationOutlined, FireOutlined, FireFilled, PicRightOutlined } from '@ant-design/icons';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { continents, price } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';
import LayoutHeader from "../../components/Layout";
import { generatePublicUrl } from "../../urlConfig";
import { api } from '../../urlConfig';
import "./style.css";
import { Link } from "react-router-dom";
import { backToTop, skletonPage } from '../../components/MaterialUI';
import { addToCart } from "../../actions";
import MainFooter from '../../components/MainFooter';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

function AllProducts() {

    //const dispatch = useDispatch();
    const dispatch = useDispatch();
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")
    const [value, setValue] = React.useState(1);
    const [isLoading, setIsLoading] = useState(true);
    //const product = useSelector((state) => state.product);

    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    // const dispatch = useDispatch();
    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        const variables = {
            skip: Skip,
            limit: Limit,
        }

        getProducts(variables);
    }, [])
    // http://localhost:2000/api/AllProducts
    const getProducts = (variables) => {
        Axios.post(api + '/AllProducts', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setProducts([...Products, ...response.data.products])
                    } else {
                        setProducts(response.data.products)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert('Failed to fectch Product')
                }
            })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters,
            searchTerm: SearchTerms
        }
        getProducts(variables)
        setSkip(skip)
    }

    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        getProducts(variables)
        setSkip(0)

    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {

            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }
        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm,
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

        getProducts(variables)
    }

    const renderCards = Products.map((product, index) => {
        document.querySelectorAll('.small' + product._id).forEach(image => {
            image.addEventListener('mouseover', () => {
                var src = image.getAttribute('src');
                if (document.querySelector('.big' + product._id) != null) {
                    document.querySelector('.big' + product._id).src = src;
                }
            });
        });
        return (
            <div className="box-container">
                <div className="small-box">
                    <div className="small-image-container">
                        {product.productPictures.map((thumb, index) => (
                            <div className="small-image">
                                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} class={'small' + product._id}></img>
                            </div>
                        ))}
                    </div>
                </div>
                <>
                    <div className="box">
                        <Link
                            to={`/product/${product._id}/p`}
                        >
                            <div className="image-container">
                                <div className="big-image">
                                    <img src={generatePublicUrl(product.productPictures[0].img)} alt="" className={'big' + product._id}></img>
                                </div>
                            </div>
                        </Link>

                        <div className="content">
                            <h3>{product.name}</h3>
                            <div className="stars">
                                <FireFilled style={{ color: 'red' }} />
                                <FireFilled style={{ color: 'red' }} />
                                <FireFilled style={{ color: 'red' }} />
                                <FireFilled style={{ color: 'red' }} />
                                <FireOutlined style={{ color: 'red' }} />
                            </div>
                            <p>{product.description}</p>
                            <h2> {'৳ '}{product.price} &nbsp; <span> {'৳'}{product.price * 1.2}</span> </h2>
                            <h4>Only {product.quantity} in stock !</h4>
<<<<<<< HEAD
=======

                            <Link
                                to={`/product/${product._id}/p`}
                            >
                                <a
                                    className="btn"
                                >View</a>
                            </Link>

>>>>>>> 7085862 (Complete category)
                            <a
                                className="btn"
                                onClick={() => {
                                    const { _id, name, price, quantity } = product;
                                    const img = product.productPictures[0].img;
                                    if (product.quantity > 0) {
                                        dispatch(addToCart({ _id, name, price, img, quantity }));
                                        message.success(name + ' is added to your cart.', 5);
                                    }
                                    else {
                                        message.warning(name + ' is out of stock now !', 5);
                                    }
                                }}
                            >Add To Cart</a>
                        </div>
                    </div>
                </>
            </div>
        )
    })
    const sideMenu = () => {
        return (
            <div>
                <Menu
                    className="sideMenu"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub2']}
                    style={{ height: '100%' }}
                >
                    {/* Search  */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                        <SearchFeature
                            refreshFunction={updateSearchTerms}
                        />
                    </div>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="Brand" style={{ color: '#03ac44', paddingBottom: '5px' }}>
                        <Radio.Group
                            onChange={onChange}
                            value={value}
                            // size="small"
                            defaultValue="amd"
                            buttonStyle="solid"
                            style={{ width: "100%" }}
                        >
                            <Space style={{ padding: '0 48px' }}>
                                <Radio.Button value="amd" >AMD</Radio.Button>
                                <Radio.Button value="intel" >Intel</Radio.Button>
                            </Space>
                        </Radio.Group>
                    </SubMenu>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Products" style={{ color: '#03ac44', paddingBottom: '5px' }}>
                        <Menu.Item key="1" style={{ paddingLeft: '20px' }}>option1</Menu.Item>
                        <Menu.Item key="2" style={{ paddingLeft: '20px' }}>option2</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3" style={{ color: '#03ac44', paddingBottom: '5px' }}>
                        <Menu.Item key="9">option9</Menu.Item>
                    </SubMenu>

<<<<<<< HEAD
                    <CheckBox
                        list={continents}
                        style={{ paddingBottom: '10px', paddingLeft: '20px' }}
                        handleFilters={filters => handleFilters(filters, "continents")}
                    />
=======
                    {/* <CheckBox
                        list={continents}
                        style={{ paddingBottom: '10px', paddingLeft: '20px' }}
                        handleFilters={filters => handleFilters(filters, "continents")}
                    /> */}
>>>>>>> 7085862 (Complete category)

                    <RadioBox
                        list={price}
                        handleFilters={filters => handleFilters(filters, "price")}
                        style={{ paddingBottom: '10px' }}
                    />

                </Menu>
            </div>
        )
    };
    return (
        <LayoutHeader>
            <Layout className="site-layout-background" style={{ padding: '12px 0' }}>
                <div className="prouctsMobileVisible">
                    <div type="primary" onClick={showDrawer} className="drawer-handle">
                        <i><PicRightOutlined style={{ fontSize: '18px', color: '#03ac44', position: 'fixed' }} /></i>
                    </div>
                    <Drawer
                        title="Filters"
                        placement="left"
                        closable="flase"
                        onClose={onClose}
                        visible={visible}
                    >
                        {sideMenu()}
                    </Drawer>
                </div>
                <div className="productsmobileHidden">
                    <Sider
                        className="site-layout-background"
                        width={250}
                        // breakpoint="lg"
                        collapsedWidth="0"
                        placement="left"
                        closable="flase"
                        onClose={onClose}
                        visible="false"
                    >
                        {sideMenu()}
                    </Sider>
                </div>
                <Content style={{ padding: '1px 12px' }}>
                    <div style={{ width: '100%', margin: '-.1rem auto' }}>
                        <div>
                            <Row gutter={[16, 26]}>
                                <div className="container">
                                    {/* {renderCards} */}
                                    {isLoading ? skletonPage() : renderCards}
                                </div>
                            </Row>
                        </div>
                        <br /><br />
                        {PostSize >= Limit &&
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button onClick={onLoadMore}>Load More</button>
                            </div>
                        }
                        {backToTop()}
                    </div>
                </Content>
            </Layout>
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            <MainFooter />
        </LayoutHeader>
    )
}
export default AllProducts