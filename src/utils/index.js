import fs from 'fs'
import path from 'path'

function requireDir(dir, excepts = []) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((subDir) => {
      return subDir.isDirectory()
    })
    .map((dirent) => dirent.name)
    .map((subDir) => {
      const filePath = `${dir}/${subDir}`
      const files = fs.readdirSync(filePath)
      const returnFile = files.find((file) => {
        return file.includes('.controller.js')
      })
      return path.join(subDir, returnFile)
    })
    .map((file) => require(path.join(dir, file)))
}

export { requireDir }
