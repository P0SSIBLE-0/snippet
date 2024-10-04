import React from 'react'

const languages = [
  'javascript',
  'python',
  'java',
  'cpp',
  'ruby',
  'go',
  'rust',
  'typescript',
  'php',
  'csharp',
]

interface LanguageSelectorProps {
  value: string
  setLanguage: (value: string) => void
}

export default function LanguageSelector({ value, setLanguage }: LanguageSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => setLanguage(e.target.value)}
      className=" w-full md:max-w-56 lg:max-w-60 mb-4 p-2 border rounded dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-500"
    >
      {languages.map((lang) => (
        <option  key={lang} value={lang}>
          {lang.charAt(0).toUpperCase() + lang.slice(1)}
        </option>
      ))}
    </select>
  )
}