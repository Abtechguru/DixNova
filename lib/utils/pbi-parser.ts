import * as fs from "fs"
import * as path from "path"

export interface ParsedPbiVisual {
  id: string
  pageName: string
  visualType: string
  title?: string
  x: number
  y: number
  width: number
  height: number
  config?: any
  filters?: any[]
  queryFields?: string[]
}

export interface ParsedPbiPage {
  id: string
  name: string
  displayName: string
  visualCount: number
  visuals: ParsedPbiVisual[]
}

export interface ParsedPbiReport {
  pages: ParsedPbiPage[]
  totalVisuals: number
  slicers: Array<{ name: string; page: string }>
  titles: string[]
  measures: string[]
  textBoxes: string[]
}

export function parsePbiLayoutFile(layoutPath: string): ParsedPbiReport | null {
  try {
    if (!fs.existsSync(layoutPath)) return null

    const buffer = fs.readFileSync(layoutPath)
    let jsonStr = ""

    // Try decoding UTF-16LE first (Power BI standard), then UTF-8
    try {
      jsonStr = buffer.toString("utf16le")
      JSON.parse(jsonStr)
    } catch {
      try {
        jsonStr = buffer.toString("utf8")
        JSON.parse(jsonStr)
      } catch {
        // Strip BOM or null bytes if present
        jsonStr = buffer.toString("utf8").replace(/\0/g, "")
      }
    }

    const layoutData = JSON.parse(jsonStr)
    if (!layoutData || !Array.isArray(layoutData.sections)) return null

    const pages: ParsedPbiPage[] = []
    const slicers: Array<{ name: string; page: string }> = []
    const titles: string[] = []
    const measures: string[] = []
    const textBoxes: string[] = []
    let totalVisuals = 0

    layoutData.sections.forEach((section: any, sectionIdx: number) => {
      const pageName = section.displayName || section.name || `Page ${sectionIdx + 1}`
      const pageVisuals: ParsedPbiVisual[] = []

      if (Array.isArray(section.visualContainers)) {
        section.visualContainers.forEach((container: any, vIdx: number) => {
          totalVisuals++
          let config: any = {}
          try {
            if (container.config) {
              config = JSON.parse(container.config)
            }
          } catch {}

          const singleVisual = config.singleVisual || {}
          const visualType = singleVisual.visualType || "unknown"

          // Extract Visual Title
          let visualTitle = ""
          try {
            const titleObj = singleVisual.objects?.title?.[0]?.properties?.text?.expr?.Literal?.Value
            if (titleObj) {
              visualTitle = String(titleObj).replace(/^'|'$/g, "")
              titles.push(visualTitle)
            }
          } catch {}

          // Extract Textboxes / Notes / Recommendations
          try {
            const paragraphs = singleVisual.objects?.general?.[0]?.properties?.paragraphs
            if (Array.isArray(paragraphs)) {
              paragraphs.forEach((p: any) => {
                if (Array.isArray(p.textRuns)) {
                  p.textRuns.forEach((r: any) => {
                    if (r.value && typeof r.value === "string" && r.value.trim().length > 3) {
                      textBoxes.push(r.value.trim())
                    }
                  })
                }
              })
            }
          } catch {}

          // Extract Slicers
          if (visualType === "slicer" || visualType.includes("slicer")) {
            slicers.push({
              name: visualTitle || `Slicer ${slicers.length + 1}`,
              page: pageName
            })
          }

          // Extract Query Projections / Measures
          const queryFields: string[] = []
          try {
            const selects = singleVisual.prototypeQuery?.Select
            if (Array.isArray(selects)) {
              selects.forEach((sel: any) => {
                const fieldName = sel.Property || sel.Name || sel.Measure
                if (fieldName) {
                  queryFields.push(fieldName)
                  if (sel.Measure) measures.push(sel.Measure)
                }
              })
            }
          } catch {}

          pageVisuals.push({
            id: container.id || `visual-${vIdx}`,
            pageName,
            visualType,
            title: visualTitle,
            x: container.x || 0,
            y: container.y || 0,
            width: container.width || 0,
            height: container.height || 0,
            config,
            queryFields
          })
        })
      }

      pages.push({
        id: section.name || `page-${sectionIdx}`,
        name: section.name,
        displayName: pageName,
        visualCount: pageVisuals.length,
        visuals: pageVisuals
      })
    })

    return {
      pages,
      totalVisuals,
      slicers,
      titles,
      measures,
      textBoxes
    }
  } catch (err) {
    console.error("Error parsing Power BI Report/Layout:", err)
    return null
  }
}
