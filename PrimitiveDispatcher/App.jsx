import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect as RouterRedirect, hashHistory } from 'react-router';
import {AppTest} from './AppTest.jsx';

var APP = null;


class App extends React.Component {


    constructor(props, context) {
        super(props, context);
        
        APP = this;
        
        this.queue = {};
    }


    attach(event, cb) {
        if ( typeof this.queue[event.toUpperCase()] == 'undefined' )
            this.queue[event.toUpperCase()] = [];
        this.queue[event.toUpperCase()].push(cb);
    }


    detach(event, cb) {
        if (this.queue[event.toUpperCase()]) {
            var tmp = [];
            for (var i=0, l=this.queue[event.toUpperCase()].length; i<l; i++)
                if (this.queue[event.toUpperCase()][i]!=cb)
                    tmp.push(this.queue[event.toUpperCase()][i]);
            this.queue[event.toUpperCase()] = tmp;
        }
    }


    notify(event, arg) {
        if (this.queue[event.toUpperCase()]) {
            for (var i=0, l=this.queue[event.toUpperCase()].length; i<l; i++)
                if (this.queue[event.toUpperCase()][i] instanceof Function)
                    this.queue[event.toUpperCase()][i](arg);
        }
    }


    render() {
        return  <div>
            {React.cloneElement(this.props.children, { app: this })}
        </div>
    }


}


App.contextTypes = {
    router: function() { return React.PropTypes.func.isRequired; }
};


try {
    ReactDOM.render((<Router history={hashHistory}>
        <RouterRedirect from="/" to="/test"/>
        <Route path="/" component={App}>
            <Route path="test" component={AppTest}/>
        </Route>
    </Router>), document.getElementById('app'));
} catch(exc) {
    throw exc;
}
