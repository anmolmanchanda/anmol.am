import React from 'react'

interface FiverrIconProps {
  className?: string
  size?: number
}

export function FiverrIcon({ className = "", size = 20 }: FiverrIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Fiverr"
    >
      <path d="M30.7087,4.5H23.2355c-5.4473,0-10.1982,4.2944-9.88,12.0757H7.9886v7.2454h5.7247V43.5H22.211V23.8211h8.8555V43.5h8.9449V16.5758H22.7478V14.6973a2.8052,2.8052,0,0,1,2.8484-2.9518h5.1125Z"/>
    </svg>
  )
}