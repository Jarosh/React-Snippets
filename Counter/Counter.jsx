import React from 'react';


export class Counter extends React.Component {


    static add(counter, value) {
        if (typeof Counter.storage === 'undefined')
            Counter.storage = [];
        for (var i=0, l=Counter.storage.length; i<l; i++)
            if (Counter.storage[i].props.name==counter)
                Counter.storage[i].update(Counter.storage[i].value()+value);
    }


    constructor(props) {
        super(props);

        this.state = {};
    }


    componentDidMount() {
        Counter.storage.push(this);
    }


    // utilizes without() method from Underscore.js
    componentWillUnmount() {
        Counter.storage = _.without(Counter.storage, this);
    }


    update(value) {
        this.setState({value:value});
    }


    value() {
        return (typeof this.state.value !== 'undefined')
            ? this.state.value
            : this.props.value;
    }


    render() {
        return <span className={this.constructor.name}>
            {this.value()}
        </span>
    }


}
