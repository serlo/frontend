const germanSearchTags = {
  math: 'Mathematik',
  nature: 'Natur',
  plants: 'Pflanzen',
  adventure: 'Abenteuer',
  teamwork: 'Teamwork',
  journey: 'Reise',
  sports: 'Sport',
  chemistry: 'Chemie',
  lab: 'Labor',
  tech: 'Technologie',
  humans: 'Menschen',
  pyramide: 'Pyramide',
  cylinder: 'Zylinder',
  art: 'Kunst',
  music: 'Musik',
  school: 'Schule',
}

interface PixabaySearchTagsProps {
  onClick: (tagKey: string) => void
}

export function PixabaySearchTags(props: PixabaySearchTagsProps) {
  const { onClick } = props

  return (
    <div className="mb-6 mt-10 flex flex-wrap justify-center overflow-auto">
      {Object.values(germanSearchTags).map((tagKey) => (
        <button
          key={tagKey}
          onClick={() => onClick(tagKey)}
          className="m-2 inline-block rounded-md bg-white px-2 py-1 text-sm text-black shadow-md"
        >
          {tagKey}
        </button>
      ))}
    </div>
  )
}
