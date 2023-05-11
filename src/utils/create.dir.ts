import { existsSync, mkdirSync } from 'fs'

const UPLOADS_DIR = './dist/uploads'

export function MkDirUploads() {
  if (!existsSync(UPLOADS_DIR)) {
    mkdirSync(UPLOADS_DIR)
  }
}
