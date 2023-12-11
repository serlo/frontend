// import { UniqueIdentifier, useDraggable } from '@dnd-kit/core'

// export function BlankSolution(props: {
//   text: string
//   draggableId: UniqueIdentifier
// }) {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id: props.draggableId,
//   })
//   const style = transform
//     ? {
//         transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
//       }
//     : undefined

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...listeners}
//       {...attributes}
//       className="inline-block h-full rounded-full border border-editor-primary-300 bg-editor-primary-100 px-2"
//     >
//       {props.text}
//     </div>
//   )
// }
