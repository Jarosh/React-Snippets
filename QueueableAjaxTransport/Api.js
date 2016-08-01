import React from 'react';


export class Api extends React.Component {


    api(api, alias=null, options={credentials: 'include'}) {

        api = api.replace(/^\/*/, '');
        
        if (typeof this.api.queue === 'undefined')
            this.api.queue = [];
        
        var queue = this.api.queue;

        return {

            get: function (data={}) {
                var arg = [];
                for (let k in data) {
                    if (data.hasOwnProperty(k))
                        arg.push(k+'='+data[k]);
                }
                if (arg.length) {
                    if (api.indexOf('?')<0)
                        api += '?';
                    api += ((api.slice(-1)!='?' && api.slice(-1)!='&') ? '&' : '') + arg.join('&');
                }
                return this.call();
            },

            delete: function (data={}) {
                var arg = [];
                for (let k in data) {
                    if (data.hasOwnProperty(k))
                        arg.push(k+'='+data[k]);
                }
                if (arg.length) {
                    if (api.indexOf('?')<0)
                        api += '?';
                    api += ((api.slice(-1)!='?' && api.slice(-1)!='&') ? '&' : '') + arg.join('&');
                }
                return this.call('DELETE');
            },

            post: function (data={}) {
                return this.call('POST', data);
            },

            put: function (data={}) {
                return this.call('PUT', data);
            },

            call: function (method='GET', data={}) {
                options['method'] = method.toUpperCase().trim();

                var r = null;

                var key = alias ? alias.trim() : (options['method']+' '+Math.random()+' '+api);

                if (options['method']=='POST' || options['method']=='PUT') {
                    var form = new FormData();
                    for (var k in data) {
                        form.append(k, data[k]);
                    }
                    options['body'] = form;
                }

                if (typeof queue[key] === 'undefined')
                    queue[key] = [];
                
                for (var i=0, l=queue[key].length; i<l; i++) {
                    if (queue[key][i][1]==api) {
                        queue[key].splice(i+1, queue[key].length-i-1);
                        break;
                    }
                }

                if ( !queue[key].length || queue[key][queue[key].length-1][1] != api ) {
                    queue[key].push([false,api,options]);
                }

                var exe = ()=>{
                    if (queue[key].length && !queue[key][0][0]) {
                        queue[key][0][0] = true;
                        r = fetch(/*'//'+API_HOST+*/'/'+queue[key][0][1], queue[key][0][2])
                            .then((res) => {
                                if (res.status<200 || res.status>=300)
                                    throw Promise.resolve(res);
                                return res.json();
                            })
                            // this case is my project-specific and it is checking
                            // for presence of Body key within the top of a JSON response;
                            // you are free to replace it with any extra checkings here
                            // or comment out this particular 'then' at all;
                            .then((res) => {
                                queue[key].shift();
                                exe();
                                return (typeof res.Body != 'undefined')
                                    ? res.Body
                                    : Promise.reject('Malformed JSON received.');
                            })
                            .catch((exc) => {
                                queue[key].shift();
                                exe();
                                if (!(exc instanceof Promise)) {
                                    exc = null;
                                }
                                return Promise.reject(exc);
                            });
                    }
                };

                exe();

                return r ? r : Promise.reject(777);
            }

        };
    }


}
