import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import {
  Content,
  Item,
  List,
  Root,
  Trigger,
} from '@radix-ui/react-navigation-menu'
import { ReactElement } from 'react'

import { FaIcon } from '@/components/fa-icon'

interface PluginToolbarDropdownMenuProps {
  pluginControls: ReactElement
}

export function PluginToolbarDropdownMenu({
  pluginControls,
}: PluginToolbarDropdownMenuProps) {
  return (
    <Root>
      <List>
        <Item>
          <Trigger>
            <FaIcon className="mx-2 px-2" icon={faEllipsis} />
          </Trigger>

          <Content>
            <List className="absolute right-0 z-50 w-56 pt-2 lg:right-48 lg:bottom-0">
              <div className="serlo-sub-list-hover">{pluginControls}</div>
            </List>
          </Content>
        </Item>
      </List>
    </Root>
  )
}
