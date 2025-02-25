import { CircleX } from 'lucide-react'
import { title } from 'process'

export default function ModalLayout({
  children,
  ref,
  title
}: Readonly<{
  children: React.ReactNode
  ref: React.Ref<HTMLDialogElement>
  title: string
}>) {
  return (
    <dialog
      ref={ref}
      className="backdrop:bg-gray-900/50 p-5 bg-dark_blue rounded-xl text-foreground"
    >
      <header className="flex justify-between items-center mb-10 gap-10">
        <h3 className="text-2xl font-[family-name:var(--font-calistoga)]">
          {title}{' '}
        </h3>
        <CircleX  color="#FF7373"/>
      </header>
      {children}
    </dialog>
  )
}
