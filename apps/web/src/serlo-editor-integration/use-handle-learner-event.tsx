import { LearnerEventData } from '@editor/plugin/helpers/editor-learner-event'
import XAPI from '@xapi/xapi'

import { useAuthentication } from '@/auth/use-authentication'
import { useEntityData } from '@/contexts/uuids-context'

const endpoint = 'https://watershedlrs.com/api/organizations/25975/lrs'
const key = '97c9dcdcc2b2d8' //
const secret = '44ac953d3f72a4'
const auth = XAPI.toBasicAuth(key, secret)
const xapi = new XAPI({
  endpoint,
  auth,
})

/**
 * Quick example of how a xAPI implementation could look like
 */
export function useSerloHandleLearnerEvent() {
  const auth = useAuthentication()
  const { entityId } = useEntityData()

  function handleLearnerEvent(data: LearnerEventData) {
    // eslint-disable-next-line no-console
    console.log(data)

    const result =
      data.correct !== undefined ? { success: data.correct } : undefined
    const shortId = data.pluginId?.split('-')[0]

    void xapi.sendStatement({
      statement: {
        actor: {
          objectType: 'Agent',
          name: auth?.username ?? '___testuser___',
          account: {
            homePage: 'https://serlo.org',
            name: String(auth?.id ?? '___testuser___'),
          },
        },
        verb: verbMap[data.verb],
        object: {
          objectType: 'Activity',
          id: `https://serlo.org/${entityId}#${shortId}`,
          definition: {
            name: {
              'en-US': data.contentType,
            },
            interactionType: interactionTypeMap[data.contentType],
            type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
          },
        },
        result,
      },
    })
  }

  return handleLearnerEvent
}

const verbMap = {
  opened: {
    id: 'http://activitystrea.ms/schema/1.0/open',
    display: {
      'en-US': 'opened',
    },
  },
  attempted: {
    id: 'http://adlnet.gov/expapi/verbs/attempted',
    display: {
      'en-US': 'attempted',
    },
  },
  interacted: {
    id: 'http://adlnet.gov/expapi/verbs/interacted',
    display: {
      'en-US': 'interacted',
    },
  },
  answered: {
    id: 'http://adlnet.gov/expapi/verbs/answered',
    display: {
      'en-US': 'answered',
    },
  },
} as const

// https:github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#interaction-types
//true-false, choice, fill-in, long-fill-in, matching, performance, sequencing, likert, numeric, other
const interactionTypeMap = {
  'input-exercise': 'fill-in',
  'sc-exercise': 'choice',
  'mc-exercise': 'choice',
  'blanks-exercise': 'fill-in',
  'h5p-exercise': 'other',
  spoiler: 'other',
  solution: 'other',
} as const
