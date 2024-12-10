export const mockedTextPlugin = {
  plugin: 'text',
  state: [
    {
      type: 'p',
      children: [
        { text: 'In Arabic numerals, the number 123 is written as "١٢٣".' },
      ],
    },
    {
      type: 'p',
      children: [
        {
          text: 'Arabic numerals are the ten digits: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, which are used in most of the world today. However, the term "Arabic numerals" can also refer to the numeral system used in the Arab world, which is different from the Western Arabic numerals.',
        },
      ],
    },
  ],
  id: '3ac1e39b-10d3-422d-8de1-5a25dbefb49f',
}

export const mocked = {
  plugin: 'rows',
  state: [
    mockedTextPlugin,
    {
      plugin: 'serloTable',
      state: {
        rows: [
          {
            columns: [
              {
                content: {
                  plugin: 'text',
                  state: [
                    {
                      type: 'p',
                      children: [{ text: 'Western Arabic Numerals' }],
                    },
                  ],
                  id: '133d5fc4-ab3d-45cd-b13c-472041e9839c',
                },
              },
              {
                content: {
                  plugin: 'text',
                  state: [
                    {
                      type: 'p',
                      children: [{ text: 'Eastern Arabic Numerals' }],
                    },
                  ],
                  id: '4cad151c-de7f-46f6-af45-e8e9ab7681a3',
                },
              },
            ],
          },
          {
            columns: [
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '0' }] }],
                  id: '871c9fd3-a530-497e-99b7-9bac7fa98166',
                },
              },
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '٠' }] }],
                  id: '8ffd36cc-1cb3-438d-bc99-a0d630a78a77',
                },
              },
            ],
          },
          {
            columns: [
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '1' }] }],
                  id: 'b697065b-c248-418c-934b-5d77adaf5175',
                },
              },
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '١' }] }],
                  id: 'a1c1a6be-ef47-4567-9fe7-5a20ac094a4c',
                },
              },
            ],
          },
          {
            columns: [
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '2' }] }],
                  id: '81e608e6-fb67-4518-bb4b-4ad54d77e779',
                },
              },
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '٢' }] }],
                  id: 'e9db77ae-5a3d-47ff-8570-eb79c1b2c746',
                },
              },
            ],
          },
          {
            columns: [
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '3' }] }],
                  id: 'b28056e6-8fa0-488a-aa19-c4addd7ce519',
                },
              },
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '٣' }] }],
                  id: '9e04658a-acb6-4010-9ae3-b4b3f7128ff8',
                },
              },
            ],
          },
          {
            columns: [
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '4' }] }],
                  id: '6d5cb1ca-7ad5-43c0-92ef-192d2a704ef9',
                },
              },
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '٤' }] }],
                  id: '202329f2-8755-450b-995f-407537f10a7c',
                },
              },
            ],
          },
          {
            columns: [
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '5' }] }],
                  id: 'af66cca9-f17c-455c-892a-29fda25210ce',
                },
              },
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '٥' }] }],
                  id: '5f74e2ff-ca30-40ca-8e6f-ed2bae6497c5',
                },
              },
            ],
          },
          {
            columns: [
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '6' }] }],
                  id: 'c3a1a6f1-6ea7-41c0-a9ee-d3ab759324db',
                },
              },
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '٦' }] }],
                  id: '90b5fa96-7c94-4db5-ba33-5003df690b7d',
                },
              },
            ],
          },
          {
            columns: [
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '7' }] }],
                  id: '00d8d0ad-e0e6-4157-9eb9-94d2e948b7df',
                },
              },
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '٧' }] }],
                  id: 'c3654028-a663-494a-8f5b-a5ee9c6a6d6b',
                },
              },
            ],
          },
          {
            columns: [
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '8' }] }],
                  id: '484513f0-97fd-42aa-a4fc-9197f0bc5d1d',
                },
              },
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '٨' }] }],
                  id: '2883ad29-2ab8-44e2-bb6d-016448ab233d',
                },
              },
            ],
          },
          {
            columns: [
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '9' }] }],
                  id: '9dacf697-200e-4b7b-8782-654eb958503a',
                },
              },
              {
                content: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '٩' }] }],
                  id: 'f91a43f1-41f7-4b84-b582-0acee1c38efb',
                },
              },
            ],
          },
        ],
        tableType: 'default',
      },
      id: '4c5e4485-1ea5-4793-aa1a-1de36f12a9a9',
    },
  ],
}
