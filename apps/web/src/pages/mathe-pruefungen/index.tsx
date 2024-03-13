// just for localhost and feature branches where the cloudflare worker does not redirect

export default function Page() {
  return <>nothing to see here</>
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/mathe-pruefungen/niedersachsen',
      permanent: false,
    },
  }
}
