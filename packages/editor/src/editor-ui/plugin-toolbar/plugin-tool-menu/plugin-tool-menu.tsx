import { FaIcon } from '@editor/editor-ui/fa-icon'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import {
  Content,
  Item,
  List,
  Root,
  Trigger,
} from '@radix-ui/react-navigation-menu'
import { ReactElement } from 'react'

import {
  preventHover,
  useNavMenuTriggerFix,
} from '@/components/navigation/header/menu/use-nav-menu-trigger-fix'

interface PluginToolMenuProps {
  pluginControls: ReactElement
}

export function PluginToolMenu({ pluginControls }: PluginToolMenuProps) {
  const triggerFix = useNavMenuTriggerFix()

  return (
    <Root>
      <List>
        <Item>
          <Trigger data-qa="additional-toolbar-controls" {...triggerFix}>
            <FaIcon className="mx-2 px-2" icon={faEllipsis} />
          </Trigger>

          <Content onPointerEnter={preventHover}>
            <List className="absolute right-0 z-30">
              <div className="serlo-sub-list-hover mt-2 bg-editor-primary-100 px-0">
                {pluginControls}
              </div>
            </List>
          </Content>
        </Item>
      </List>
    </Root>
  )
}
