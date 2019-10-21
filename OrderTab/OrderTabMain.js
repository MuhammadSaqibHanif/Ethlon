import React, { Component } from 'react';
import OrderTabHome from './OrderTabHome'

class OrderTabMain extends Component {
    static navigationOptions={
        header:null,
    }
    render() {
        
        return (
            <OrderTabHome />
        )
    }

}

export default OrderTabMain;