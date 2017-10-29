## Data Fetching

At a bare minimum you may want to use [HTML5 Fetch API][fetch] as an HTTP client utility for
making Ajax request to the [data API server][nodeapi]. This API is supported natively in all the
major browsers except for IE (note, that Edge browser does support Fetch).

In order to avoid the amount of boilerplate code needed when using the raw `fetch(..)`
function, a simple wrapper was created that provides a base URL of the data API server, credentials
(cookies), CORS etc. For example, in a browser environment the base URL of the data API server
might be an empty string, so when you make an Ajax request to the `/graphql` endpoint it's being
sent to the same origin, and when the same code is executed on the server, during server-side
rendering, it fetches data from the `http://api:8080/graphql` endpoint (`node-fetch` doesn't
support relative URLs for obvious reasons).

Because of these subtle differences of how the `fetch` method works internally, it makes total
sense to pass it as a `context` variable to your React application, so it can be used from either
routing level or from inside your React components as follows:

#### Route Example

```js
{
  path: '/posts/:id',
  async action({ params, fetch }) {
    const resp = await fetch(`/api/posts/${params.id}`, { method: 'GET' });
    const data = await resp.json();
    return { title: data.title, component: <Post {...data} /> };
  }
}
```

#### React Component

```js
class Post extends React.Component {
  static contextTypes = { fetch: PropTypes.func.isRequired };
  handleDelete = (event) => {
    event.preventDefault();
    const id = event.target.dataset['id'];
    this.context.fetch(`/api/posts/${id}`, { method: 'DELETE' }).then(...);
  };
  render() { ... }
}
```
