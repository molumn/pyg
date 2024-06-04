import fs from 'fs'

export const ensureDir = (
  path: fs.PathLike,
  options?: fs.MakeDirectoryOptions & {
    recursive: true
  }
): void => {
  if (!fs.existsSync(path)) fs.mkdirSync(path, options)
}

export const deleteFolderRecursive = (path: string) => {
  let files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(function (file, index) {
      const curPath = path + '/' + file
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath)
      } else {
        // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

export const splitPathToNodes = (path: string): string[] => path.replaceAll('\\', '/').split('/')
