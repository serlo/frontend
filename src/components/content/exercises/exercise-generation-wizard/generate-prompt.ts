export type ExerciseGenerationDifficulty = 'low' | 'medium' | 'high'

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

const exerciseTypeToPromptTexts: Record<
  string,
  { exerciseText: string; keyDescription: string }
> = {
  'multiple choice': {
    exerciseText: `vom Typ Multiple Correct Answers, bei der es auch mehr als eine korrekte Antwort geben kann`,
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
  const { exerciseText, keyDescription } =
    exerciseTypeToPromptTexts[exerciseType]

  const subtasks =
    numberOfSubtasks < 2
      ? ''
      : ` mit ${numberOfSubtasks} voneinander unabhängigen Teilaufgaben`

  const priorKnowledgeString = priorKnowledge
    ? `Die Schüler haben folgendes Vorwissen: ${priorKnowledge}`
    : 'Die Schüler haben keine Vorkenntnisse.'

  const latexPrompt = '' // 'Formatiere alle Zahlen und mathematischen Ausdrücke in LateX. GIB KEINE ZAHL ALS KLARTEXT AUS!'

  return `Du bist eine kreative Lehrkraft, die spannende Aufgaben für Schüler des ${grade}. Jahrgangs im Fach ${subject} entwickelt. Erstelle zum Thema "${topic}" eine Aufgabe${subtasks} ${exerciseText}. ${priorKnowledgeString}
Nach Bearbeiten der Aufgabe beherrschen die Schüler folgendes besser: ${learningGoal}
Verwende leichte Sprache. Das Anforderungsniveau soll ${difficultyText} sein. Beachte folgende Charakterisierung der Schüler: ${difficultyDescription}.
Stelle die Aufgabe zum Hochladen auf eine Lernplattform in einem unnamed JSON Objekt dar. Beschreibe zunächst den vollständigen und korrekten Rechenweg KLEINSCHRITTIG in ganzen Sätzen, den die Schüler nutzen können, um die Aufgabe zu lösen, als array value mit dem key "steps". Sehr wichtig: Ausschließlich konkrete Schritte und Rechnungen! Füge eine sinnvolle Überschrift zu der generierten Aufgabe als value zu dem key "heading" hinzu. Anschließend, vervollständige das JSON um folgendes: ${keyDescription}. Gebe KEINEN normalen Text aus, der GESAMTE output MUSS sich innerhalb von einem einzigen JSON Objekt befinden. ${latexPrompt}`
}
