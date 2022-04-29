import { gql } from 'graphql-request'

import { SupportedTypesSerializedState } from './types'

const setAppletMutation = gql`
  mutation setApplet($input: SetAppletInput!) {
    entity {
      setApplet(input: $input) {
        success
      }
    }
  }
`
const setArticleMutation = gql`
  mutation setArticle($input: SetArticleInput!) {
    entity {
      setArticle(input: $input) {
        success
      }
    }
  }
`
const setCourseMutation = gql`
  mutation setCourse($input: SetCourseInput!) {
    entity {
      setCourse(input: $input) {
        success
      }
    }
  }
`
const setCoursePageMutation = gql`
  mutation setCoursePage($input: SetCoursePageInput!) {
    entity {
      setCoursePage(input: $input) {
        success
      }
    }
  }
`
const setEventMutation = gql`
  mutation setEvent($input: SetEventInput!) {
    entity {
      setEvent(input: $input) {
        success
      }
    }
  }
`
const setExerciseMutation = gql`
  mutation setExercise($input: SetGenericEntityInput!) {
    entity {
      setExercise(input: $input) {
        success
      }
    }
  }
`
const setExerciseGroupMutation = gql`
  mutation setExerciseGroup($input: SetExerciseGroupInput!) {
    entity {
      setExerciseGroup(input: $input) {
        success
      }
    }
  }
`
const setGroupedExerciseMutation = gql`
  mutation setGroupedExercise($input: SetGenericEntityInput!) {
    entity {
      setGroupedExercise(input: $input) {
        success
      }
    }
  }
`
const setSolutionMutation = gql`
  mutation setSolution($input: SetGenericEntityInput!) {
    entity {
      setSolution(input: $input) {
        success
      }
    }
  }
`
const setVideoMutation = gql`
  mutation setVideo($input: SetVideoInput!) {
    entity {
      setVideo(input: $input) {
        success
      }
    }
  }
`

export function getSetMutation(
  type: Exclude<SupportedTypesSerializedState['__typename'], undefined>
) {
  return {
    Applet: setAppletMutation,
    Article: setArticleMutation,
    Course: setCourseMutation,
    CoursePage: setCoursePageMutation,
    Event: setEventMutation,
    Exercise: setExerciseMutation,
    ExerciseGroup: setExerciseGroupMutation,
    GroupedExercise: setGroupedExerciseMutation,
    Solution: setSolutionMutation,
    Video: setVideoMutation,
  }[type]
}
