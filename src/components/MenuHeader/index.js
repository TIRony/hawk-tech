import React, { useEffect } from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import {  SettingTwoTone, ShopTwoTone } from '@ant-design/icons';
import { getAllCategory } from '../../actions';
import { Layout, Menu, Space } from 'antd';
import { Link } from 'react-router-dom';
const { Content } = Layout;
const { SubMenu } = Menu;

/**
* @author
* @function MenuHeader
**/

const MenuHeader = (props) => {

  const category = useSelector(state => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const renderCategoriesMenu = (categories, index) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <Menu style={{ width: 256 }} mode="vertical">
          {category.parentId ?
            category.children.length > 0 ?
              <SubMenu key={category._id} title={category.name}>
                <Menu.Item key={index}>
                  <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
                    {/* {category.name[category.length - 1]} */}
                    {category.name}
                  </a>
                </Menu.Item>
                {category.children.length > 0 ? (<ul>{renderCategoriesMenu(category.children)}</ul>) : null}
              </SubMenu>
              :
              <Menu.Item key={index}>
                <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
                  {category.name}
                </a>
              </Menu.Item>
            :
            <SubMenu key={category._id} title={category.name} style={{ fontWeight: "bold" }}>
              {
                <Menu.Item key={index}>
                  {category.name}
                </Menu.Item>
              }
              {category.children.length > 0 ? (<ul>{renderCategoriesMenu(category.children)}</ul>) : null}
            </SubMenu>
          }
        </Menu>
      );
    }
    return myCategories;
  }
  return (
    <Layout>
      <Content>
        <div className="menuHeader">
          <ul>
            {/* {category.categories.length > 0 ? renderCategories(category.categories) : null} */}
            {category.categories.length > 0 ? renderCategoriesMenu(category.categories) : null}
            {/* {category.loading && loader()} */}

            <Link to={`/CustomBuild`} className="custom" style={{ color: "#333" }}>
              <SettingTwoTone twoToneColor="#03ac44" style={{ fontSize: '28px' }} />
              <span> <Space size={'large'}>Custom Build</Space> </span>
            </Link>
            <Link to={`/AllProducts`} className="product" style={{ color: "#333" }}>
              <ShopTwoTone twoToneColor="#03ac44" style={{ fontSize: '28px' }} />
              <span> <Space size={'large'}>Store</Space> </span>
            </Link>

          </ul>
        </div>
      </Content>
    </Layout>
  )
}

export default MenuHeader