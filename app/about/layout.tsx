import type React from "react"
import PublicHeader from "@/components/public-header"

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PublicHeader />
      <main className="min-h-screen">{children}</main>
    </>
  )
}

