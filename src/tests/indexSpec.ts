import supertest from 'supertest'
import app from '../index'
import resizeImage from '../utils/imageResize'
const request = supertest(app)

describe('endpoint image processing', () => {
  it('check image exist and already resized', async () => {
    const response = await request.get(
      '/image/resize?filename=abdo&width=600&height=755'
    )
    expect(response.status).toBe(200)
  })
  it('check image not exist', async () => {
    const response = await request.get(
      '/image/resize?filename=teest&width=1400&height=900'
    )
    expect(response.status).toBe(404)
  })
  it('resizing image was done now', async () => {
    expect(async () => {
      await resizeImage(
        'src/images/full/test.jpg',
        'src/images/thumb/test_400_400.jpg',
        400,
        400
      )
    }).not.toThrow()
  })
})
