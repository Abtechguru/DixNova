import * as React from "react"

export interface PageBlock {
  id: string
  type: string
  data: any
}

interface BlockRendererProps {
  blocks: PageBlock[]
}

// In a real app, these would be separate imported components.
// For now, we inline simple renderers for demonstration.
const HeroBlock = ({ data }: { data: any }) => (
  <section className="bg-primary text-primary-foreground py-20 px-6 lg:px-12">
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-5xl font-display font-bold leading-tight">{data.headline}</h1>
      <p className="text-xl opacity-80 max-w-2xl">{data.subheadline}</p>
      {data.ctaText && (
        <a href={data.ctaLink || "#"} className="inline-block bg-background text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-surface transition">
          {data.ctaText}
        </a>
      )}
    </div>
  </section>
)

const TextBlock = ({ data }: { data: any }) => (
  <section className="py-12 px-6 lg:px-12 max-w-4xl mx-auto prose prose-neutral dark:prose-invert">
    <div dangerouslySetInnerHTML={{ __html: data.html }} />
  </section>
)

const PowerBiBlock = ({ data }: { data: any }) => (
  <section className="py-12 px-6 lg:px-12 max-w-7xl mx-auto space-y-4">
    <h2 className="text-3xl font-display font-bold">{data.title}</h2>
    <div className="w-full aspect-[16/9] bg-surface rounded-xl border border-surface/50 overflow-hidden flex items-center justify-center text-foreground-secondary shadow-lg">
      <p>Embedded Power BI Report: {data.reportId}</p>
    </div>
  </section>
)

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || !Array.isArray(blocks)) return null

  return (
    <div className="flex flex-col w-full">
      {blocks.map((block) => {
        switch (block.type) {
          case "HERO":
            return <HeroBlock key={block.id} data={block.data} />
          case "TEXT":
            return <TextBlock key={block.id} data={block.data} />
          case "POWER_BI":
            return <PowerBiBlock key={block.id} data={block.data} />
          default:
            return (
              <div key={block.id} className="p-4 border-2 border-dashed border-danger/50 text-danger text-center my-4">
                Unknown Block Type: {block.type}
              </div>
            )
        }
      })}
    </div>
  )
}
