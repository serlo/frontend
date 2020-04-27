export function createData(uuid) {}

/*


import { render } from '../../external/legacy_render'
import { metamenudata } from '../data/metamenudata'
import { horizonData } from '../data/horizondata'
import { convertLegacyState } from '../schema/convertLegacyState'
import { convertEdtrioState } from '../schema/convertEdtrioState'
import { TopicPurposes } from '../components/content/Topic'

async function buildDescription(description) {
  if (description.startsWith('[')) {
    description = await render(description)
    description = convertLegacyState(description)
  } else if (description.startsWith('{')) {
    description = convertEdtrioState(JSON.parse(description))
  } else {
    description = {
      children: [{ type: 'p', children: [{ text: description }] }]
    }
  }
  return description
}

const data: any = {}
    let contentType = 'unknown'
    let title = 'Serlo'
    let breadcrumbs = []

    contentType = reqData.uuid.__typename

    if (contentType === 'Page' || contentType === 'Article') {
      let value = reqData.uuid.currentRevision.content
      data.title = reqData.uuid.currentRevision.title
      if (data.title) title = data.title + ' - lernen mit Serlo!'
      if (value.startsWith('[')) {
        // legacy
        data.legacy = await render(value)
      } else {
        data.edtrio = JSON.parse(value)
      }
      if (data.legacy) {
        data.value = convertLegacyState(data.legacy)
        delete data.legacy
      } else if (data.edtrio) {
        data.value = convertEdtrioState(data.edtrio)
        delete data.edtrio
      }
    }

    const breadcrumbsData =
      reqData.uuid.taxonomyTerms ||
      (reqData.uuid.course && reqData.uuid.course.taxonomyTerms)

    if (breadcrumbsData) {
      breadcrumbsData.forEach(({ navigation }) => {
        const { path } = navigation
        if (breadcrumbs.length === 0 || breadcrumbs.length > path.length) {
          breadcrumbs = path
        }
      })
    }

    if (contentType === 'TaxonomyTerm') {
      const children = reqData.uuid.children.filter(
        child =>
          child.trashed === false && child.__typename !== 'UnsupportedUuid'
      )
      let links = {
        articles: [],
        exercises: [],
        videos: [],
        applets: [],
        courses: [],
        subfolders: []
      }
      let subtopics = []
      let exercises = []
      for (const child of children) {
        if (
          child.__typename === 'Article' &&
          child.alias &&
          child.currentRevision
        ) {
          links.articles.push({
            title: child.currentRevision.title,
            url: child.alias
          })
        }
        if (
          child.__typename === 'Video' &&
          child.alias &&
          child.currentRevision
        ) {
          links.videos.push({
            title: child.currentRevision.title,
            url: child.alias
          })
        }
        if (
          child.__typename === 'Applet' &&
          child.alias &&
          child.currentRevision
        ) {
          links.applets.push({
            title: child.currentRevision.title,
            url: child.alias
          })
        }
        if (
          child.__typename === 'Course' &&
          child.alias &&
          child.currentRevision
        ) {
          links.courses.push({
            title: child.currentRevision.title,
            url: child.alias
          })
        }
        if (child.__typename === 'Exercise' && child.currentRevision) {
          const task = await buildDescription(child.currentRevision.content)
          const solution = child.solution
            ? await buildDescription(child.solution.currentRevision.content)
            : { type: 'p', children: [{ text: '' }] }
          exercises.push({
            children: [
              {
                type: 'exercise',
                task,
                solution,
                taskLicense: child.license,
                solutionLicense: child.solution && child.solution.license,
                children: [{ text: '' }]
              }
            ]
          })
        }
        if (child.__typename === 'ExerciseGroup' && child.currentRevision) {
          const children = []
          for (let i = 0; i < child.exercises.length; i++) {
            const ex = child.exercises[i]
            if (!ex.currentRevision) continue
            const task = await buildDescription(ex.currentRevision.content)
            const solution =
              ex.solution && ex.solution.currentRevision
                ? await buildDescription(ex.solution.currentRevision.content)
                : { children: [{ type: 'p', children: { text: '' } }] }
            children.push({
              type: 'exercise',
              task,
              solution,
              taskLicense: ex.license,
              solutionLicense: ex.solution && ex.solution.license,
              children: [{ text: '' }]
            })
          }
          const task = await buildDescription(child.currentRevision.content)
          exercises.push({
            children: [
              {
                type: 'exercise-group',
                content: task.children,
                license: child.license,
                children
              }
            ]
          })
        }
        if (child.__typename === 'TaxonomyTerm') {
          if (child.type === 'topicFolder') {
            links.exercises.push({
              title: child.name,
              url: child.alias || '/' + child.id
            })
          } else {
            const description = await buildDescription(child.description || '')
            const sublinks = {
              articles: [],
              exercises: [],
              subfolders: [],
              videos: [],
              applets: [],
              courses: []
            }
            for (const subchild of child.children.filter(
              child =>
                child.trashed === false &&
                child.__typename !== 'UnsupportedUuid'
            )) {
              if (
                subchild.__typename === 'Article' &&
                subchild.alias &&
                subchild.currentRevision
              ) {
                sublinks.articles.push({
                  title: subchild.currentRevision.title,
                  url: subchild.alias
                })
              }
              if (
                subchild.__typename === 'Video' &&
                subchild.alias &&
                subchild.currentRevision
              ) {
                sublinks.videos.push({
                  title: subchild.currentRevision.title,
                  url: subchild.alias
                })
              }
              if (
                subchild.__typename === 'Applet' &&
                subchild.alias &&
                subchild.currentRevision
              ) {
                sublinks.applets.push({
                  title: subchild.currentRevision.title,
                  url: subchild.alias
                })
              }
              if (
                subchild.__typename === 'Course' &&
                subchild.alias &&
                subchild.currentRevision
              ) {
                sublinks.courses.push({
                  title: subchild.currentRevision.title,
                  url: subchild.alias
                })
              }
              if (subchild.__typename === 'TaxonomyTerm') {
                if (subchild.type === 'topicFolder') {
                  sublinks.exercises.push({
                    title: subchild.name,
                    url: subchild.alias
                  })
                }
                if (
                  subchild.type === 'topic' ||
                  subchild.type === 'curriculum' ||
                  subchild.type === 'locale' ||
                  subchild.type === 'curriculumTopic' ||
                  subchild.type === 'curriculumTopicFolder'
                ) {
                  sublinks.subfolders.push({
                    title: subchild.name,
                    url: subchild.alias
                  })
                }
              }
            }
            subtopics.push({
              title: child.name,
              url: child.alias,
              description: description.children,
              purpose: TopicPurposes.overview,
              links: sublinks
            })
          }
        }
      }
      let description = await buildDescription(reqData.uuid.description || '')
      data.description = description.children
      data.title = reqData.uuid.name
      data.type = reqData.uuid.type
      data.purpose = TopicPurposes.detail
      data.links = links
      if (Array.isArray(reqData.uuid.navigation.path)) {
        breadcrumbs = reqData.uuid.navigation.path.slice(0, -1)
      }
      data.children = subtopics
      data.exercises = exercises
    }

    if (contentType === 'Exercise' || contentType === 'GroupedExercise') {
      data.task = await buildDescription(reqData.uuid.currentRevision.content)
      data.solution = await buildDescription(
        reqData.uuid.solution.currentRevision.content
      )
      data.value = {
        children: [
          {
            type: 'exercise',
            task: data.task,
            solution: data.solution,
            taskLicense: reqData.uuid.license,
            solutionLicense: reqData.uuid.solution.license,
            children: [{ text: '' }]
          }
        ]
      }
      delete data.task
      delete data.solution
    }
    if (contentType === 'Video') {
      data.value = {
        children: [
          {
            type: 'video',
            src: reqData.uuid.currentRevision.url,
            children: [{ text: '' }]
          }
        ]
      }
      data.title = reqData.uuid.currentRevision.title
    }
    if (contentType === 'Applet') {
      data.value = {
        children: [
          {
            type: 'geogebra',
            id: reqData.uuid.currentRevision.url,
            children: [{ text: '' }]
          }
        ]
      }
      data.title = reqData.uuid.currentRevision.title
    }
    if (contentType === 'ExerciseGroup') {
      const children = []
      for (let i = 0; i < reqData.uuid.exercises.length; i++) {
        const ex = reqData.uuid.exercises[i]
        if (!ex.currentRevision) continue
        const task = await buildDescription(ex.currentRevision.content)
        const solution = ex.solution
          ? await buildDescription(ex.solution.currentRevision.content)
          : { type: 'p', children: [{ text: '' }] }
        children.push({
          type: 'exercise',
          task,
          solution,
          taskLicense: ex.license,
          solutionLicense: ex.solution?.license,
          children: [{ text: '' }]
        })
      }
      const task = await buildDescription(reqData.uuid.currentRevision.content)
      data.value = {
        children: [
          {
            type: 'exercise-group',
            content: task.children,
            license: task.license,
            children
          }
        ]
      }
    }
    if (contentType === 'Course') {
      data.redirect = reqData.uuid.pages[0].alias
    }
    if (contentType === 'CoursePage') {
      data.value = await buildDescription(reqData.uuid.currentRevision.content)
      data.title = reqData.uuid.currentRevision.title
      data.pages = reqData.uuid.course.pages.filter(
        page => page.currentRevision !== null
      )
      data.courseTitle = reqData.uuid.course.currentRevision?.title
    }

    // license
    if (
      reqData.uuid.license &&
      contentType !== 'Exercise' &&
      contentType !== 'GroupedExercise' &&
      contentType !== 'ExerciseGroup'
    ) {
      data.license = reqData.uuid.license
    }

    // do some more post-processing here!!
    const isMeta =
      alias == '/serlo' || metamenudata.some(entry => alias == entry.url)
    const showBreadcrumbs =
      !isMeta &&
      breadcrumbs.length >= 1 &&
      (contentType === 'Article' ||
        contentType === 'Page' ||
        contentType === 'Video' ||
        contentType === 'Applet' ||
        contentType === 'Exercise' ||
        contentType === 'ExerciseGroup' ||
        contentType === 'GroupedExercise' ||
        contentType === 'CoursePage' ||
        contentType === 'TaxonomyTerm')

    // horizon
    const horizonIndices = shuffle(Object.keys(horizonData))

    return {
      alias,
      contentType,
      data,
      isMeta,
      showBreadcrumbs,
      horizonIndices,
      breadcrumbs,
      title
    }

*/
