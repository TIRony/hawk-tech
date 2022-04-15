import React from 'react'
import LayoutHeader from '../../components/Layout'

import { Layout } from 'antd';
// import { CaretRightOutlined } from '@ant-design/icons';
import FAQ from './FAQ';
import Comments from './Comments';
import FirstCarousel from './FirstCarousel';
import { useSelector } from 'react-redux';
import { loaderPage } from '../../components/MaterialUI';
import InfoContainer from './InfoContainer';
import BudgetProductList from './BudgetProductList';
import TopCategoryList from './TopCategoryList';
import PCCategoryList from './PCCategoryList';
import LaptopCategoryList from './LaptopCategoryList';
import GamingCategoryList from './GamingCategoryList';
import SupportInfoContainer from './SupportInfoContainer';
import AboutHome from './AboutHome';
import MainFooter from '../../components/MainFooter';
import { backToTop } from '../../components/MaterialUI';


/**
* @author
* @function HomePage
**/

const HomePage = () => {

  const components = () => {
    return (
      <Layout className="site-layout-background" style={{ padding: '1px 0' }}>
          <FirstCarousel />
          <TopCategoryList />
          <InfoContainer/>
          <BudgetProductList />
          <AboutHome />
          <SupportInfoContainer />
          <PCCategoryList />
          <LaptopCategoryList />
          <GamingCategoryList />
          <FAQ />
          <Comments />
          <MainFooter />
          {backToTop()}
        </Layout>
    );
  }

  const category = useSelector(state => state.category);
  return (

    <LayoutHeader>
      {category.loading ? loaderPage()
        :
        components()
      }
    </LayoutHeader>
  )
}

export default HomePage