import { render } from '../../external/legacy_render'
import { convertLegacyState } from '../schema/convertLegacyState'
import { convertEdtrioState } from '../schema/convertEdtrioState'
import { TopicPurposes } from '../components/content/Topic'

export function createData(uuid) {
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

function createPage(uuid) {
  return {
    title: uuid.currentRevision.title,
    value: convertState(uuid.currentRevision.content),
    id: uuid.id,
  }
}

function createArticle(uuid) {
  return {
    title: uuid.currentRevision.title,
    value: convertState(uuid.currentRevision.content),
    metaTitle: uuid.currentRevision.metaTitle,
    metaDescription: uuid.currentRevision.metaDescription,
    id: uuid.id,
  }
}

function createVideo(uuid) {
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

function createExercise(uuid, index?) {
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

function createApplet(uuid) {
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

function createExerciseGroup(uuid, pageIndex?) {
  const children = []
  if (uuid.exercises?.length > 0) {
    uuid.exercises.forEach(function (exercise, groupIndex) {
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

function createCoursePage(uuid) {
  return {
    value: convertState(uuid.currentRevision.content),
    title: uuid.currentRevision.title,
    pages: uuid.course?.pages?.filter((page) => page.currentRevision !== null),
    courseTitle: uuid.course?.currentRevision?.title,
  }
}

function createEvent(uuid) {
  return {
    value: convertState(uuid.currentRevision.content),
  }
}

function convertState(raw) {
  if (raw?.startsWith('[')) {
    // legacy
    const legacyHTML = render(raw)
    return convertLegacyState(legacyHTML)
  } else if (raw?.startsWith('{')) {
    // edtrio
    return convertEdtrioState(JSON.parse(raw))
  } else {
    // raw as text
    return { children: [{ type: 'p', children: { text: raw ?? '' } }] }
  }
}

function createTaxonomyTerm(uuid) {
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

function isActive(child) {
  return child.trashed === false && child.__typename !== 'UnsupportedUuid'
}

function buildDescription(description) {
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

function collectType(children, typename) {
  return children
    .filter(
      (child) =>
        child.__typename === typename && child.alias && child.currentRevision
    )
    .map((child) => {
      return { title: child.currentRevision.title, url: child.alias }
    })
}

function collectTopicFolders(children) {
  return children
    .filter(
      (child) =>
        child.__typename === 'TaxonomyTerm' && child.type.includes('opicFolder')
    )
    .map((child) => {
      return { title: child.name, url: child.alias ?? '/' + child.id }
    })
}

function collectExercises(children) {
  return children
    .filter(
      (child) =>
        ['Exercise', 'ExerciseGroup', 'GroupedExercise'].includes(
          child.__typename
        ) && child.currentRevision
    )
    .map((child, index) => {
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
}

function collectNestedTaxonomyTerms(children) {
  return children
    .filter(
      (child) =>
        child.__typename === 'TaxonomyTerm' &&
        !child.type.includes('opicFolder')
    )
    .map((child) => {
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
}

function collectSubfolders(children) {
  return children
    .filter(
      (child) =>
        child.__typename === 'TaxonomyTerm' &&
        !child.type.includes('opicFolder')
    )
    .map((child) => {
      return { title: child.name, url: child.alias ?? '/' + child.id }
    })
}
