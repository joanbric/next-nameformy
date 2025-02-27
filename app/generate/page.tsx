import Input from '@ui/Input'
import Link from 'next/link'

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

export default function Generate() {
  return (
    <>
      <ul className="flex flex-wrap gap-3 max-w-[800px] justify-center">
        {things.map((thing, index) => (
          <li key={index}>
            <Link
              href={`/generate/${thing.toLowerCase()}`}
              className="rounded-full bg-gray_light font-bold hover:filter-brightness-110 inline py-2 px-4"
            >
              {thing}
            </Link>
          </li>
        ))}
      </ul>
      <Input />
    </>
  )
}
