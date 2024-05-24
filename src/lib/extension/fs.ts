import fs from 'fs'

export const ensureDir = (
  path: fs.PathLike,
  options?: fs.MakeDirectoryOptions & {
    recursive: true
  }
): void => {
  if (!fs.existsSync(path)) fs.mkdirSync(path, options)
}

export const splitPathToNodes = (path: string): string[] => path.replace('\\', '/').split('/')
