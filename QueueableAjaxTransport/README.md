# Queueable Ajax Transport

Perhaps the biggest surprise for those who've recently started using React - it
doesn't have any built-in AJAX transport, I mean totally, absolutely... With
React you're free to chose whether to use models from Backbone, send requests
manually via jQuery's .ajax() method, utilize any other 3rd-party library, or go
a little bit further and resort to more advanced and modern approach like
Promises-driven Fetch API. One way or another, this writing is not as much about
a specific library but about the concept that I believe should be one way or
another implemented on the lowermost AJAX layer of your application.

As for this particular snippet Fetch API is being used. That works good enough
out of the box in most of modern browsers: Chrome, Firefox and Safari. Also it
can be easily polyfilled wherever not supported natively, i.e. for elder
versions of those browsers as well as for IE. I'm using
[whatwg-fetch polyfill](https://github.com/github/fetch) in my projects, so far
everything seems to be ok with this one.

So, few words on what's this all about, at last.

I assume you may want to follow UX best practices and make your UI 'optimistic'.
Optimistic UI is the process of showing user-generated changes in the UI without
waiting for the server to acknowledge that the change has succeeded, resulting
in a user experience that seems faster than is physically possible, since you
don’t need to wait for any server roundtrips. Since most user actions in a
well-designed applications will be successful, it makes sense for almost all
parts of an application to be optimistic in this way.

However, it's the place where all the power of asynchrony shows itself as the
biggest bliss and the biggest curse at the same time. According to optimistic UI
main concept described above any button that is triggering AJAX call, once was
clicked, should be considered as clickable again immediately. But that's an
obvious trap in the most cases. Let's consider the most common case with
'like/unlike' button. User may click sequentially:
`like -> unlike -> like -> unlike -> ..... -> like -> unlike -> like -> unlike`
half a dozen times per second, however half a dozen of simultaneous async
requests to the server is definitely not what you may ever want, because as for
async requests with the great power comes great responsibility and you can't
just broadcast a bunch of mutually exclusive calls, sit and wait them to be
executed in some particular order thus giving you any predicted eventual outcome.
Obviously, in the abovementioned sequence one way or another whatever was at
first liked must be left unliked when user stops pressing the button furiously
after the final click on 'Unlike'. But async requests can't promise you anything
like that. Calls of that sequence when sent in a row (without awaiting return
from the previous) may be executed in ANY order giving you unpredicted behaviour.

To prevent all those horrors and develop really nice UI with fully predictable
behaviour you'll need to:
- postpone homogeneous subsequent requests unless previous one is finished by
putting them in a queue;
- filter out recurring requests that don't make sense.

That's where what's I'm calling filterable requests queue (implemented by this
snippet) comes in handy.

Just include Api class into a chain of inheritance of classes requiring to
perform AJAX calls, and then make calls as easy as by invoking
`this.api('/path/to/your/api')`
with a path as an argument, and then calling one of four methods: get, post,
put, delete; with optional data associated with particular call. Returned
Promise object then may be operated in a needed way on your code side.

```
javascript

this.api('/article/'+id+'/comments', 'commenting-article-'+id).post({
    comment: this.refs.Comment.getText().trim(),
})
    .then((res) => {
        // on success
    })
    .catch((exc) => {
        // on error
    });
```


If 'alias' argument of the api() method is not provided, then by default  every
request is considered to be unique and non-related to any other, but as soon as
'alias' was specified requests with the same alias will be grouped and
distributed into queues.

For mutually-exclusive calls (e.g. like/unlike, follow/unfollow) everything is
as easy as:


```
javascript

this.api('/article/'+id+'/rating', 'rating-article-'+id).post()
    .then((res) => {
        // on success
    })
    .catch((exc) => {
        // on error
    });

this.api('/article/'+id+'/rating', 'rating-article-'+id).delete()
    .then((res) => {
        // on success
    })
    .catch((exc) => {
        // on error
    });
```

Even if being called almost simultaneosly, DELETE call will wait in a queue for
preceeding POST call with the same alias `'rating-article-'+id` to finish and
only then will be put for execution.
