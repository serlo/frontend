export function Icon({ url }: { url: string }) {
  if (url.includes('serlo')) {
    return (
      <img
        src="https://de.serlo.org/_assets/apple-touch-icon.png"
        alt="Serlo"
        className="h-8 w-8"
      />
    )
  } else if (url.includes('vhs')) {
    return (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Deutscher_Volkshochschul-Verband%2C_VHS-Logo_-_Logo_of_the_German_adult_education_centre_association.png/320px-Deutscher_Volkshochschul-Verband%2C_VHS-Logo_-_Logo_of_the_German_adult_education_centre_association.png"
        alt="Serlo"
        className="h-8 w-8"
      />
    )
  }
}
