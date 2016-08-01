import React from 'react';
import {AppTestWidget} from './AppTestWidget';


export class AppSwArticle extends React.Component {


    componentDidMount() {

        APP.notify('AppTestMounted');
    }

componentWillUnmount
    render() {
        return <div>
            AppTest is on the screen...
            <AppTestWidget/>
        </div>
    }


}
