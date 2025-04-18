const express = require('express')
const router = express.Router()
const { Permit,User } = require('../../Database/models') 


router.get('/check-status/:permitId', async (req, res) => {
  const { permitId } = req.params

  try {
    
    const permit = await Permit.findOne({
      where: { id: permitId } 
    })

    if (permit) {
      
      return res.json({ status: permit.status, rejectionReason:permit.comments })
    } else {
     
      return res.status(404).json({ message: 'Permit not found' })
    }
  } catch (error) {
    
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

// router.get('/permits', async (req, res) => {
//   console.log('BENDIIIIIIIIIIIIIIIII')
//   try {
//     // const pendingPermits = await Permit.findAll({
//     //     where: { status: 'pending' }
//     // });
//     const pendingPermits = await Permit.findAll()

//     return res.json({ permits: pendingPermits })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ message: 'Failed to fetch pending permits' })
//   }
// })



router.get('/permits', async (req, res) => {
    // console.log('BENDIIIIIIIIIIIIIIIII')
    try {
      const allPermits = await Permit.findAll({
        include: [
          {
            model: User,
            attributes: ['workId'], 
            as: 'User' 
          }
        ]
      })
  
      return res.json({ permits: allPermits })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Failed to fetch permits' })
    }
  })

module.exports = router
