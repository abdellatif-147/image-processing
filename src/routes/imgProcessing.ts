import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
const router = express.Router();
const isFileExist = (imageNewPath: string): boolean => {
  return fs.existsSync(imageNewPath);
};
router.get('/image/resize', async (req, res): Promise<void> => {
  const width: number = req.query.width as unknown as number;
  const height: number = req.query.height as unknown as number;
  const imagePath = `src/images/full/${req.query.filename}.jpg`;
  if (width && height && (isNaN(+width) || isNaN(+height))) {
    res.status(400).send('please write a number for width and height ');
  }
  const imageNewPath = `src/images/thumb/${
    req.query.filename
  }_${+width}_${+height}.jpg`;
  if (isFileExist(imageNewPath)) {
    res.status(200).sendFile(path.resolve(imageNewPath));
  } else if (isFileExist(imagePath)) {
    sharp(imagePath)
      .resize(+width, +height)
      .toFile(imageNewPath, () => {
        res.status(201).sendFile(path.resolve(imageNewPath));
      });
  } else {
    res
      .status(404)
      .send('please add exist image name right with your dimensions');
  }
});
export default router;
