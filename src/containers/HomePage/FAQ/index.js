import React from 'react'
import { Layout, Collapse, Card } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

/**
* @author
* @function FAQ
**/
const { Panel } = Collapse;
const { Content } = Layout;
const FAQtext = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const FAQ = (props) => {
  return (
    <Content style={{ padding: '10px 10px' }}>
      <Card title='FAQ'>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        className="site-collapse-custom-collapse"
        accordion
        ghost
      >
        <Panel header="Question number 1?" key="1" className="site-collapse-custom-panel">
          <p>{FAQtext}</p>
        </Panel>
        <Panel header="Question number 2?" key="2" className="site-collapse-custom-panel">
          <p>{FAQtext}</p>
        </Panel>
        <Panel header="Question number 3?" key="3" className="site-collapse-custom-panel">
          <p>{FAQtext}</p>
        </Panel>
      </Collapse>
      </Card>
    </Content>
  )
}

export default FAQ