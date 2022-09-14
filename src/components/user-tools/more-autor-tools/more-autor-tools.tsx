import { faTools } from '@fortawesome/free-solid-svg-icons/faTools'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'

// import { AuthorTools, Tool } from '../author-tools'
import { UserToolsItem } from '../user-tools-item'
import {
  AuthorToolsData,
  // AuthorToolsHoverMenu,
} from './author-tools-hover-menu'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { ExerciseInlineType, UuidType } from '@/data-types'

// const ShareModal = dynamic<ShareModalProps>(() =>
//   import('@/components/user-tools/share-modal').then((mod) => mod.ShareModal)
// )

interface MoreAutorToolsProps {
  data?: AuthorToolsData
  aboveContent?: boolean
}

export function MoreAutorTools({ data, aboveContent }: MoreAutorToolsProps) {
  // const loggedInComponents = useLoggedInComponents()
  const loggedInData = useLoggedInData()

  if (!data) return null

  //|| !loggedInComponents
  if (!data || !loggedInData) return null
  const supportedTypes: AuthorToolsData['type'][] = [
    UuidType.Page,
    UuidType.Article,
    UuidType.Video,
    UuidType.Applet,
    UuidType.Event,
    UuidType.CoursePage,
    UuidType.TaxonomyTerm,
    ExerciseInlineType.Exercise,
    ExerciseInlineType.ExerciseGroup,
    ExerciseInlineType.Solution,
  ]
  if (!supportedTypes.includes(data.type)) return null

  // const AuthorToolsHoverMenu = loggedInComponents?.AuthorToolsHoverMenu

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>
        <UserToolsItem
          title={loggedInData.strings.tools}
          aboveContent={aboveContent}
          icon={faTools}
        />
      </NavigationMenu.Trigger>

      <NavigationMenu.Content>
        {/* placement={aboveContent ? 'bottom' : 'left-end'} */}
        <NavigationMenu.List className="absolute w-56 z-50 pt-2 right-0">
          <div className="serlo-sub-list-hover">
            {/* <AuthorTools
              entityId={data.id}
              data={data}
              tools={[
                Tool.Abo,
                Tool.History,
                Tool.Curriculum,
                Tool.Log,
                Tool.AnalyticsLink,
                Tool.Trash,
              ]}
            /> */}
          </div>
        </NavigationMenu.List>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  )
}
