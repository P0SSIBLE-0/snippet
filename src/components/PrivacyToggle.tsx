import React from 'react'

interface PrivacyToggleProps {
  value: boolean
  onChange: (value: boolean) => void
}

export default function PrivacyToggle({ value, onChange }: PrivacyToggleProps) {
  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        id="privacy-toggle"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="mr-2"
      />
      <label htmlFor="privacy-toggle">Make this snippet public</label>
    </div>
  )
}