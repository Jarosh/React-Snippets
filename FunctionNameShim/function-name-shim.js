(function() {
    if (
        !( 'name' in Function.prototype && 'name' in (function f(){}) ) // whether needed or not
        &&
        ( typeof Object.defineProperty === 'function' ) // whether can be defined
        &&
        ( function() {
            var r;
            try {
                Object.defineProperty( Function.prototype, '_tst', {
                    get: function() {
                        return 'test';
                    },
                    configurable: true
                } );
                r = (Function.prototype._tst==='test');
                delete Function.prototype._tst;
            }
            catch (e) {
                r = false;
            }
            return r;
        } )()
    )
        Object.defineProperty(Function.prototype, 'name', {
            get: function() {
                return (this===Function || this===Function.prototype.constructor)
                    ? 'Function'
                    : ( (this!==Function.prototype)
                        ? (''+this).replace(/^[\S\s]*?function\s*/, '').replace(/[\s\(\/][\S\s]+$/, '')
                        : ''
                    );
          }
      });
})();
