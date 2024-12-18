export const pluginHelpContent = {
  text: {
    video: undefined,
    content: {
      plugin: 'rows',
      state: [
        {
          plugin: 'text',
          state: [
            {
              type: 'p',
              children: [
                {
                  text: 'Das Text-Plugin ist die Basis einen guten Lebens. Klar.',
                },
              ],
            },
          ],
          id: '4bd2454f-0849-4202-8ac0-5bedc9caf9d1',
        },
        {
          plugin: 'image',
          state: {
            src: 'https://assets.serlo.org/8c3efbb0-bd61-11ef-8e5b-6347c130d591/image.png',
            caption: {
              plugin: 'text',
              state: [{ type: 'p', children: [{ text: '' }] }],
              id: '388109b2-100a-4e16-a227-8c1540f7c726',
            },
          },
          id: '7a827014-6f0f-4a28-b4e6-489ba58d9100',
        },
      ],
    },
  },
  image: {
    video: undefined,
    content: {
      plugin: 'rows',
      state: [
        {
          plugin: 'text',
          state: [{ type: 'p', children: [{ text: 'Hi there!' }] }],
          id: '09d38cbf-070c-44f3-8eb5-6095d61f476a',
        },
      ],
    },
  },
}
