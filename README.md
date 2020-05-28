# React StreamField [![npm](https://img.shields.io/npm/v/react-streamfield.svg)](https://www.npmjs.com/package/react-streamfield) [![Build Status](https://travis-ci.org/wagtail/react-streamfield.svg?branch=master)](https://travis-ci.org/wagtail/react-streamfield)

Powerful field for inserting multiple blocks with nesting.

Originally created for the [Wagtail CMS](https://wagtail.io/)
thanks to [a Kickstarter campaign](https://kickstarter.com/projects/noripyt/wagtails-first-hatch).

![React StreamField screenshot](https://raw.github.com/wagtail/react-streamfield/master/react-streamfield-screenshot.png)


## Demo

https://wagtail.github.io/react-streamfield/public/


## Example usage

To have an idea on how to fully integrate react-streamfield, please check 
[this CodeSandbox demo](https://codesandbox.io/s/lyz2k28jpm?fontsize=14).

For more complex examples, see `example/index.story.js` and
[the corresponding demos](https://wagtail.github.io/react-streamfield/public/)
for more complex examples.

**More documentation will arrive soon!** 

You can also check out
[wagtail-react-streamfield](https://github.com/wagtail/wagtail-react-streamfield)
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

https://wagtail.github.io/react-streamfield/public/webpack-stats.html
