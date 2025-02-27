import { CircleX } from 'lucide-react'
import { title } from 'process'
type props = {
  children: React.ReactNode
  ref: React.RefObject<HTMLDialogElement | null>
  title: string
}
export default function ModalLayout({
  children,
  ref,
  title
}: props) {
  return (
    <dialog
      ref={ref}
      className="backdrop:bg-gray-900/50 p-5 bg-dark_blue rounded-xl text-foreground"
    >
      <header className="flex justify-between items-center mb-10 gap-10">
        <h3 className="text-2xl font-[family-name:var(--font-calistoga)]">
          {title}{' '}
        </h3>
        {ref.current !== null && <button onClick={() => ref.current?.close()}><CircleX  color="#FF7373"/></button>}
        {/* <button onClick={() => ref}><CircleX  color="#FF7373"/></button> */}
      </header>
      {children}
    </dialog>
  )
}
