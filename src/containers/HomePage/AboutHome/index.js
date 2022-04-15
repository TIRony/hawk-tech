import React from 'react'
import { Layout, Row, Col, Card } from 'antd';
import pic1 from "../../../images/logo/about-PC.png";
import "./style.css";

/**
* @author
* @function AboutHome
**/

const { Content } = Layout;

const AboutHome = (props) => {

  return (
    <Card title="About">
    <section class="about">
      <div class="image">
        <Card style={{backgroundColor:"#fffff7"}}>
          <img src={pic1} alt="" />
        </Card>
      </div>
      <div class="content">
        <Card>
          <span>welcome to our shop</span>
          <h3>We build the best for you</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel sequi nostrum quae nobis non quaerat nisi voluptatibus recusandae reprehenderit tempore eligendi, eum quibusdam perferendis dicta, incidunt dolores nemo ex.</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem cumque molestiae blanditiis deleniti aspernatur, ab tempora quisquam sapiente commodi hic.</p>
        </Card>
      </div>
    </section>
    </Card>
  )
}

export default AboutHome