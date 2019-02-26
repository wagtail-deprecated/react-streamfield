# React StreamField [![npm](https://img.shields.io/npm/v/react-streamfield.svg)](https://www.npmjs.com/package/react-streamfield)

Powerful field for inserting multiple blocks with nesting.

Originally created for the [Wagtail CMS](https://wagtail.io/)
thanks to [a Kickstarter campaign](https://kickstarter.com/projects/noripyt/wagtails-first-hatch).

![React StreamField screenshot](https://raw.github.com/noripyt/react-streamfield/master/react-streamfield-screenshot.png)


## Demo

https://noripyt.github.io/react-streamfield/public/


## Getting started

First, install the package from NPM:

```sh
npm install react-streamfield
```

As of now, there is no definitive React interface, so the only way to use
react-streamfield is to include `import 'react-streamfield';`
in your JavaScript. Create a JSON script in your HTML, it will automatically
create a stream field:

```html
<script type="application/json" data-streamfield="your-field-name">
  {
    "required": true,
    "minNum": null,
    "maxNum": null,
    "blockDefinitions": [
      {
        "key": "title",
        "icon": "<i class=\"fas fa-heading\"></i>"
      }
    ],
    "value": [{"type": "title", "value": "Wagtail is awesome!"}]
  }
</script>
``` 

That’s it for now! See `public/index.html` for more complex examples.

**More documentation, a better API and live demos will arrive soon!** 

You can also check out
[wagtail-react-streamfield](https://github.com/noripyt/wagtail-react-streamfield)
to see what an integration of this field looks like!


## Internet Explorer 11 support

These JavaScript features are used in react-streamfield that are not supported
natively in Internet Explorer 11: 

- `Element.closest(…)`
- `Array.find(…)`
- `Object.entries(…)`
- `CustomEvent`

When using react-streamfield for Internet Explorer 11, you need to include
the polyfills found in the section below, otherwise the package will not work
properly.

`position: sticky;`, a CSS feature used in react-streamfield to give a better
position of type icons in `SIMPLE` layout, is also not supported
by Internet Explorer 11. No polyfill can be used, the type icons is just less
fancy on Internet Explorer 11.


## Polyfills

React-streamfield uses some JavaScript features only available starting
ECMAScript 2015. Some of these features are not handled by browsers such as
Internet Explorer 11.

To maintain compatibility when using react-streamfield, install and import
these polyfills (a polyfill adds a missing JavaScript browser feature):

```json
{
  "dependencies": {
    "core-js": "^2.6.5",
    "element-closest": "^3.0.1",
    "custom-event-polyfill": "^1.0.6"
  }
}
```

```javascript
import 'core-js/shim'
import 'element-closest';
import 'custom-event-polyfill';
```
 

## Webpack stats

https://noripyt.github.io/react-streamfield/public/webpack-stats.html
