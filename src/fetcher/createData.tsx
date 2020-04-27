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
}

function createPage(uuid) {
  return {
    title: uuid.currentRevision.title,
    value: convertState(uuid.currentRevision.content)
  }
}

function createArticle(uuid) {
  return {
    title: uuid.currentRevision.title,
    value: convertState(uuid.currentRevision.content),
    metaTitle: uuid.currentRevision.metaTitle,
    metaDescription: uuid.currentRevision.metaDescription
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
          children: [{ text: '' }]
        },
        ...convertState(uuid.currentRevision.content).children
      ]
    }
  }
}

function createExercise(uuid) {
  return {
    value: {
      children: [
        {
          type: 'exercise',
          task: convertState(uuid.currentRevision.content),
          taskLicense: uuid.license,
          solution: convertState(uuid.solution?.currentRevision?.content),
          solutionLicense: uuid.solution?.license,
          children: [{ text: '' }]
        }
      ]
    }
  }
}

function createApplet(uuid) {
  return {
    value: {
      children: [
        {
          type: 'geogebra',
          id: uuid.currentRevision.url,
          children: [{ text: '' }]
        }
      ]
    },
    metaTitle: uuid.currentRevision.metaTitle,
    metaDescription: uuid.currentRevision.metaDescription
  }
}

function createExerciseGroup(uuid) {
  const children = []
  if (uuid.exercises?.length > 0) {
    for (const exercise of uuid.exercises) {
      if (!exercise.currentRevision) continue
      children.push({
        type: 'exercise',
        task: convertState(exercise.currentRevision.content),
        taskLicense: exercise.license,
        solution: convertState(exercise.solution?.currentRevision?.content),
        solutionLicense: exercise.solution?.license,
        children: [{ text: '' }]
      })
    }
  }
  return {
    value: {
      children: [
        {
          type: 'exercise-group',
          content: convertState(uuid.currentRevision.content).children,
          license: uuid.license,
          children
        }
      ]
    }
  }
}

function createCoursePage(uuid) {
  return {
    value: convertState(uuid.currentRevision.content),
    title: uuid.currentRevision.title,
    pages: uuid.course?.pages?.filter(page => page.currentRevision !== null),
    courseTitle: uuid.course?.currentRevision?.title
  }
}

function convertState(raw) {
  if (raw.startsWith('[')) {
    // legacy
    const legacyHTML = render(raw)
    return convertLegacyState(legacyHTML)
  } else if (raw.startsWith('{')) {
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
    description: uuid.description && convertState(uuid.description),
    title: uuid.name,
    type: uuid.type,
    purpose: TopicPurposes.detail,
    links: {
      articles: collectType(children, 'Article'),
      exercises: collectTopicFolders(children),
      videos: collectType(children, 'Video'),
      applets: collectType(children, 'Applet'),
      courses: collectType(children, 'Course')
    },
    exercises: collectExercises(children),
    children: collectNestedTaxonomyTerms(children) // nested taxonomy terms
  }
}

function isActive(child) {
  return child.trashed === false && child.__typename !== 'UnsupportedUuid'
}

function collectType(children, typename) {
  return children
    .filter(
      child =>
        child.__typename === typename && child.alias && child.currentRevision
    )
    .map(child => {
      return { title: child.currentRevision.title, url: child.alias }
    })
}

function collectTopicFolders(children) {
  return children
    .filter(
      child =>
        child.__typename === 'TaxonomyTerm' && child.type === 'topicFolder'
    )
    .map(child => {
      return { title: child.name, url: child.alias ?? '/' + child.id }
    })
}

function collectExercises(children) {
  return children
    .filter(
      child =>
        ['Exercise', 'ExerciseGroup', 'GroupedExercise'].includes(
          child.__typename
        ) && child.currentRevision
    )
    .map(child => {
      if (
        child.__typename === 'Exercise' ||
        child.__typename === 'GroupedExercise'
      ) {
        return createExercise(child)
      }
      if (child.__typename === 'ExerciseGroup') {
        return createExerciseGroup(child)
      }
    })
}

function collectNestedTaxonomyTerms(children) {
  return children
    .filter(
      child =>
        child.__typename === 'TaxonomyTerm' && child.type !== 'topicFolder'
    )
    .map(child => {
      const subchildren = child.children?.filter(isActive)
      return {
        title: child.name,
        url: child.alias,
        description: child.description && convertState(child.description),
        purpose: TopicPurposes.overview,
        links: {
          articles: collectType(subchildren, 'Article'),
          exercises: collectTopicFolders(subchildren),
          videos: collectType(subchildren, 'Video'),
          applets: collectType(subchildren, 'Applet'),
          courses: collectType(subchildren, 'Course'),
          subfolders: collectSubfolders(children)
        }
      }
    })
}

function collectSubfolders(children) {
  return children
    .filter(
      child =>
        child.__typename === 'TaxonomyTerm' && child.type !== 'topicFolder'
    )
    .map(child => {
      return { title: child.name, url: child.alias ?? '/' + child.id }
    })
}
