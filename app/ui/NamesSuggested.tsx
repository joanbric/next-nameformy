import { type AIResponse } from '@/types'
import ModalLayout from './ModalLayout'
type props = {
  ref: React.RefObject<HTMLDialogElement | null>
  response: AIResponse[] | null
  handleClick: () => void
}
export default function NamesSuggested({ ref, response, handleClick }: props) {
  return (
    <ModalLayout ref={ref} title="Name Suggested">
      {response &&
        response.map((name, index) => (
          <div key={index}>
            <h2>
              {name.name} ( <small className='font-mono'>{name.IPA}</small>)
            </h2>
            <p>
              <b>Meaning:</b> {name.meaning}
            </p>
            <p>
              <b>Advantages:</b> {name.advantages}
            </p>
            <p>
              <b>Disadvantages:</b> {name.disadvantages}
            </p>
          </div>
        ))}
      <button className='text-[1rem] mt-8 font-[family-name:var(--font-poppins)] bg-primary py-3 px-5 rounded-lg font-bold' onClick={handleClick}>Regenerate</button>
    </ModalLayout>
  )
}
