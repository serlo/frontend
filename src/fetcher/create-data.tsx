import { render } from '../../external/legacy_render'
import { TopicPurposes } from '../components/content/topic'
import { convertEdtrIoState } from '../schema/convert-edtr-io-state'
import { convertLegacyState } from '../schema/convert-legacy-state'

// TODO: needs type declaration
export function createData(uuid: any) {
  const type = uuid.__typename

  if (type === 'Page' && uuid.currentRevision) {
    return createPage(uuid)
  }
  if (type === 'Article' && uuid.currentRevision) {
    return createArticle(uuid)
  }
  if (type === 'Applet' && uuid.currentRevision) {
    return createApplet(uuid)
  }
  if (type === 'Video' && uuid.currentRevision) {
    return createVideo(uuid)
  }
  if (
    (type === 'Exercise' || type === 'GroupedExercise') &&
    uuid.currentRevision
  ) {
    return createExercise(uuid)
  }
  if (type === 'ExerciseGroup' && uuid.currentRevision) {
    return createExerciseGroup(uuid)
  }
  if (type === 'CoursePage' && uuid.currentRevision) {
    return createCoursePage(uuid)
  }
  if (type === 'TaxonomyTerm') {
    return createTaxonomyTerm(uuid)
  }
  if (type === 'Event') {
    return createEvent(uuid)
  }
}

// TODO: needs type declaration
function createPage(uuid: any) {
  return {
    title: uuid.currentRevision.title,
    value: convertState(uuid.currentRevision.content),
    id: uuid.id,
  }
}

// TODO: needs type declaration
function createArticle(uuid: any) {
  return {
    title: uuid.currentRevision.title,
    value: convertState(uuid.currentRevision.content),
    metaTitle: uuid.currentRevision.metaTitle,
    metaDescription: uuid.currentRevision.metaDescription,
    id: uuid.id,
  }
}

// TODO: needs type declaration
function createVideo(uuid: any) {
  return {
    title: uuid.currentRevision.title,
    value: {
      children: [
        {
          type: 'video',
          src: uuid.currentRevision.url,
          children: [{ text: '' }],
        },
        ...convertState(uuid.currentRevision.content).children,
      ],
    },
  }
}

// TODO: needs type declaration
function createExercise(uuid: any, index?: any) {
  return {
    value: {
      children: [
        {
          type: 'exercise',
          grouped: false,
          positionOnPage: index,
          task: convertState(uuid.currentRevision.content),
          taskLicense: uuid.license,
          solution: convertState(uuid.solution?.currentRevision?.content),
          solutionLicense: uuid.solution?.license,
          children: [{ text: '' }],
        },
      ],
    },
  }
}

// TODO: needs type declaration
function createApplet(uuid: any) {
  return {
    value: {
      children: [
        {
          type: 'geogebra',
          id: uuid.currentRevision.url,
          children: [{ text: '' }],
        },
        ...convertState(uuid.currentRevision.content).children,
      ],
    },
    title: uuid.currentRevision.title,
    metaTitle: uuid.currentRevision.metaTitle,
    metaDescription: uuid.currentRevision.metaDescription,
  }
}

// TODO: needs type declaration
function createExerciseGroup(uuid: any, pageIndex?: any) {
  // TODO: needs type declaration
  const children: any[] = []
  if (uuid.exercises?.length > 0) {
    // TODO: needs type declaration
    uuid.exercises.forEach(function (exercise: any, groupIndex: any) {
      if (!exercise.currentRevision) return
      children.push({
        type: 'exercise',
        grouped: true,
        positionInGroup: groupIndex,
        task: convertState(exercise.currentRevision.content),
        taskLicense: exercise.license,
        solution: convertState(exercise.solution?.currentRevision?.content),
        solutionLicense: exercise.solution?.license,
        children: [{ text: '' }],
      })
    })
    // for (const exercise of uuid.exercises) {

    // }
  }
  return {
    value: {
      children: [
        {
          type: 'exercise-group',
          content: convertState(uuid.currentRevision.content).children,
          positionOnPage: pageIndex,
          license: uuid.license,
          children,
        },
      ],
    },
  }
}

// TODO: needs type declaration
function createCoursePage(uuid: any) {
  return {
    value: convertState(uuid.currentRevision.content),
    title: uuid.currentRevision.title,
    // TODO: needs type declaration
    pages: uuid.course?.pages?.filter(
      (page: any) => page.currentRevision !== null
    ),
    courseTitle: uuid.course?.currentRevision?.title,
  }
}

// TODO: needs type declaration
function createEvent(uuid: any) {
  return {
    value: convertState(uuid.currentRevision.content),
  }
}

// TODO: needs type declaration
function convertState(raw: any) {
  if (raw?.startsWith('[')) {
    // legacy
    const legacyHTML = render(raw)
    return convertLegacyState(legacyHTML)
  } else if (raw?.startsWith('{')) {
    // edtrio
    return convertEdtrIoState(JSON.parse(raw))
  } else {
    // raw as text
    return { children: [{ type: 'p', children: { text: raw ?? '' } }] }
  }
}

// TODO: needs type declaration
function createTaxonomyTerm(uuid: any) {
  const children = uuid.children?.filter(isActive)

  return {
    description: buildDescription(uuid.description),
    title: uuid.name,
    type: uuid.type,
    purpose: TopicPurposes.detail,
    links: {
      articles: collectType(children, 'Article'),
      exercises: collectTopicFolders(children),
      videos: collectType(children, 'Video'),
      applets: collectType(children, 'Applet'),
      courses: collectType(children, 'Course'),
    },
    exercises: collectExercises(children),
    children: collectNestedTaxonomyTerms(children), // nested taxonomy terms
  }
}

// TODO: needs type declaration
function isActive(child: any) {
  return child.trashed === false && child.__typename !== 'UnsupportedUuid'
}

// TODO: needs type declaration
function buildDescription(description: any) {
  const state = description ? convertState(description) : undefined
  if (state) {
    if (
      state.children?.length !== 1 ||
      state.children[0].children?.length !== 1 ||
      state.children[0].children[0].text !== '' ||
      state.children[0].children[0].type !== 'p'
    ) {
      return state
    }
  }
}

// TODO: needs type declaration
function collectType(children: any, typename: any) {
  return (
    children
      .filter(
        // TODO: needs type declaration
        (child: any) =>
          child.__typename === typename && child.alias && child.currentRevision
      )
      // TODO: needs type declaration
      .map((child: any) => {
        return { title: child.currentRevision.title, url: child.alias }
      })
  )
}

// TODO: needs type declaration
function collectTopicFolders(children: any) {
  return (
    children
      .filter(
        // TODO: needs type declaration
        (child: any) =>
          child.__typename === 'TaxonomyTerm' &&
          child.type.includes('opicFolder')
      )
      // TODO: needs type declaration
      .map((child: any) => {
        return { title: child.name, url: `${child.alias ?? '/'}${child.id}` }
      })
  )
}

// TODO: needs type declaration
function collectExercises(children: any) {
  return (
    children
      .filter(
        // TODO: needs type declaration
        (child: any) =>
          ['Exercise', 'ExerciseGroup', 'GroupedExercise'].includes(
            child.__typename
          ) && child.currentRevision
      )
      // TODO: needs type declaration
      .map((child: any, index: any) => {
        if (
          child.__typename === 'Exercise' ||
          child.__typename === 'GroupedExercise'
        ) {
          return createExercise(child, index).value
        }
        if (child.__typename === 'ExerciseGroup') {
          return createExerciseGroup(child, index).value
        }
      })
  )
}

// TODO: needs type declaration
function collectNestedTaxonomyTerms(children: any) {
  return (
    children
      .filter(
        // TODO: needs type declaration
        (child: any) =>
          child.__typename === 'TaxonomyTerm' &&
          !child.type.includes('opicFolder')
      )
      // TODO: needs type declaration
      .map((child: any) => {
        const subchildren = child.children?.filter(isActive)
        return {
          title: child.name,
          url: child.alias,
          description: buildDescription(child.description),
          purpose: TopicPurposes.overview,
          links: {
            articles: collectType(subchildren, 'Article'),
            exercises: collectTopicFolders(subchildren),
            videos: collectType(subchildren, 'Video'),
            applets: collectType(subchildren, 'Applet'),
            courses: collectType(subchildren, 'Course'),
            subfolders: collectSubfolders(subchildren),
          },
        }
      })
  )
}

// TODO: needs type declaration
function collectSubfolders(children: any) {
  return (
    children
      .filter(
        // TODO: needs type declaration
        (child: any) =>
          child.__typename === 'TaxonomyTerm' &&
          !child.type.includes('opicFolder')
      )
      // TODO: needs type declaration
      .map((child: any) => {
        return { title: child.name, url: `${child.alias ?? '/'}${child.id}` }
      })
  )
}
