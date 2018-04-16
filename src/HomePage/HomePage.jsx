import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactPivot from './pivot-react';

import { userActions } from '../_actions';
const rows = require('./data.json');

class HomePage extends React.Component {
    
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }
    reduce(row, memo){
        memo.count = (memo.count || 0) + 1
        memo.priceTotal = (memo.priceTotal || 0) + parseFloat(row.price)
        return memo
        
        return memo
    }


    render() {
        const { user, users } = this.props;
    
        const dimensions = [
            {value: 'store', title: 'Shop'},
            {value: 'product', title: 'Item'},
            {value: 'description', title: 'Description'},
            {value: 'price', title: 'Price'},
            {value: function(row) {
              return row.transaction.cart_id
            }, title: 'Cart Id'},
            {value: function(row) {
              return row.transaction.quantity
            }, title: 'Quantity'}
          ]


        const calculations = [
            {
                title: 'Count',
                value: 'count',className: 'alignRight'
              },
              {
                title: 'Total Sell',
                value: 'priceTotal',
                template: function(val, row) {
                  return '$' + val.toFixed(2)
                },
                className: 'alignRight'
              }
          ]  
        return (
            <div>
                <h1>Hi {user.firstName}!</h1>
                <ReactPivot rows={rows}
                      dimensions={dimensions}
                      calculations={calculations}
                      reduce={this.reduce}
                      activeDimensions={['Shop']}
                      nPaginateRows={20} />
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };