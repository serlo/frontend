import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import {
  Content,
  Item,
  List,
  Root,
  Trigger,
} from '@radix-ui/react-navigation-menu'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ReactElement } from 'react'


interface PluginToolMenuProps {
  pluginControls: ReactElement
}

export function PluginToolMenu({ pluginControls }: PluginToolMenuProps) {
  return (
    <Root>
      <List>
        <Item>
          <Trigger>
            <FaIcon className="mx-2 px-2" icon={faEllipsis} />
          </Trigger>

          <Content>
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
