import express from 'express'

const router = express.Router()

const supportedAssets = ['svg', 'png', 'jpg', 'png', 'jpeg', 'mp4', 'ogv']

const assetExtensionRegex = () => {
  const formattedExtensionList = supportedAssets.join('|')

  // eslint-disable-next-line no-useless-escape
  return new RegExp(`/.+\.(${formattedExtensionList})$`)
}

router.get(assetExtensionRegex(), (req, res) => {
  res.redirect(303, `http://localhost:5173/src${req.path}`)
})

export default router
