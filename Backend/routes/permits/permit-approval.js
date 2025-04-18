const express = require('express')
const router = express.Router()
const { Permit } = require('../../Database/models')

router.post('/approve-permit/:permitId', async (req, res) => {
  const { permitId } = req.params 
  const { permitPayload } = req.body

  console.log(
    '----------------Received APPROVE permitId---------------:',
    permitId
  ) 
  console.log(permitPayload)

  try {
   
    const permit = await Permit.findOne({
      where: { id: permitId }
    })

    if (permit) {
   
      permit.status = 'approved'
      permit.comments = permitPayload.comments
      permit.approverName = permitPayload.approverName
      permit.issueDate = permitPayload.issueDate
      permit.issueTime = permitPayload.issueTime
      await permit.save()

      return res.json({
        message: 'p-success',
        permit,
        permitStatus: 'approved'
      })
    } else {
      
      return res.status(404).json({ message: 'Permit not found' })
    }
  } catch (error) {
    console.error(error) 
    return res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/reject-permit/:permitId', async (req, res) => {
  const { permitId } = req.params 
  const { permitPayload } = req.body
  console.log(permitPayload)

  console.log(
    '----------------Received REJECT permitId---------------:',
    permitId
  ) 

  try {
    
    const permit = await Permit.findOne({
      where: { id: permitId }
    })

    if (permit) {
      
      permit.status = 'rejected'
      permit.comments = permitPayload.comments
      permit.approverName = permitPayload.approverName
      permit.issueDate = permitPayload.issueDate
      permit.issueTime = permitPayload.issueTime
      await permit.save() 

      return res.json({
        message: 'p-failure',
        permit,
        permitStatus: 'rejected',
        rejectionReason: permitPayload.comments
      })
    } else {

      return res.status(404).json({ message: 'Permit not found' })
    }
  } catch (error) {
    console.error(error) 
    return res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
