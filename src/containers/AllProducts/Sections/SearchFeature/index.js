import React, { useState } from 'react'
import { Input } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';

const { Search } = Input;

function SearchFeature(props) {

    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)

        props.refreshFunction(event.currentTarget.value)

    }

    return (
        <div>
            <Search
                allowClear
                placeholder="  Search here..."
                enterButton
                value={SearchTerms}
                onChange={onChangeSearch}
                style={{ 
                    color: 'white'
                }}
                prefix={<CheckCircleTwoTone twoToneColor="#03ac44" />}
            />
        </div>
    )
}

export default SearchFeature