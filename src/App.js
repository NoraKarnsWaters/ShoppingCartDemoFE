import React, { Component } from 'react';

export default class App extends Component {
    static displayName = App.name;
    createLine = () => {
        var joined = this.state.cart;
        this.setState(
            {
                cart: [...joined, { id: joined.length + 1, name: "his", qty: 12, price: 104.99 }]
            }            
        );
    }

    constructor(props) {
        super(props);
        this.state = { cart: [{ id: 0, name: "hi", qty: 1, price: 10.99 }], loading: false };
    }

    
    
    

    static renderCartTable(cart) {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Unit Price</th>
                        <th>Unit Price</th>
                        <th>Line Total</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(row => (
                        <tr>
                            <td><input value={row.name} /></td>
                            <td><input value={row.qty} /></td>
                            <td><input value={row.price} /></td>
                            <td>$0</td>
                            <td>$0</td>
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
        let contents = App.renderCartTable(this.state.cart);

        return (
            <div>
                {contents}
                <button onClick={this.createLine}>New</button>
            </div>
        );
    }


}
