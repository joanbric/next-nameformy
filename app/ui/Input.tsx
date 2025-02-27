'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { redirect, RedirectType } from 'next/navigation'
export default function Input() {
  const [paramType, setParamType] = useState<string | null>(null)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') setParamType(null)
    else setParamType(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && paramType) {
      redirect(`/generate/${paramType}`, RedirectType.push)
    }
  }

  return (
    <div className="flex items-center mt-5 gap-3 justify-center">
      <input
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        className="w-full max-w-[30ch] "
        type="text"
        placeholder="Other (please specify)"
      />

      {paramType && (
        <Link
          href={`/generate/${paramType}`}
          className="border-2 rounded-md border-gray-400"
        >
          <ChevronRight />
        </Link>
      )}
    </div>
  )
}
