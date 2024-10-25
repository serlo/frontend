import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'

// The icon in next.js gets correctly turned into a component, in vite, we
// want to expose the raw svg string to the packages. As this is also used
// by the web-component, we can't expose a React component. Therefore, we
// have to turn the string here into an svg element using
// dangerouslySetInnerHTML. There should not be any XSS risk with this, as we
// are loading the svgs ourselves from the assets and they can never come
// from a user.
export function PluginMenuIcon({
  icon,
}: {
  icon: string | (() => JSX.Element)
}) {
  return typeof icon === 'string' ? (
    <div dangerouslySetInnerHTML={{ __html: icon }} />
  ) : typeof icon !== 'string' ? (
    icon()
  ) : (
    <IconFallback />
  )
}
