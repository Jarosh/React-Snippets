import React from 'react';


export class AppTestWidget extends React.Component {


    componentDidMount() {



        setInterval( ()=>{
            APP.notify('onAppTestWidgetTimer', {});
        }, (Math.floor(Math.random()*(5-1))+1) )
        
    }
    
    
    render() {
        return <div>
            AppTestWidget is on the screen...
        </div>
    }


}
