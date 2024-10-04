import { Share2 } from 'lucide-react'
import React, { useState } from 'react'

interface ShareButtonProps {
  snippetId: string
}

export default function ShareButton({ snippetId }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/snippets/${snippetId}`

  const handleShare = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleShare}
      className="border border-gray-200 dark:border-zinc-700 dark:text-gray-100 hover:opacity-85 text-gray-900 inline-flex items-center py-2 px-4 rounded"
    >
      <Share2 className="size-4 mr-2"/>
      {copied ? 'Copied!' : 'Share'}
    </button>
  )
}