export const complexNestedStreamField = {
  required: true,
  blockDefinitions: [
    {
      key: "title",
      icon: "<i class='fas fa-heading fa-fw'></i>",
      className: "full title",
      html: "<input type='text' name='field-__ID__' />"
    },
    {
      key: "text",
      icon: "<i class='fas fa-align-justify fa-fw'></i>",
      className: "full",
      html: "<textarea name='field-__ID__'></textarea>"
    },
    {
      key: "block-type",
      label: "Block type",
      icon: "<i class='fas fa-heart fa-fw'></i>",
      titleTemplate: "${start_date} — ${end_date}",
      isStruct: true,
      children: [
        {
          key: "start_date",
          html: "<input type='date' name='field-__ID__' />",
          required: true
        },
        {
          key: "end_date",
          html: "<input type='date' name='field-__ID__' />",
          required: true
        },
        {
          key: "image",
          html: "<input type='file' accept='image/*' name='field-__ID__' />"
        },
        {
          key: "public",
          html: "<input type='checkbox' name='field-__ID__' />"
        },
        {
          key: "tags"
        },
        {
          key: "size",
          html: "<input type='number' name='field-__ID__' />"
        },
        {
          key: "color",
          html: "<input type='color' name='field-__ID__' />"
        },
        {
          key: "sub-blocks",
          children: [
            {
              key: "sub-block-type",
              label: "Sub-block type",
              icon: "<i class='fas fa-heartbeat fa-fw'></i>",
              isStruct: true,
              children: [
                {
                  key: "name"
                },
                {
                  key: "password",
                  html: "<input type='password' name='field-__ID__' />"
                },
                {
                  key: "sub-sub-blocks",
                  children: [
                    {
                      key: "sub-sub-block-type",
                      name: "Sub-sub-block type",
                      icon: "<i class='fas fa-smile fa-fw'></i>"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      default: [
        { type: "color", value: "#00FF00" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "lorem" },
                { type: "password", value: "ipsum" },
                {
                  type: "sub-sub-blocks",
                  value: [{ type: "sub-sub-block-type", value: "blablabla" }]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  value: [
    { type: "title", value: "Wagtail is awesome!" },
    {
      type: "text",
      value: "And it\u2019s always getting better! \ud83d\ude03"
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1768-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1769-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1770-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1771-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1772-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1773-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1774-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1775-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1776-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1777-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1778-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1779-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1780-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1781-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1782-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1783-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1784-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1785-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1786-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1787-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1788-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1789-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1790-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1791-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1792-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1793-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1794-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1795-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1796-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1797-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1798-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1799-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1800-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1801-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1802-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1803-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1804-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1805-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1806-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1807-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1808-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1809-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1810-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1811-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1812-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1813-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1814-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1815-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1816-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "block-type",
      value: [
        { type: "start_date", value: "1817-03-04" },
        { type: "public", value: true },
        { type: "size", value: 3.14 },
        { type: "color", value: "#F11C32" },
        {
          type: "sub-blocks",
          value: [
            {
              type: "sub-block-type",
              value: [
                { type: "name", value: "admin" },
                { type: "password", value: "admin" },
                {
                  type: "sub-sub-blocks",
                  value: [
                    {
                      type: "sub-sub-block-type",
                      html:
                        "<input type=\"text\" name='field-__ID__' /><div><small>Or hi, if you prefer.</small></div>",
                      value: "hello"
                    },
                    { type: "sub-sub-block-type", value: "world" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
