const express = require('express')
const router = express.Router()
const { Permit,User } = require('../../Database/models') // Import your Permit model

// Route to check the status of a permit by permitId
router.get('/check-status/:permitId', async (req, res) => {
  const { permitId } = req.params

  try {
    // Find the permit in the database using Sequelize's `findOne` method
    const permit = await Permit.findOne({
      where: { id: permitId } // Assuming `id` is the field that holds the permit ID
    })

    if (permit) {
      // Return the permit status if found
      return res.json({ status: permit.status })
    } else {
      // Return a 404 if permit not found
      return res.status(404).json({ message: 'Permit not found' })
    }
  } catch (error) {
    // Handle any database errors
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
            attributes: ['workId'], // Customize fields you want from the user
            as: 'User' // only if you used aliasing in associations
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
