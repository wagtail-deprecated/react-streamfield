import { storiesOf } from '@storybook/react';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { StreamField, streamFieldReducer } from '../src';

import { complexNestedStreamField } from './samples'

const store = createStore(streamFieldReducer, applyMiddleware(thunk));

storiesOf('React StreamField demo', module)
.addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('1 block type', () => {
    const props = {
      required: true,
      blockDefinitions: [
        {
          key: 'title',
          icon: '<i class="fas fa-heading fa-fw"></i>',
          className: 'full title',
          html: '<input type="text" name="field-__ID__" />'
        }
      ],
      value: [{ type: 'title', value: 'Wagtail is awesome!' }]
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('1 open block type', () => {
    const props = {
      required: true,
      blockDefinitions: [
        {
          key: 'title',
          icon: '<i class="fas fa-heading fa-fw"></i>',
          className: 'full title',
          closed: false,
          html: '<input type="text" name="field-__ID__" />'
        }
      ],
      value: [{ type: 'title', value: 'Wagtail is awesome!' }]
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('1 static block type', () => {
    const props = {
      required: true,
      blockDefinitions: [
        {
          key: 'static',
          isStatic: true,
          html: 'Some static block'
        }
      ],
      value: [{ type: 'static' }]
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('1 block type, default value', () => {
    const props = {
      required: true,
      blockDefinitions: [
        {
          key: 'title',
          default: 'The default title',
          icon: '<i class="fas fa-heading fa-fw"></i>',
          className: 'full title',
          html: '<input type="text" name="field-__ID__" />'
        }
      ],
      value: [{ type: 'title', value: 'Wagtail is awesome!' }]
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('1 block type, custom per-value HTML', () => {
    const props = {
      required: true,
      blockDefinitions: [
        {
          key: 'title',
          icon: '<i class="fas fa-heading fa-fw"></i>',
          className: 'full title',
          html: '<input type="text" name="field-__ID__" />'
        }
      ],
      value: [
        {
          type: 'title',
          html:
            '<div style="padding: 6px 12px 0; color: grey;">Do you see it?</div> <input type="text" name="field-__ID__" />',
          value: 'Custom HTML for this value!'
        },
        { type: 'title', value: 'This time, no custom HTML.' }
      ]
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('2 block types', () => {
    const props = {
      required: true,
      blockDefinitions: [
        {
          key: 'title',
          icon: '<i class="fas fa-heading fa-fw"></i>',
          className: 'full title',
          html: '<input type="text" name="field-__ID__" />'
        },
        {
          key: 'text',
          icon: '<i class="fas fa-align-justify fa-fw"></i>',
          className: 'full',
          html: '<textarea name="field-__ID__"></textarea>'
        }
      ],
      value: [
        { type: 'title', value: 'Wagtail is awesome!' },
        { type: 'text', value: 'And it’s always getting better 😃' }
      ]
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('List block, 1 child block type', () => {
    const props = {
      required: true,
      blockDefinitions: [
        {
          key: 'list',
          children: [
            {
              key: 'bool',
              html: '<input type="checkbox" name="field-__ID__" />'
            }
          ]
        }
      ],
      value: [
        {
          type: 'list',
          value: [{ type: 'bool', value: true }, { type: 'bool', value: false }]
        }
      ]
    };

    return <StreamField {...props} id='stream' />;
  })
  .add('List block, 1 child block type, default value', () => {
    const props = {
      required: true,
      blockDefinitions: [
        {
          key: 'list',
          children: [
            {
              key: 'bool',
              html: '<input type="checkbox" name="field-__ID__" />'
            }
          ],
          default: [{ type: 'bool', value: true }]
        }
      ],
      value: []
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('List block, 1 child block type, custom HTML', () => {
    const props = {
      required: true,
      blockDefinitions: [
        {
          key: 'list',
          children: [
            {
              key: 'bool',
              html: '<input type="checkbox" name="field-__ID__" />'
            }
          ],
          html:
            'As you can see by this text, it’s possible <strong>to insert some HTML</strong> before or after the contained blocks. <noscript data-blocks-container></noscript> You can even have multiple times the same blocks container. <noscript data-blocks-container></noscript> Can’t think of a case where that would be useful, but still, it’s possible if you really want it.'
        }
      ],
      value: []
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('List block, 2 children block types with groups', () => {
    const props = {
      required: true,
      blockDefinitions: [
        {
          key: 'list',
          children: [
            {
              key: 'title',
              icon: '<i class="fas fa-heading fa-fw"></i>',
              className: 'full title',
              group: 'Text',
              html: '<input type="text" name="field-__ID__" />'
            },
            {
              key: 'bool',
              group: 'Other',
              html: '<input type="checkbox" name="field-__ID__" />'
            },
            {
              key: 'second_bool',
              group: 'Other',
              html: '<input type="checkbox" name="field-__ID__" />'
            },
            {
              key: 'third_bool',
              html: '<input type="checkbox" name="field-__ID__" />'
            }
          ],
          default: [
            { type: 'title', value: 'Lorem ipsum' },
            { type: 'bool', value: true }
          ]
        }
      ],
      value: [
        {
          type: 'list',
          value: [
            { type: 'title', value: 'NoriPyt rocks!' },
            { type: 'bool', value: false }
          ]
        }
      ]
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('Simple block layout', () => {
    const props = {
      required: true,
      blockDefinitions: [
        {
          key: 'title',
          layout: 'SIMPLE',
          icon: '<i class="fas fa-heading fa-fw"></i>',
          className: 'full title',
          html: '<input type="text" name="field-__ID__" />'
        },
        {
          key: 'text',
          layout: 'SIMPLE',
          icon: '<i class="fas fa-align-justify fa-fw"></i>',
          className: 'full',
          html: '<textarea name="field-__ID__"></textarea>'
        },
        {
          key: 'static',
          layout: 'SIMPLE',
          isStatic: true,
          html: 'Some static block'
        }
      ],
      value: [
        { type: 'title', value: 'Wagtail is awesome!' },
        { type: 'text', value: 'And it’s always getting better 😃' },
        { type: 'static' }
      ]
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('Mixed block layouts', () => {
    const props = {
      required: true,
      blockDefinitions: [
        {
          key: 'title',
          layout: 'SIMPLE',
          icon: '<i class="fas fa-heading fa-fw"></i>',
          className: 'full title',
          html: '<input type="text" name="field-__ID__" />'
        },
        {
          key: 'text',
          icon: '<i class="fas fa-align-justify fa-fw"></i>',
          className: 'full',
          html: '<textarea name="field-__ID__"></textarea>'
        },
        {
          key: 'static',
          layout: 'SIMPLE',
          isStatic: true,
          html: 'Some static block'
        }
      ],
      value: [
        { type: 'title', value: 'Wagtail is awesome!' },
        { type: 'text', value: 'And it’s always getting better 😃' },
        { type: 'static' }
      ]
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('Gutter of add buttons', () => {
    const props = {
      required: true,
      gutteredAdd: true,
      blockDefinitions: [
        {
          key: 'text',
        }
      ],
      value: []
    };
    return <StreamField {...props} id='stream' />
  })
  .add('Maximum number of blocks', () => {
    const props = {
      required: true,
      minNum: null,
      maxNum: 2,
      blockDefinitions: [
        {
          key: 'list',
          maxNum: 5,
          children: [
            {
              key: 'bool',
              html: '<input type="checkbox" name="field-__ID__" />'
            }
          ]
        }
      ],
      value: [
        {
          type: 'list',
          value: [{ type: 'bool', value: true }, { type: 'bool', value: false }]
        }
      ]
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('Error in one of the nested blocks', () => {
    const props = {
      required: true,
      blockDefinitions: [
        {
          key: 'list',
          children: [
            {
              key: 'bool',
              html: '<input type="checkbox" name="field-__ID__" />'
            }
          ]
        }
      ],
      value: [
        {
          type: 'list',
          value: [
            { type: 'bool', value: true },
            { type: 'bool', value: false, hasError: true }
          ]
        }
      ]
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('Struct block', () => {
    const props = {
      blockDefinitions: [
        {
          key: 'struct',
          isStruct: true,
          children: [
            {
              key: 'some_field'
            },
            {
              key: 'another_field'
            }
          ],
          label: 'Struct'
        }
      ],
      value: []
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('Struct block with default value', () => {
    const props = {
      blockDefinitions: [
        {
          key: 'struct',
          isStruct: true,
          children: [
            {
              key: 'some_field',
              default: 'Lorem'
            },
            {
              key: 'another_field',
              default: 'Ipsum'
            }
          ],
          label: 'Struct'
        }
      ],
      value: []
    };

    return <StreamField {...props} id='stream' />;
  })
  .add('Struct block with custom HTML', () => {
    const props = {
      blockDefinitions: [
        {
          key: 'struct',
          isStruct: true,
          children: [
            {
              key: 'some_field'
            },
            {
              key: 'another_field'
            }
          ],
          label: 'Struct',
          html:
            'Like for lists, we can add HTML before struct fields <noscript data-blocks-container></noscript> and after as well.'
        }
      ],
      value: []
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('Struct block as a struct block field', () => {
    const props = {
      value: [],
      blockDefinitions: [
        {
          key: 'struct',
          isStruct: true,
          children: [
            {
              key: 'some_field'
            },
            {
              key: 'link',
              isStruct: true,
              children: [
                {
                  key: 'url',
                  label: 'URL',
                  default: 'https://noripyt.com'
                },
                {
                  key: 'email',
                  label: 'E-mail'
                }
              ]
            },
            {
              key: 'another_field'
            }
          ],
          label: 'Struct'
        }
      ]
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('StructBlock as a list block child', () => {
    const props = {
      required: true,
      blockDefinitions: [
        {
          key: 'list',
          children: [
            {
              key: 'link',
              isStruct: true,
              children: [
                {
                  key: 'url',
                  label: 'URL'
                },
                {
                  key: 'email',
                  label: 'E-mail'
                }
              ]
            }
          ]
        }
      ],
      value: []
    };
    return <StreamField {...props} id='stream' />;
  })
  .add('Complex nested StreamField', () => {
    return <StreamField {...complexNestedStreamField} id='stream' />;
  })
  .add('Custom action icons', () => {
    const props = {
      required: true,
      icons: {
        add: '<i aria-hidden="true">⊕</i>',
        moveUp: '<i aria-hidden="true">⇑</i>',
        moveDown: '<i aria-hidden="true">⇓</i>',
        duplicate: '<i aria-hidden="true">⎘</i>',
        delete: '<i aria-hidden="true">×</i>',
        grip: '<i aria-hidden="true">↕</i>'
      },
      blockDefinitions: [
        {
          key: 'title',
          layout: 'SIMPLE',
          className: 'full title',
          html: '<input type="text" name="field-__ID__" />'
        }
      ],
      value: [{ type: 'title', value: 'Wagtail is awesome!' }]
    };

    return <StreamField {...props} id='stream' />;
  })
  .add('JavaScript widget', () => {
    const props = {
      required: true,
      blockDefinitions: [
        {
          key: 'date',
          layout: 'SIMPLE',
          dangerouslyRunInnerScripts: true,
          html: '<input type="text" name="field-__ID__" id="field-__ID__" />' +
            '<script>flatpickr("#field-__ID__");</script>',
        },
      ],
      value: [],
    };
    return <StreamField {...props} id="stream" />;
  });
