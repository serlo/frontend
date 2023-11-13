export const exerciseTestData = {
  heading: 'Dreisatz: Wie weit fährt ein Auto?',
  exercises: [
    {
      type: 'single_choice',
      steps: [
        'Ein Auto fährt 120 Meilen in 2 Stunden. Du möchtest wissen, wie weit das Auto in 5 Stunden fahren würde.',
        'Zuerst schreibst du die gegebenen Informationen auf: Das Auto fährt 120 Meilen in 2 Stunden.',
        'Um die Geschwindigkeit des Autos zu finden, teilst du die zurückgelegte Entfernung durch die Zeit.',
        '[ text{Geschwindigkeit} = frac{120 text{ Meilen}}{2 text{ Stunden}} = 60 text{ mph} ]',
        'Jetzt weißt du, dass das Auto mit einer Geschwindigkeit von 60 mph fährt.',
        'Um die Entfernung in 5 Stunden zu finden, multiplizierst du die Geschwindigkeit mit der Zeit.',
        '[ text{Entfernung} = 60 text{ mph} times 5 text{ Stunden} = 300 text{ Meilen} ]',
        'Das Auto würde also 300 Meilen in 5 Stunden fahren.',
      ],
      question:
        'Wenn ein Auto 120 Meilen in 2 Stunden fährt, wie weit würde es in 5 Stunden fahren?',
      options: ['200 Meilen', '250 Meilen', '300 Meilen', '350 Meilen'],
      correct_option: 2,
    },
  ],
}
