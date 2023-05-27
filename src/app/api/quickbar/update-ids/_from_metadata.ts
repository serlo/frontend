// fetch recently changed from metadata api
// const metadataResponse = (await request(
//   endpoint,
//   metadataQuery
// )) as unknown as {
//   metadata: {
//     entities: {
//       pageInfo: { hasNextPage: boolean }
//       nodes: { type: string[]; identifier: { value: number } }[]
//     }
//   }
// }

// if (metadataResponse.metadata.entities.pageInfo.hasNextPage) {
//   triggerSentry({
//     message: 'quickbar fetcher: more entries than can be handled',
//   })
//   res.status(400).json({
//     error: 'more new entries than expected!',
//   })
// }

// const updatedIds = metadataResponse.metadata.entities.nodes
//   .filter(
//     (entity) =>
//       !entity.type.includes('Quiz') &&
//       !entity.type.includes('Video') &&
//       !entity.type.includes('Applet')
//   )
//   .map((entry) => entry.identifier.value)
