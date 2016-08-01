import React from 'react';
import {AppTestWidget} from './AppTestWidget';


export class AppTest extends React.Component {

    
    constructor(props, context) {
        super(props, context);

        this.state = {
            message_from_widget: 0
        };

        this.handleTestWidgetTimer = (message) => {
            this.setState({message_from_widget:message});
        }
    }


    componentWillMount() {
        APP.attach('onAppTestWidgetTimer', this.handleTestWidgetTimer);
    }


    componentWillUnmount() {
        APP.detach('onAppTestWidgetTimer', this.handleTestWidgetTimer);
    }


    render() {
        return <div>
            <div>
                AppTest is on the screen...
            </div>
            <AppTestWidget/>
            <div>
                AppTestWidget is telling you: {this.state.message_from_widget}
            </div>
        </div>
    }


}
