import * as t from 'io-ts'

import type { CustomText } from '../text'

export const Answer = t.type({ answer: t.string })

export const Blank = t.intersection([
  // These props have been present from the beginning, and are therefore required
  t.type({
    type: t.literal('textBlank'),
    children: t.unknown,
    blankId: t.string,
    correctAnswers: t.array(Answer),
  }),
  // These props have been added later, and are therefore optional. They could be
  // made required, if a DB migration was done to populate all Blanks with them.
  t.partial({
    acceptMathEquivalents: t.boolean,
    // Here we could specify incorrect answers for this blank with specific learner feedback
    // incorrectAnswers?: Answer[]
    // Here we could add a default feedback for the learner
    // defaultIncorrectAnswerFeedback: string
  }),
])
// BlankType is used internally within the BlanksExercise, in order to satisfy io-ts.
// BlankInterface is used within Slate, as io-ts can't convert CustomText interface.
// A long term solution would be to switch Text plugin's types/interfaces to io-ts completely.
export type BlankType = t.TypeOf<typeof Blank>
export interface BlankInterface extends t.TypeOf<typeof Blank> {
  children: CustomText[]
}

export type BlanksMode = 'typing' | 'drag-and-drop'

export enum TableType {
  OnlyColumnHeader = 'OnlyColumnHeader',
  OnlyRowHeader = 'OnlyRowHeader',
  ColumnAndRowHeader = 'RowAndColumnHeader',
}
