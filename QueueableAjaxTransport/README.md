# Queueable Ajax Transport

As a matter of fact and perhaps the biggest surprise for those who've recently started using React - it doesn't have any built-in AJAX transport, I mean at all, fully absolutely totally ))
With React you're free yo chose whether to use models from Backbone, issue requests manually via jQuery's .ajax() methods or get things a little bit further and resort to more advanced and modern approach like Promises-driven Fetch API. One way or another, this writing is not that much about a specific library that you'll chose but a concept that will

You may want to follow UX best practices and make your UI 'optimistic'. Optimistic UI is the process of showing user-generated changes in the UI without waiting for the server to acknowledge that the change has succeeded, resulting in a user experience that seems faster than is physically possible, since you don’t need to wait for any server roundtrips. Since most user actions in a well-designed app will be successful, it makes sense for almost all parts of an app to be optimistic in this way.

The downside of such approach 

E.g. let's consider the most common case with like/unlike button. User may click sequentially
like -> unlike -> like -> unlike -> ..... -> like -> unlike -> like -> unlike
half a dozen times per second, however half a dozen of simultaneous async requests to the server is definitely not what you may ever want because as for async requests with the great power comes great responsibility and you can't just broadcast a bunch of mutually exclusive calls, sit and wait them to be executed in some particular order giving you any predicted eventual outcome. I.e. in the abovementioned sequence one way or another whatever was at first liked must be left unliked when user at last stops pressing the button anxiously after the final click on 'Unlike', but async requests can't promise you anything like that.
That'w where what I'm calling filterable requests queue comes in handy.

