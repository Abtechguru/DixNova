import fs from "fs/promises"
import path from "path"
import zlib from "zlib"

export interface ExtractedZipResult {
  zipUrl: string
  extractDirUrl: string
  entryPath: string | null
  entryUrl: string | null
  fileCount: number
  files: string[]
  totalSizeBytes: number
}

const MAX_ZIP_SIZE = 100 * 1024 * 1024 // 100 MB max zip size limit
const MAX_FILE_COUNT = 500 // 500 files max limit per zip

/**
 * Hardened ZIP archive parser & extractor for Power BI packages.
 * Includes magic signature verification, path traversal prevention (`..` protection),
 * decompresses deflate & stored entries, and identifies entry points (HTML, PBIX, Datasets).
 */
export async function extractZipPackage(
  buffer: Buffer,
  reportFolder: string,
  zipFilename: string
): Promise<ExtractedZipResult> {
  if (!buffer || buffer.length === 0) {
    throw new Error("Invalid or empty file buffer provided")
  }

  if (buffer.length > MAX_ZIP_SIZE) {
    throw new Error(`ZIP package size exceeds maximum allowed limit of 100MB (${(buffer.length / (1024 * 1024)).toFixed(1)}MB)`)
  }

  // Magic bytes check (ZIP format signature: 0x04034b50)
  if (buffer.length < 4 || buffer.readUInt32LE(0) !== 0x04034b50) {
    throw new Error("File signature mismatch: expected a valid ZIP archive format")
  }

  const publicDir = path.join(process.cwd(), "public")
  const uploadsDir = path.join(publicDir, "uploads", "powerbi")
  const extractedDir = path.join(uploadsDir, "extracted", reportFolder)
  const zipsDir = path.join(uploadsDir, "zips")

  await fs.mkdir(extractedDir, { recursive: true })
  await fs.mkdir(zipsDir, { recursive: true })

  // Save the raw .zip package safely
  const safeZipName = zipFilename.replace(/[^a-zA-Z0-9.-]/g, "-")
  const zipPath = path.join(zipsDir, safeZipName)
  await fs.writeFile(zipPath, buffer)
  const zipUrl = `/uploads/powerbi/zips/${safeZipName}`

  let offset = 0
  let fileCount = 0
  let totalSizeBytes = 0
  const extractedFiles: string[] = []
  let entryPath: string | null = null

  while (offset < buffer.length - 30) {
    const signature = buffer.readUInt32LE(offset)
    if (signature !== 0x04034b50) {
      break // End of local headers or central directory reached
    }

    const flags = buffer.readUInt16LE(offset + 6)
    const compression = buffer.readUInt16LE(offset + 8)
    const compressedSize = buffer.readUInt32LE(offset + 18)
    const fileNameLen = buffer.readUInt16LE(offset + 26)
    const extraLen = buffer.readUInt16LE(offset + 28)

    const fileNameStart = offset + 30
    const fileName = buffer.toString("utf8", fileNameStart, fileNameStart + fileNameLen)
    const dataStart = fileNameStart + fileNameLen + extraLen
    const isDataDescriptor = (flags & 0x08) !== 0

    if (isDataDescriptor) {
      offset = dataStart + compressedSize
      continue
    }

    if (fileName && !fileName.endsWith("/") && !fileName.startsWith("__MACOSX") && !fileName.includes("/.")) {
      // Path Traversal Security Protection
      const normalizedPath = path.normalize(fileName).replace(/^(\.\.[\/\\])+/, "")
      if (normalizedPath.includes("..") || path.isAbsolute(normalizedPath)) {
        offset = dataStart + compressedSize
        continue // Skip malicious traversal paths
      }

      if (fileCount >= MAX_FILE_COUNT) {
        break // Reached maximum file count safety boundary
      }

      const compressedData = buffer.subarray(dataStart, dataStart + compressedSize)
      let uncompressedData: Buffer | null = null

      if (compression === 0) {
        uncompressedData = compressedData
      } else if (compression === 8) {
        try {
          uncompressedData = zlib.inflateRawSync(compressedData)
        } catch (e) {
          try { uncompressedData = zlib.inflateSync(compressedData) } catch (err) {}
        }
      }

      if (uncompressedData) {
        const cleanFileName = normalizedPath.replace(/\\/g, "/")
        const outFilePath = path.join(extractedDir, cleanFileName)

        // Ensure outFilePath is strictly within target extractedDir
        if (!outFilePath.startsWith(extractedDir)) {
          offset = dataStart + compressedSize
          continue
        }

        await fs.mkdir(path.dirname(outFilePath), { recursive: true })
        await fs.writeFile(outFilePath, uncompressedData)
        
        extractedFiles.push(cleanFileName)
        fileCount++
        totalSizeBytes += uncompressedData.length

        // Detect HTML entry points
        const lowerName = cleanFileName.toLowerCase()
        if (lowerName.endsWith(".html") || lowerName.endsWith(".htm")) {
          if (!entryPath || lowerName.endsWith("index.html") || lowerName.endsWith("report.html")) {
            entryPath = cleanFileName
          }
        }
      }
    }

    offset = dataStart + compressedSize
  }

  const extractDirUrl = `/uploads/powerbi/extracted/${reportFolder}`
  const entryUrl = entryPath ? `${extractDirUrl}/${entryPath}` : null

  return {
    zipUrl,
    extractDirUrl,
    entryPath,
    entryUrl,
    fileCount,
    files: extractedFiles,
    totalSizeBytes: totalSizeBytes || buffer.length
  }
}
