import json


def generate_block(i):
    return {
        'type': 'block-type',
        'value': [
            {'type': 'start_date', 'value': f'{1768+i}-03-04'},
            {'type': 'public', 'value': True},
            {'type': 'size', 'value': 3.14},
            {'type': 'color', 'value': '#F11C32'},
            {'type': 'sub-blocks', 'value': [
                {
                    'type': 'sub-block-type',
                    'value': [
                        {'type': 'name', 'value': 'admin'},
                        {'type': 'password', 'value': 'admin'},
                        {'type': 'sub-sub-blocks', 'value': [
                            {'type': 'sub-sub-block-type',
                             'html': '<input type="text" '
                                     "name='field-__ID__' />"
                                     '<div>'
                                     '<small>Or hi, if you prefer.</small>'
                                     '</div>',
                             'value': 'hello'},
                            {'type': 'sub-sub-block-type', 'value': 'world'},
                        ]},
                    ]
                },
            ]},
        ]
    }


print(
    json.dumps(
        [{'type': 'title', 'value': 'Wagtail is awesome!'},
         {'type': 'text', 'value': 'And it’s always getting better! 😃'}] +
        [generate_block(i) for i in range(50)]
    )
)
