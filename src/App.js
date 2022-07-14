import React, { Component } from 'react';

export default class App extends Component {
    static displayName = App.name;

    getSum(cart) {
        var sum = 0;
        cart.forEach(x => { sum += x.price * x.qty });
        return sum;
    }

    createLine = () => {
        var joined = [...this.state.cart, { id: this.state.cart.length + 1, name: "New Book", qty: 1, price: 10.99 }];
        var total = this.getSum(joined);
            
        this.setState(
            {
                cart: joined,
                total: total
            }            
        );
    }

    handleChange(key, row, e) {
        var newCart = this.state.cart;
        newCart[row.id - 1][key] = e.target.value;
        var total = this.getSum(newCart);

        this.setState(
            {
                cart: newCart,
                total: total
            }
        );
    }

    saveCart = () => {

    }

    constructor(props) {
        super(props);
        this.state = { cart: [], total: 0, loading: false };
        this.handleChange = this.handleChange.bind(this);
    }

    static renderCartTable(cart, total, handleChange) {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Unit Price</th>
                        <th>Line Total</th>
                        <th>Total: ${total}</th>                        
                    </tr>
                </thead>
                <tbody>
                    {cart.map(row => (
                        <tr key={row.id}>
                            <td><input type="text" value={row.name} onChange={(e) => handleChange("name", row, e)}/></td>
                            <td><input type="number" value={row.qty} onChange={(e) => handleChange("qty", row, e)} /></td>
                            <td>$<input type="number" value={row.price} onChange={(e) => handleChange("price", row, e)}/></td>
                            <td>${row.price}</td>
                            <td>${row.price * row.qty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    /*
    static renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    */


    render() {
        let contents = App.renderCartTable(this.state.cart, this.state.total, this.handleChange);

        return (
            <div>
                {contents}
                <div>
                    <button onClick={this.createLine}>New</button><button onClick={this.saveCart}>Save</button>
                </div>
            </div>
        );
    }


}
