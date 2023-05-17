import clsx from 'clsx'
import { useState } from 'react'

import { Link } from '@/components/content/link'

export function MetadataApiPresentation() {
  return (
    <>
      <div
        className={clsx(
          'md:left-[calc(-50vw+50%)] md:relative',
          'md:text-left md:ml-0',
          '-mt-12 sm:text-center',
          'text-gray-700'
        )}
      >
        <section className={clsx('font-bold text-center mt-32 px-4')}>
          <h1
            className={clsx(
              'text-5xl font-extrabold',
              'tracking-tight leading-tight',
              'mt-3 mx-auto'
            )}
          >
            <span className="underlined !pr-0 pb-2">Metadata API</span>
          </h1>
        </section>

        <section
          className={clsx('text-left mt-16 mb-16 px-4 mx-auto max-w-5xl')}
        >
          <div className="sm:flex sm:justify-between">
            <div className="sm:flex-1 text-xl leading-cozy sm:max-w-[31rem] sm:flex sm:flex-col pr-2">
              <h2 className="text-gray-700 text-[1.3rem] font-extrabold tracking-tight">
                <br />
                Integrate our Digital Learning Resources into your apps
              </h2>
              <p className="mt-4">
                Our new Metadata API makes it easy to integrate thousands of
                Serlo articles, courses, videos, and interactive exercises. Just
                read on and take a look at the codesnippets below to get
                started.
              </p>
              <p className="mt-4">
                Our metadata API is completely free and it only takes a few
                lines of code to integrate a vast repository of educational
                resources into your app!
              </p>
            </div>
            <div className="sm:flex-1 mt-8 ml-4 -mx-side sm:max-w-[32rem] rounded-lg overflow-hidden">
              <img
                src="/_assets/img/metadata/metadata.png"
                alt="A bird flying over a stack of documents"
              />
            </div>
          </div>
        </section>

        <section
          className={clsx('bg-orangeBow bg-100% px-2 mt-0 !pt-16 mb-20')}
        >
          <div className="mt-2 pb-16 sm:flex text-center text-xl max-w-4xl mx-auto px-4">
            <div className="flex-1 mt-5">
              <b className="text-brand font-handwritten text-4xl">20,000+</b>
              <br />
              Educational resources have been created with the{' '}
              <Link href="https://serlo.org/editor">Serlo Editor</Link>
            </div>
            <div className="flex-1 mt-5">
              <b className="text-brand font-handwritten text-4xl">1 Mio+</b>
              <br />
              Users per month already learn with Serlo
            </div>
          </div>
        </section>

        <section className={clsx('mt-24 pb-16')}>
          <div className="text-3xl leading-cozy max-w-4xl text-center mx-auto"></div>

          <div className="mt-12 text-3xl leading-cozy max-w-4xl text-center mx-auto">
            <h2 className="text-center text-4xl leading-cozy tracking-tight font-extrabold mb-4">
              Development and license
            </h2>
            <div className="text-left mx-side">
              <p className="mt-4 text-xl leading-cozy flex-1">
                Join our growing community by integrating our content through
                the Serlo Metadata API into your apps and change the future of
                education with us!
              </p>
              <p className="mt-2 text-xl leading-cozy">
                Licensed under,{' '}
                <Link href="https://creativecommons.org/licenses/by-sa/4.0/">
                  CC-BY-SA 4.0
                </Link>
                , the usage is completely free of cost.
              </p>
              <ul className="serlo-ul text-xl">
                <li>
                  Retrieve metadata of all our articles, videos, courses and
                  quizzes
                </li>
                <li>Easy to use interface</li>
                <li>
                  Follow popular aggregators such as{' '}
                  <Link href="https://wirlernenonline.de/">
                    WirLernenOnline
                  </Link>{' '}
                  that have already integrated our content
                </li>
                <li>
                  Fully compliant with the state of the art{' '}
                  <Link href="https://dini-ag-kim.github.io/amb/draft/">
                    AMB standard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <CodeSnippets />
        <div className="mt-4" />
        <ExampleResponse />
      </div>
    </>
  )
}

const codeSnippets: Record<string, string> = {
  'Node.js': `
const fetch = require('node-fetch');

const payload = {
  first: 10,
  after: 1234,
  instance: 'de',
  modified_after: '2023-05-17T00:00:00Z'
};

fetch('https://api.serlo.org/graphql', {
  method: 'POST',
  body: JSON.stringify(payload),
  headers: { 'Content-Type': 'application/json' }
})
.then(res => res.json())
.then(json => console.log(json));
  `,
  Python: `
import requests
import json

payload = {
  "first": 10,
  "after": 1234,
  "instance": "de",
  "modified_after": "2023-05-17T00:00:00Z"
}

response = requests.post('https://api.serlo.org/graphql',
  data=json.dumps(payload),
  headers={'Content-Type': 'application/json'})

print(response.json())
`,
  Rust: `
use reqwest::Client;
use serde_json::json;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
  let client = Client::new();

  let payload = json!({
    "first": 10,
    "after": 1234,
    "instance": "de",
    "modified_after": "2023-05-17T00:00:00Z"
  });

  let res = client.post("https://api.serlo.org/graphql")
    .json(&payload)
    .send()
    .await?;

  let response_json: serde_json::Value = res.json().await?;

  println!("{:#?}", response_json);
}`,
}

const CodeSnippets = () => {
  const [activeTab, setActiveTab] = useState<string>('Node.js')

  return (
    <div className="tabs text-center">
      <div className="tab-list">
        {['Node.js', 'Python', 'Rust'].map((tabName) => (
          <button
            key={tabName}
            onClick={() => setActiveTab(tabName)}
            className={`tab py-2 px-4 rounded-t-lg ${
              activeTab === tabName ? 'bg-gray-200' : 'bg-white'
            }`}
          >
            {tabName}
          </button>
        ))}
      </div>
      <div className="tab-content p-4 border-t-2 border-gray-200 rounded-b-lg relative">
        <button
          onClick={() => navigator.clipboard.writeText(codeSnippets[activeTab])}
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
        >
          Copy
        </button>
        <pre className="text-left ml-4">
          <code>{codeSnippets[activeTab]}</code>
        </pre>
      </div>
    </div>
  )
}

const exampleJsonResponse = `
"@context": [
  "https://w3id.org/kim/lrmi-profile/draft/context.jsonld",
  {
    "@language": "de",
    "@vocab": "http://schema.org/",
    "type": "@type",
    "id": "@id"
  }
],
"id": "https://serlo.org/18865",
"type": [ "LearningResource", "Video" ],
"creator": [
  {
    "id": "https://serlo.org/22573",
    "name": "12600e93",
    "type": "Person",
    "affiliation": {
      "id": "https://serlo.org/#organization",
      "type": "Organization",
      "name": "Serlo Education e.V.",
    },
  },
  {
    "id": "https://serlo.org/15478",
    "name": "125f467c",
    "type": "Person",
    "affiliation": {
      "id": "https://serlo.org/#organization",
      "type": "Organization",
      "name": "Serlo Education e.V.",
    },
  },
  {
    "id": "https://serlo.org/15491",
    "name": "125f4a84",
    "type": "Person",
    "affiliation": {
      "id": "https://serlo.org/#organization",
      "type": "Organization",
      "name": "Serlo Education e.V.",
    },
  }
],
"dateCreated": "2014-03-17T16:18:44+00:00",
"dateModified": "2014-05-01T09:22:14+00:00",
"headline": "Satz des Pythagoras",
"identifier": {
  "propertyID": "UUID",
  "type": "PropertyValue",
  "value": 18865
},
"inLanguage": [ "de" ],
"interactivityType": { "id": "http://purl.org/dcx/lrmi-vocabs/interactivityType/active" },
"isAccessibleForFree": true,
"isFamilyFriendly": true,
"learningResourceType": [
  { "id": "http://w3id.org/openeduhub/vocabs/learningResourceType/video" },
  { "id": "http://w3id.org/openeduhub/vocabs/learningResourceType/audiovisual_medium" },
],
"license": { "id": "https://creativecommons.org/licenses/by-sa/4.0/" },
"mainEntityOfPage": {
  "id": "https://serlo.org/metadata-api",
  "provider": {
    "id": "https://serlo.org/#organization",
    "type": "Organization",
    "name": "Serlo Education e.V."
  },
},
"maintainer": {
  "id": "https://serlo.org/#organization",
  "type": "Organization",
  "name": "Serlo Education e.V.",
},
"name": "Satz des Pythagoras",
"isPartOf": [
  { "id": "https://serlo.org/1381" },
  { "id": "https://serlo.org/16214" },
],
"publisher": [
  {
    "id": "https://serlo.org/#organization",
    "type": "Organization",
    "name": "Serlo Education e.V.",
  },
],
"version": "https://serlo.org/24383"
`

const ExampleResponse = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full max-w-xl px-4 py-3 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left cursor-pointer px-4 py-2 -mx-3 focus:outline-none"
      >
        <span className="font-semibold text-gray-700 dark:text-gray-200 inline">
          Example Response
        </span>
        <span className="text-gray-700 dark:text-gray-200 float-right">
          {isOpen ? '-' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2  px-4 py-2 bg-gray-100 dark:bg-gray-700">
          <pre className="text-gray-700 dark:text-gray-200 overflow-x-auto text-left">
            <code>{exampleJsonResponse}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
