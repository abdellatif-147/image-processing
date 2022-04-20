import sharp from 'sharp'

const resizeImage = async (
  imagePath: string,
  imageNewPath: string,
  width: number,
  height: number
): Promise<void> => {
  const imgProcessed = sharp(imagePath)
    .resize(width, height)
    .toFile(imageNewPath)
    .then()
    .catch((err) => {
      console.log('ERR', err)
    })
  try {
    await imgProcessed
  } catch (e) {
    console.log('image not processed dut to error', e)
  }
}

export default resizeImage
