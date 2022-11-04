import React from 'react'

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <h1>Previewing: </h1>
      {children}
    </section>
  )
}
