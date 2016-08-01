# Counters Storage

You may have counters of all sorts spreaded all over your DOM and rendered
within different React components. E.g. counter for a "number of comments" of
some particular article may be placed under article itself, in articles listing,
in sidebar that contains popular articles etc. It's a good practice to increment
that value as soon as current user posted a comment, however it may seem hard
enough to keep track of all those potential counters all over the place.

This small component is a solution of described problem.

- Think of unique names for your counters.
- Display counters by putting Counter component's tag into `render()` methods
of any of your components:

`<Counter name={'article-commented-'+article.id} value={article.num_comments} />`

(`value` attribute stays for initial value of a counter);

- When increment (decrement may be done by passing negative integer) of some
particular counter is required, call static `add` method wherever needed:

`Counter.add('article-commented-'+article.id, 1);`

each call to `add` will update values of needed `<Counter>` among those being
currently rendered.
