import fs from 'fs'

const isFileExist = (imageNewPath: string): boolean => {
  return fs.existsSync(imageNewPath)
}

export default isFileExist
