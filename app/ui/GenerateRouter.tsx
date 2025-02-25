'use client'
import { ChevronRight } from 'lucide-react'
import ModalLayout from './ModalLayout'
import Link from 'next/link'
import { useRef } from 'react'

const things = [
  'Dog',
  'House',
  'Book',
  'Laptop',
  'Guitar',
  'Painting',
  'Movie',
  'Song',
  'Restaurant',
  'Cake',
  'Bicycle',
  'Magazine',
  'Game',
  'Toy',
  'Character',
  'Product',
  'Company',
  'Brand',
  'Website',
  'App',
  'Event',
  'Project',
  'Artwork',
  'Shop',
  'Sports team',
  'Cat',
  'Party',
  'Parrot',
  'Son',
  'Daughter',
  'Lizard'
]

export default function GenerateRouter({
  ref
}: Readonly<{ ref: React.Ref<HTMLDialogElement> }>) {
  const input = useRef<HTMLInputElement | null>(null)
  
  const handleClick = () => {
    if (input.current) {
      const value = input.current.value
      if (value && value.length > 0) {
        window.location.href = `/generate/${value.toLowerCase()}`
      }
    }
  }
  return (
    <ModalLayout ref={ref} title="Who or what do you want to name?">
      <ul className="flex flex-wrap gap-3 max-w-[800px] justify-center">
        {things.map((thing, index) => (
          <li
          key={index}
          >
            <Link
              href={`/generate/${thing.toLowerCase()}`} className="rounded-full bg-gray_light font-bold hover:filter-brightness-110 inline py-2 px-4"
            >
            {thing}
            </Link>
          </li>
        ))}
      </ul>

      <div className='flex items-center mt-5 gap-3 justify-center'>
        <input
          ref={input}
          className="w-full max-w-[30ch] "
          type="text"
          placeholder="Other (please specify)"
        />
        <button onClick={handleClick} className='border-2 rounded-md border-gray-400'><ChevronRight  /></button>
      </div>
    </ModalLayout>
  )
}
