import Link from 'next/link'

export default function Hero() {
  return (
    <>
      <section className="text-center flex flex-col items-center">
        <h1 className="text-[4rem] text-balance  font-[family-name:var(--font-calistoga)]">
          Find the Perfect Name with{' '}
          <strong className="text-primary_light">AI Magic</strong>
        </h1>
        <p className="text-[1.5rem] text-balance max-w-[900px] mt-8 mb-4 font-[family-name:var(--font-poppins)] text-gray-400">
          Generate unique and creative names for objects, people, animals,
          places, and more instantly using advanced AI technology.
        </p>
        <p className="text-[1.2rem] text-balance max-w-[900px] font-[family-name:var(--font-poppins)]  text-gray-400">
          Ready to find the perfect name? Click the 'Generate' button and
          discover a list of unique and creative names that fit your
          preferences!
        </p>

        <Link href='generate/' className="text-[1.2rem] mt-8 font-[family-name:var(--font-poppins)] bg-primary py-4 px-6 rounded-lg font-bold">
          Start naming now!
        </Link>
      </section>
    </>
  )
}
