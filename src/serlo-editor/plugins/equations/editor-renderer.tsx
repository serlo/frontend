import clsx from 'clsx'
import { Fragment } from 'react'

import { EquationsProps } from '.'
import { renderSignToString, Sign } from './sign'
import { MathRenderer } from '@/serlo-editor/math'
import { store, selectIsDocumentEmpty } from '@/serlo-editor/store'

export enum TransformationTarget {
  Equation = 'equation',
  Term = 'term',
}

export function EquationsRenderer({ state }: EquationsProps) {
  const transformationTarget = toTransformationTarget(
    state.transformationTarget.value
  )

  const tdPadding = 'px-1 pt-1 pb-3'

  return (
    <div className="py-2.5">
      <table className="whitespace-nowrap">
        <tbody>
          {renderFirstExplanation()}
          {state.steps.map((step, row) => {
            return (
              <Fragment key={row}>
                <tr>
                  <td className={clsx(tdPadding, 'text-right')}>
                    {step.left.value ? (
                      <MathRenderer inline state={step.left.value} />
                    ) : null}
                  </td>
                  <td
                    className={clsx(
                      tdPadding,
                      'py-0 px-[3px] text-center align-baseline'
                    )}
                  >
                    {(row !== 0 ||
                      transformationTarget !== TransformationTarget.Term) && (
                      <MathRenderer
                        inline
                        state={renderSignToString(step.sign.value as Sign)}
                      />
                    )}
                  </td>
                  <td className={clsx(tdPadding, 'align-baseline')}>
                    {step.right.value ? (
                      <MathRenderer inline state={step.right.value} />
                    ) : null}
                  </td>
                  <td className="pl-[5px] align-baseline">
                    {step.transform.value ? (
                      <>
                        |
                        <MathRenderer inline state={step.transform.value} />
                      </>
                    ) : null}
                  </td>
                </tr>
                {selectIsDocumentEmpty(
                  store.getState(),
                  step.explanation.id
                ) ? null : (
                  <tr className="[&_div]:m-0">
                    <td />
                    {renderDownArrow()}
                    <td colSpan={2} className={tdPadding}>
                      {step.explanation.render()}
                    </td>
                  </tr>
                )}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )

  function renderFirstExplanation() {
    if (selectIsDocumentEmpty(store.getState(), state.firstExplanation.id))
      return

    return (
      <>
        <tr className="text-center [&_div]:m-0">
          <td colSpan={3} className={tdPadding}>
            {state.firstExplanation.render()}
          </td>
        </tr>
        <tr className="h-8">
          <td />
          {renderDownArrow()}
        </tr>
      </>
    )
  }
}

export function renderDownArrow() {
  const downArrow = `
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          orient="auto"
          markerUnits="strokeWidth"
          refX="10"
          refY="5"
          viewBox="0 0 20 10"
        >
          <path
            d="M 0,0 l 10,5 l -10,5"
            stroke="#000"
            stroke-width="2"
            fill="none"
            vector-effect="non-scaling-size"
          />
        </marker>
      </defs>

      <line
        x1="10"
        y1="0%"
        x2="10"
        y2="99%"
        stroke="#000"
        stroke-width="2"
        marker-end="url(#arrow)"
        vector-effect="non-scaling-stroke"
      />
    </svg>`
  const downArrowBase64 = Buffer.from(downArrow).toString('base64')

  return (
    <td
      style={{
        backgroundImage: `url('data:image/svg+xml;base64,${downArrowBase64}')`,
        backgroundSize: '20px calc(100% - 10px)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 5px',
      }}
    />
  )
}

export function toTransformationTarget(text: string): TransformationTarget {
  return isTransformationTarget(text) ? text : TransformationTarget.Equation
}

function isTransformationTarget(text: string): text is TransformationTarget {
  return Object.values<string>(TransformationTarget).includes(text)
}
