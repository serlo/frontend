import {
  ExerciseGenerationDifficulty,
  mapDifficultyToDescriptor,
} from './difficulty'

interface ExerciseParams {
  subject: string
  topic: string
  grade: string
  exerciseType: string
  numberOfSubtasks: number
  learningGoal: string
  difficulty: ExerciseGenerationDifficulty
  priorKnowledge: string
}

const difficultyToPromptTexts: Record<string, [string, string]> = {
  low: ['leicht', 'Die Schüler haben Schwierigkeiten, abstrakt zu denken'],
  medium: ['moderat', 'Die Schüler haben gute Vorkenntnisse'],
  high: ['schwer', 'Die Schüler können gut abstrakt denken'],
}

function exerciseTypeToPromptTexts({
  exerciseType,
  topic,
}: {
  exerciseType: string
  topic: string
}) {
  const record: Record<
    string,
    { exerciseText: string; keyDescription: string }
  > = {
    'multiple choice': {
      exerciseText: `. Die Aufgabe soll 5 Aussagen über das Thema ${topic} auflisten, von denen mindestens 2 als korrekt ausgewählt werden müssen.`,
      keyDescription: `type: "multiple_choice", question, options und correct_options. Der Key options soll als Value eine Liste von Antwortmöglichkeiten haben, der Key correct_options eine Liste mit den Indizes der korrekten Antworten`,
    },
    'single choice': {
      exerciseText: `vom Typ Single Choice, bei der aus verschiedenen Antwortmöglichkeiten genau 1 korrekte Antwort ausgewählt werden muss`,
      keyDescription: `type: "single_choice", question, options und correct_option. Der Key options soll als Value eine Liste von Antwortmöglichkeiten haben. Der Key correct_option repräsentiert den Index (als Ganzzahl, niemals als Text!) der korrekten Antwort aus dem options array!`,
    },
    'single word solution': {
      exerciseText: `, deren Lösung aus einem Wort besteht`,
      keyDescription: `type: 'short_answer', question und correct_answer`,
    },
    'single number solution': {
      exerciseText: `zur Berechnung, deren Lösung aus einer Zahl besteht`,
      keyDescription: `type: 'short_answer', question und correct_answer`,
    },
  }

  return record[exerciseType]
}

export const generateExercisePrompt = (params: ExerciseParams): string => {
  const {
    subject,
    topic,
    grade,
    exerciseType,
    numberOfSubtasks,
    learningGoal,
    difficulty,
    priorKnowledge,
  } = params

  const [difficultyText, difficultyDescription] =
    difficultyToPromptTexts[difficulty]
  const { exerciseText, keyDescription } = exerciseTypeToPromptTexts({
    exerciseType,
    topic,
  })

  const isGeneratingMultipleExercises = numberOfSubtasks >= 2
  const subtasks = isGeneratingMultipleExercises
    ? ` mit ${numberOfSubtasks} voneinander unabhängigen Teilaufgaben. Thematisch sollten die Aufgaben zu der Überschrift passen`
    : ''

  // * Only supports German at the moment. For i18n, this will require some
  //   extra code (checking against
  //   strings.ai.exerciseGeneration.grade.university)
  const gradeOrUniversity =
    grade.toLowerCase() === 'universität'
      ? 'der Universität'
      : `des ${grade}. Jahrgang`

  const priorKnowledgeString = priorKnowledge
    ? `Die Schüler haben folgendes Vorwissen: ${priorKnowledge}`
    : 'Die Schüler haben keine Vorkenntnisse.'

  //  Generiere lieber Aufgaben mit € oder anderen Einheiten da $ Zeichen die als Klartext (außerhalb von Latex) ausgegeben werden sollen, mit einem doppel backslash escaped werden müssen (\\\\$)!
  const latexPrompt =
    'sehr wichtig: alle mathematischen Ausdrücke MÜSSEN in LateX geschrieben sein mit einem $ Zeichen vor UND nach dem Ausdruck. Inklusive quadratischer Ausdrücke, Wurzeln und Formeln!'

  const generatedExerciseSingularOrPlural = isGeneratingMultipleExercises
    ? 'den generierten Aufgaben'
    : 'der generierten Aufgabe'

  const preLearningGoal =
    exerciseType === 'multiple choice'
      ? getPreLearningGoalForMultipleChoice({
          topic,
          difficulty,
        })
      : ''

  return `Du bist eine kreative Lehrkraft, die spannende Aufgaben für Schüler ${gradeOrUniversity} im Fach ${subject} entwickelt. Erstelle zum Thema "${topic}" eine Aufgabe${subtasks} ${exerciseText}. ${priorKnowledgeString}
Nach Bearbeiten der Aufgabe beherrschen die Schüler folgendes besser: ${preLearningGoal}${learningGoal}
Verwende leichte Sprache. Das Anforderungsniveau soll ${difficultyText} sein. Beachte folgende Charakterisierung der Schüler: ${difficultyDescription}.
Stelle die Aufgabe zum Hochladen auf eine Lernplattform in einem unnamed JSON Objekt dar. Füge eine sinnvolle Überschrift zu ${generatedExerciseSingularOrPlural} als value zu dem key "heading" hinzu. Die weiteren key value pairs werden in ein array mit dem key "exercises" geschrieben, sodass das JSON so aussieht { "heading": "Relevanter Titel für die generierten Aufgaben", "exercises": [] }. Beschreibe zunächst den vollständigen und korrekten Rechenweg KLEINSCHRITTIG in ganzen Sätzen, den die Schüler nutzen können, um die Aufgabe zu lösen, als array value mit dem key "steps". Sehr wichtig: Ausschließlich konkrete Schritte und Rechnungen! Verwende bei der Aufgabenformulierung einen Operator und vermeide W-Fragen. Anschließend, vervollständige das JSON um folgendes: ${keyDescription}. Gebe KEINEN normalen Text aus, der GESAMTE output MUSS sich innerhalb von einem einzigen JSON Objekt befinden und ${latexPrompt}`
}

function getPreLearningGoalForMultipleChoice({
  topic,
  difficulty = 'low',
}: {
  topic: string
  difficulty: ExerciseGenerationDifficulty | null
}) {
  const difficultyDescriptor = mapDifficultyToDescriptor(difficulty || 'low')

  return `Die Schüler*innen verstehen, wie ${topic} in ${difficultyDescriptor} Situationen angewendet werden kann. `
}
