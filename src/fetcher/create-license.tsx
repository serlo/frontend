const excludeLicense = ['Exercise', 'GroupedExercise', 'ExerciseGroup']

// TODO: needs type declaration
export function createLicense(uuid: any) {
  if (!excludeLicense.includes(uuid.__typename) && uuid.license) {
    return uuid.license
  }
}
