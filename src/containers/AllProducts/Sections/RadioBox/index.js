import React, { useState } from 'react'
import { Collapse, Radio, Space } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const { Panel } = Collapse;


function RadioBox(props) {

    const [Value, setValue] = useState('0')

    const renderRadioBox = () => (
        props.list && props.list.map((value) => (
            <Radio key={value._id} value={`${value._id}`}>{value.name}</Radio>
        ))
    )

    const handleChange = (event) => {
        setValue(event.target.value)
        props.handleFilters(event.target.value)
    }

    return (
        <div>
            <Collapse
                defaultActiveKey={['0']}
                expandIcon={({ isActive }) =><CaretRightOutlined rotate={isActive ? 90 : 0} style={{ float:'right' }}/>}
                style={{ backgroundColor: 'white', padding:'10px' }}
            >
                <Panel header="Price" key="1" style={{ borderColor: '#03ac44' }}>
                    <Radio.Group onChange={handleChange} value={Value} style={{ paddingLeft:'20px' }}>
                        <Space direction="vertical" align="right">

                            {renderRadioBox()}

                        </Space>
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox