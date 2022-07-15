import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

export default class App extends Component {
    static displayName = App.name;

    //Get's the total sum of the cart through passing in the JSON array and giving a looped sum
    getSum(cart) {
        var sum = 0;
        cart.forEach(x => { sum += x.price * x.qty });
        return sum;
    }

    //Creates a new line inside the shopping cart with given ID and default values. After generation it adds it to the state which then rerenders the view
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

    //The onChange event for any values to keep the state updated so it can be processed and sent to the DB on save, as well as update values within the table in real time
    handleChange(key, row, e) {
        var newCart = this.state.cart;
        var val = e.target.value;
        console.log(val);

        if (key === "qty" || key === "price")
            val = parseFloat(val.replace(/,/g, ''));

        newCart[row.id - 1][key] = val;
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
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Line Total</th>
                        <th scope="col">Total: ${total}</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(row => (
                        <tr key={row.id}>
                            <td><input type="text" value={row.name} onChange={(e) => handleChange("name", row, e)}/></td>
                            <td><input type="number" value={row.qty} onChange={(e) => handleChange("qty", row, e)} /></td>
                            <td>$<NumberFormat value={row.price} allowNegative={false} allowEmptyFormatting={true} displayType={'input'} isNumericString={true} decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} onChange={(e) => handleChange("price", row, e)} /></td>
                            <td><NumberFormat value={row.price} allowNegative={false} allowEmptyFormatting={true} displayType={'text'} isNumericString={true} decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} prefix={'$'} /></td>
                            <td><NumberFormat value={row.price * row.qty} allowNegative={false} allowEmptyFormatting={true} displayType={'text'} isNumericString={true} decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} prefix={'$'} /></td>
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
