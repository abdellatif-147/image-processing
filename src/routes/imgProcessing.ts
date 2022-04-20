import express from 'express'
import path from 'path'
import imageResize from '../utils/imageResize'
import isFileExist from '../utils/isFileExist'
const router = express.Router()

router.get(
  '/image/resize',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const width: number = req.query.width as unknown as number
    const height: number = req.query.height as unknown as number
    const imagePath = `src/images/full/${req.query.filename}.jpg`
    if (+width <= 0 || +height <= 0 || isNaN(+width) || isNaN(+height)) {
      res.status(400).send('please write width and height with right way')
    }
    const imageNewPath = `src/images/thumb/${
      req.query.filename
    }_${+width}_${+height}.jpg`
    if (isFileExist(imageNewPath)) {
      res.status(200).sendFile(path.resolve(imageNewPath))
    } else if (isFileExist(imagePath)) {
      await imageResize(imagePath, imageNewPath, +width, +height)
      res.status(201).sendFile(path.resolve(imageNewPath))
    } else {
      res
        .status(404)
        .send('please add exist image name right with your dimensions')
    }
  }
)
export default router
