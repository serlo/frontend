export function Separator(props: { className?: string }) {
  return (
    <>
      <style jsx>{`
        hr {
          border: 0;
          outline: none;
          background: url('/_assets/img/landing/separator.svg') no-repeat center
            center;
          height: 2rem;
          width: 100%;
          margin: 0 auto;
          padding: 5rem 0;
        }
      `}</style>
      <hr className={props.className}></hr>
    </>
  )
}
