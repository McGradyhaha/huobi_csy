import React from 'react'
import { Select, List, Button, Table, Divider} from 'antd';
import currencyList from '../../constants/currencyList'
import {postMessage} from '../../fetch/Message/message.js'

const { Option } = Select;

const columns = [
    {
        title: 'Currency',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Today',
        dataIndex: 'latest',
        key: 'latest',
    },
    {
        title: 'Three Day',
        dataIndex: 'three_day',
        key: 'three_day'
    },
    { 
        title: 'Seven Day',
        dataIndex: 'seven_day',
        key: 'seven_day'
    },
    {
        title: 'One month',
        dataIndex: 'month',
        key: 'month'
    },
    {
        title: 'Source',
        dataIndex: 'source',
        key: 'source'
    }
]


class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currencyList: ["ardr/btc", "ardr/eth"],
            loading: false,
            receivedList: [],
            showTable: false
        };
    }
    
    handleChange(value){
        const list = value
        this.setState({
			currencyList: list
		})
    }

    handleClick(){
        this.setState({
            loading: true
        })
        const sendList = {"currency_list": this.state.currencyList}
        
        console.log(sendList)
        const result = postMessage(sendList)
		result.then(res => {
			return res.json()
		}).then(json => {
            
            console.log(json)
            this.setState({
                receivedList:json.list,
                loading: false,
                showTable: true
            })
			// store coming message into message history list
		})
    }

    render(){
        return (
            <div>
                <div>
                    <Select
                        mode="multiple"
                        style={{ width: '70%' }}
                        placeholder="Please select"
                        defaultValue={["ardr/btc", "ardr/eth"]}
                        onChange={this.handleChange.bind(this)}
                    >
                        {currencyList.map((item) => (
                            <Option key={item}>{item}</Option>
                        ))}
                    </Select>
                    <Button type="primary" icon="search" loading={this.state.loading} onClick={this.handleClick.bind(this)}> 
                        Send
                    </Button>
                </div>
                <Divider/>
                <div>
                    {
                        this.state.showTable
                        ?<div>
                            <Table columns={columns} dataSource={this.state.receivedList} />
                        </div>
                        :<div>
                            <Table columns={columns} dataSource={this.state.receivedList} />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Home

