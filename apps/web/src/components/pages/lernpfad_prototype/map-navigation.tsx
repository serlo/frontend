import { FaIcon } from '@editor/editor-ui/fa-icon'
import { faArrowLeft, faClock } from '@fortawesome/free-solid-svg-icons'

export function MapNavigation() {
  return (
    <nav className="absolute left-0 right-0 top-0 z-10 flex h-[100px] items-center justify-between bg-white shadow-md">
      <button
        className="flex flex-row items-center gap-3 p-7"
        onClick={() => {}}
      >
        <FaIcon icon={faArrowLeft} />
        <span className="text-lg">Back to Dashboard</span>
      </button>

      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold">
          Giving an opinion for or against something
        </h1>
        <h2 className="flex items-center gap-1 text-sm text-gray-400">
          <FaIcon icon={faClock} />
          Time needed: 60 minutes
        </h2>
      </div>

      <button className="mr-4 flex flex-row items-center gap-3 rounded-md bg-purple-200 px-6 py-3 font-bold hover:cursor-pointer hover:bg-purple-300">
        KI Tutor
        <img src="/_assets/img/birdie.svg" className="max-w-6" />
      </button>
    </nav>
  )
}
