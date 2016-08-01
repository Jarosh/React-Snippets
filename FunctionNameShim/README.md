# Function.name Shim

Personally I prefer to keep everything straight and well-ordered, and set
'className' property for a renderable outermost container of every react
component equal to that component's name:

```javascript
    render() {
        return <div className={'com-'+this.constructor.name}></div>
    }
```

e.g. normally the code above will render DIV with a 'className' property (i.e.
'class' HTML attribute) equal to 'comAppTest' when `render()` method was invoked
from within component named AppTest, to 'comAppMain' when it was invoked from
within AppMain component etc. respectively. However what's assumed to be
'normally' is not always applicable to all the browsers, especially IE that
doesn't have 'name' property of a Function out of the box. Surprisingly enough
as for a moment of this writing none of more or less official polyfills/shims
provide such support either.

So, one way or another, __If the hill will not come to Mahomet, Mahomet will go to the hill.__
