import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Knowledge Hub - Technical Blog",
  description: "Deep dives into cutting-edge web technologies, AI-assisted development, and the future of software engineering",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}