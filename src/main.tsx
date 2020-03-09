import Header from './header'

export default function Main(props) {
  const { data } = props
  return (
    <>
      <Header />
      <div dangerouslySetInnerHTML={{ __html: data.content.content }} />
    </>
  )
}
