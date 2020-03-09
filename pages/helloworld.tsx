function HelloWorld() {
  return <Greeter title="Hello" subline="Welcome to the frontend!" />
}

interface GreeterProps {
  title: string
  subline?: string
}

function Greeter(props: GreeterProps) {
  const { title, subline } = props
  return (
    <>
      <h1>{title}</h1>
      {subline && <small>{subline}</small>}
    </>
  )
}

export default HelloWorld
