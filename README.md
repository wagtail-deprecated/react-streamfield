# React StreamField [![npm](https://img.shields.io/npm/v/react-streamfield.svg)](https://www.npmjs.com/package/react-streamfield)

Powerful field for inserting multiple blocks with nesting.

Originally created for the [Wagtail CMS](https://wagtail.io/)
thanks to [a Kickstarter campaign](https://kickstarter.com/projects/noripyt/wagtails-first-hatch).

![React StreamField screenshot](https://raw.github.com/noripyt/react-streamfield/master/react-streamfield-screenshot.png)


## Demo

https://noripyt.github.io/react-streamfield/example/


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

That’s it for now! See `example/index.html` for more complex examples.

**More documentation, a better API and live demos will arrive soon!** 

You can also check out
[wagtail-react-streamfield](https://github.com/noripyt/wagtail-react-streamfield)
to see what an integration of this field looks like!
