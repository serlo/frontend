import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { cn } from '@/helper/cn'

const roadmapData = [
  {
    title: 'Latest Releases',
    steps: [
      'Improve Image plugin, easier uploads',
      'Fill-in-the-gap exercise (new plugin)',
      'Drag & Drop image exercise (fill-in-the-blanks)',
      'Exercise generation with AI ✨',
      'Copy & Paste content across plugins',
      'Web Component release',
    ],
  },
  {
    title: 'Next up',
    steps: [
      'AI supported input exercises',
      'Image Galleries',
      'Easier exercise creation',
    ],
  },
  {
    title: 'Soon',
    steps: [
      'Improved onboarding & help',
      'Interactive Videos',
      'Better keyboard navigation',
      'Asset upload for Editor integrations',
    ],
  },
  {
    title: 'Later',
    steps: [
      'Better support for LMS integrations',
      'Automated OER license management',
      'Learning method library',
      'Individual learning path creation',
      'Slides',
    ],
  },
]

const roadmapDataDe = [
  {
    title: 'Neueste Releases',
    steps: [
      'Verbessertes Bilder-Plugin, einfachere Uploads',
      'Drag & Drop-Aufgabe mit Bildern (Lückenfüllung)',
      'Aufgabenerstellung mit KI ✨',
      'Kopieren und Einfügen von Inhalten zwischen Plugins',
      'Web Component Release',
      'Bildergalerien',
    ],
  },
  {
    title: 'Next up',
    steps: [
      'KI-gestütze Eingabefeld-Aufgaben',
      'Einfachere Aufgabenerstellung',
      'xAPI',
    ],
  },
  {
    title: 'Soon',
    steps: [
      'Verbessertes Onboarding & Hilfe',
      'Interaktive Videos',
      'Bessere Tastaturnavigation',
      'Asset-Upload für Editor-Integrationen',
    ],
  },
  {
    title: 'Later',
    steps: [
      'Automatisiertes OER-Lizenzmanagement',
      'Bibliothek für Lernmethoden',
      'Erstellung individueller Lernpfade',
      'Folien ',
    ],
  },
]
export function EditorRoadmap() {
  const isDe = useInstanceData().lang === Instance.De
  const data = isDe ? roadmapDataDe : roadmapData

  return (
    <div className="text-center text-xl sm:flex">
      {data.map(({ title, steps }, colIndex) => {
        return (
          <div key={title} className="mt-8 flex-1 px-3">
            <h3 className="mb-4 font-handwritten text-3xl text-brand">
              {title}
            </h3>
            <ul className="">
              {steps.map((title) => {
                return (
                  <li
                    key={title}
                    className={cn(`
                      mx-auto mb-3 block w-fit rounded-xl px-2 py-1
                      text-base leading-6
                      shadow-menu transition-colors sm:mx-0
                      sm:w-auto
                    `)}
                  >
                    {title}
                  </li>
                )
              })}
            </ul>
            {colIndex === 0 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/_assets/img/jobs/impact.svg"
                className="mx-3 my-5 hidden opacity-75 sm:block"
                alt=""
              />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
