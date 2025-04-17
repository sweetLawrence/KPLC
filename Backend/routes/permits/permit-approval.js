const express = require('express')
const router = express.Router()
const { Permit } = require('../../Database/models')

router.post('/approve-permit/:permitId', async (req, res) => {
  const { permitId } = req.params // Extract permitId from the URL parameters
  const { permitPayload } = req.body

  console.log(
    '----------------Received APPROVE permitId---------------:',
    permitId
  ) // Log the permitId for debugging
  console.log(permitPayload)

  try {
    // Find the permit by ID and update its status to 'approved'
    const permit = await Permit.findOne({
      where: { id: permitId }
    })

    if (permit) {
      // Update the permit status to 'approved'
      permit.status = 'approved'
      permit.comments = permitPayload.comments
      permit.approverName = permitPayload.approverName
      permit.issueDate = permitPayload.issueDate
      permit.issueTime = permitPayload.issueTime
      await permit.save() // Save the updated permit in the database

      return res.json({ message: 'p-success', permit })
    } else {
      // Return 404 if the permit is not found
      return res.status(404).json({ message: 'Permit not found' })
    }
  } catch (error) {
    console.error(error) // Log any errors for debugging
    return res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/reject-permit/:permitId', async (req, res) => {
  const { permitId } = req.params // Extract permitId from the URL parameters
  const { permitPayload } = req.body
  console.log(permitPayload)

  console.log(
    '----------------Received REJECT permitId---------------:',
    permitId
  ) // Log the permitId for debugging

  try {
    // Find the permit by ID and update its status to 'approved'
    const permit = await Permit.findOne({
      where: { id: permitId }
    })

    if (permit) {
      // Update the permit status to 'approved'
      permit.status = 'rejected'
      permit.comments = permitPayload.comments
      permit.approverName = permitPayload.approverName
      permit.issueDate = permitPayload.issueDate
      permit.issueTime = permitPayload.issueTime
      await permit.save() // Save the updated permit in the database

      return res.json({ message: 'p-failure', permit })
    } else {
      // Return 404 if the permit is not found
      return res.status(404).json({ message: 'Permit not found' })
    }
  } catch (error) {
    console.error(error) // Log any errors for debugging
    return res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
