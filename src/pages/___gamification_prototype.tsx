import { NextPage } from 'next'
import Head from 'next/head'

const Game: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mathe Redaktions Simulator</title>
      </Head>
      <div className="w-[700px] mx-auto bg-pink-100 ">
        <h1 className="text-3xl pt-8 mb-8">Mathe Redaktions Simulator</h1>
        <p className="italic">
          Du wachst eines Tages auf und hast den Job eines Mathe-Redakteur: Du
          verdienst dein Geld damit, Lerninhalte durchzuklicken und zu bewerten.
          Ok, denkst du dir, warum auch nicht ...
        </p>
        <p className="my-6">Kontostand: 0 ∑</p>
        <div className="flex my-6">
          <span>Neue Aufträge</span>
          <span className="ml-4">abgeschlossen</span>
        </div>
      </div>
    </>
  )
}

export default Game
