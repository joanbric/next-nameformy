'use client'
import { use, useRef, useState } from 'react'
import './styles.css'
import NamesSuggested from '@ui/NamesSuggested'
import { AIResponse } from '@/types'
import ModalLayout from '@/ui/ModalLayout'
const characteristics = [
  'Short and catchy',
  'Descriptive and informative',
  'Unique and memorable',
  'Traditional and classic',
  'Modern and innovative',
  'Playful and whimsical',
  'Professional and sophisticated'
]
function Prompt({
  type,
  characteristic,
  meaning,
  language,
  keywords
}: {
  type: string
  characteristic: string | null
  meaning: string | null
  language: string | null
  keywords: string | null
}) {
  return (
    <div className="prompt font-[family-name:var(--font-calistoga)]">
      <h1>
        <span className="secondary">Generate NameForMy</span> {type}
      </h1>
      <p>
        {' '}
        <span className="secondary">must be</span> {characteristic}{' '}
        <span className="secondary">in</span> {language}{' '}
        <span className="secondary">meaning</span> {meaning}{' '}
        <span className="secondary">in addition:</span> {keywords}
      </p>
    </div>
  )
}

const TEXTAREA_PLACEHOLDER = `
- Children's book character: “The name should be fun, playful, and easy for kids to remember.”
- Pet: Keywords like 'pampered,' 'paws,' or 'fluffy'.
- Gaming app: “The name should be dynamic, energetic, and appeal to the target audience of gamers.”
`
export default function Generate({
  params
}: {
  params: Promise<{ type: string }>
}) {
  const [characteristic, setCharacteristics] = useState<string | null>(null)
  const [meaning, setMeaning] = useState<string | null>(null)
  const [language, setLanguage] = useState<string | null>(null)
  const [keywords, setKeywords] = useState<string | null>(null)
  const subject = decodeURIComponent(use(params).type)
  const ref = useRef<HTMLDialogElement | null>(null)
  const [response, setResponse] = useState<AIResponse[] | null>(null)
  const [limitExceeded, setLimitExceeded] = useState(false)

  const handleGenerateName = async () => {
    const res = await fetch(`/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject,
        characteristic,
        meaning,
        language,
        keywords
      })
    })
    //  const res = await generateName({subject, characteristic, meaning, language, keywords})
    //  setResponse(res.res)

    console.log('El estado es:', res.status)
    if (!res.ok) {
      if (res.status === 429) {
        setLimitExceeded(true)
        setResponse(null)
        ref.current?.showModal()
        return
      }
    } else if (limitExceeded === true) {
      setLimitExceeded(false)
    }
    const data = await res.json()
    console.log(data)
    const { name, IPA, valueMeaning, advantages, disadvantages } = data
    setResponse([
      {
        name,
        IPA,
        meaning: valueMeaning,
        advantages,
        disadvantages
      }
    ])

    ref.current?.showModal()
  }

  return (
    <main className="max-w-[1000px] mx-auto px-4">
      {limitExceeded && <ModalLayout title="Name Suggested" ref={ref}>
          <p>Has excedido el limite de nombres que puedes generar</p>
        </ModalLayout>}
      {!limitExceeded && response && (
        <NamesSuggested
          ref={ref}
          response={response}
          handleClick={handleGenerateName}
        />
      )}
      <Prompt
        type={subject}
        characteristic={characteristic}
        meaning={meaning}
        language={language}
        keywords={keywords}
      />

      <section>
        <h2>Please specify the desired characteristics of the name</h2>
        <ul className="flex flex-wrap gap-3 max-w-[800px] mb-3">
          {characteristics.map((characteristic, index) => (
            <li key={index}>
              <button
                className="charac-item"
                onClick={() => {
                  setCharacteristics(characteristic)
                }}
              >
                {characteristic}
              </button>
            </li>
          ))}
        </ul>
        <input
          onChange={(e) => setCharacteristics(e.target.value)}
          value={characteristic ? characteristic : ''}
          className="w-full max-w-[50ch] "
          type="text"
          placeholder="Other (please specify)"
          aria-label="Specify other characteristic"
        />
        <h2>A specific etymology or meaning </h2>
        <input
          onChange={(e) => setMeaning(e.target.value)}
          className="w-full max-w-[50ch] "
          type="text"
          placeholder="Other (please specify)"
        />
        <h2>Select the language you prefer for the name</h2>
        <input
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full max-w-[50ch] "
          type="text"
          placeholder="Other (please specify)"
        />
      </section>
      <section>
        <h2>
          Provide any additional context, keywords, or specific requirements
          that may help us generate a tailored name for your needs
        </h2>
        <textarea
          onChange={(e) => setKeywords(e.target.value)}
          name=""
          id=""
          className="w-full max-w-[50ch] "
          placeholder={TEXTAREA_PLACEHOLDER}
        ></textarea>
        <h2>
          Are you interested in checking the availability of domain names or
          trademarks associated with the generated names?
          <input type="checkbox" />
        </h2>
      </section>

      <button
        onClick={handleGenerateName}
        className="text-[1rem] mt-8 font-[family-name:var(--font-poppins)] bg-primary py-3 px-5 rounded-lg font-bold"
      >
        Generate name
      </button>
      <aside>
        <h4>Please note</h4>
        <p>
          That the name suggestions provided are based on the information you
          provide and are intended to inspire and assist you in your naming
          process. It is recommended to conduct further research, including
          legal and trademark checks, to ensure the suitability and availability
          of the chosen name for your specific purpose.
        </p>
      </aside>
    </main>
  )
}
