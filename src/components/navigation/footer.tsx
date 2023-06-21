import {
  faRedo as newTipIcon,
  faLightbulb as learnTipIcon,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { FaIcon } from '../fa-icon'
import { FooterNav } from '@/components/navigation/footer-nav'
import { useInstanceData } from '@/contexts/instance-context'

export function Footer() {
  const { footerData } = useInstanceData()
  return (
    <footer id="footer">
      <About />
      <FooterNav data={footerData.footerNavigation} />
    </footer>
  )
}

const metaLearningTips = [
  'Distribute your study over time, rather than cramming all at once, to improve long-term retention.',
  "Actively test yourself instead of passively reviewing material; it's one of the most effective ways to enhance memory recall.",
  'Ask yourself why and how questions about the material to deepen your understanding.',
  'Use specific examples to understand abstract concepts; this helps in better understanding and retention.',
  'Combine verbal and visual information to enhance memory and recall.',
  'Explain the material in your own words to understand it better.',
  'Believe that your abilities can be developed through dedication and hard work; this view creates a love of learning and resilience.',
  'Ensure you get enough sleep (8+ hours); sleep is crucial for memory consolidation and learning.',
  'Regular physical activity can enhance cognitive function and learning ability.',
  'Develop metacognitive strategies, such as planning, monitoring, and evaluating your learning progress.',
  'Seek feedback on your learning, as it can help you identify gaps in your understanding and improve performance.',
  'Use analogies to understand new concepts, by relating them to something you already know.',
  "Break complex information into smaller, manageable parts or 'chunks' to make it easier to remember.",
  'Use mind maps to visually organize information, which can help in better understanding and recall.',
  'Set specific, measurable, achievable, relevant, and time-bound (SMART) goals for your learning to stay motivated and focused.',
  'Learn in a variety of environments to improve your ability to recall information in different contexts.',
  "Teach what you've learned to others; this can reinforce your understanding and recall.",
  'Engage multiple senses during learning to enhance memory and recall.',
  'Use the Pomodoro Technique (e.g 25 minutes of focused work followed by a 5-minute break) to maintain focus.',
  'Practice mindfulness meditation to improve attention and focus.',
  'Avoid multitasking when learning, as it can lead to decreased productivity and increased errors.',
  'Organize your physical environment to minimize distractions and improve focus.',
  'Take regular breaks during learning to prevent cognitive fatigue and maintain performance.',
  'Maintain a healthy diet, as nutrition can impact cognitive function and attention.',
  'Stay hydrated, as dehydration can impair attention and cognitive functions.',
  'Use attention training exercises, such as those found in cognitive training programs, to improve focus.',
  'Engaging in exciting activities or exercise that spikes adrenaline after learning can enhance memory consolidation.',
  'Cultivate intrinsic motivation (learning for the joy of learning) rather than relying on extrinsic rewards.',
  'Maintain a positive mindset and attitude towards learning. Positive emotions can enhance learning and memory.',
  "Engage in social learning activities, like study groups or discussion forums. Learning is often more effective when it's a social experience.",
  'Whenever possible, learn at your own pace. Self-paced learning can lead to better comprehension and less stress.',
  'Connect new information to what you already know. Prior knowledge can provide a framework that aids in learning and remembering new information.',
  "Apply what you're learning to real-world situations. This can enhance understanding and retention.",
  'Engage in active learning strategies, such as problem-solving or teaching others, rather than passive strategies like re-reading or rote memorization.',
  'Explain concepts to yourself while learning to improve understanding and recall.',
  'Generate explanations for why a stated fact or concept is true. This can enhance learning, especially with factual content.',
]

/**
 * Ensures that a new learning tip is always displayed when the user clicks the
 * refresh icon.
 */
const getRandomTip = (currentTip?: string): string => {
  let newIndex = Math.floor(Math.random() * metaLearningTips.length)
  if (currentTip) {
    const currentIndex = metaLearningTips.indexOf(currentTip)
    if (newIndex === currentIndex) {
      newIndex = (newIndex + 1) % metaLearningTips.length
    }
  }
  return metaLearningTips[newIndex]
}

function About() {
  const [currentTip, setCurrentTip] = useState<string>(getRandomTip())

  const refreshTip = () => {
    setCurrentTip((prevTip) => getRandomTip(prevTip))
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="relative w-full bg-brand">
        <div className="p-16 text-lg text-white  ">
          <FaIcon icon={learnTipIcon} className="mr-4" />
          {currentTip}
        </div>
        <div
          className={`
            absolute right-4 top-2 flex h-10
            w-10 cursor-pointer items-center justify-center rounded-full text-white
            transition-colors hover:bg-brand-500
          `}
          onClick={refreshTip}
          title="Refresh Tip"
        >
          <FaIcon icon={newTipIcon} className="h-5" />
        </div>
      </div>
    </div>
  )
}
