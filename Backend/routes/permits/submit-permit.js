const express = require('express')
const router = express.Router()
const { Permit } = require('../../Database/models')

router.post('/submit-permit', (req, res) => submitPermit(req, res))

async function submitPermit (req, res) {
  try {
    const {
      permitNumber, //
      issuedTo, //
      workDetails, //
      earthPoints, //
      substation, //
      //   workDescription,
      //   mvlvEquipment,

      earthConnections,
      issuedWithConsent, //
      //   issueDate, //
      //   issueTime, //
      //   receiptDate,
      //   receiptTime
      //   clearanceDate,
      //   clearanceTime,
      //   cancellationEarthConnections,
      //   cancellationConsentPerson,
      userId
    } = req.body

    const now = new Date()
    const currentDate = now.toISOString().split('T')[0] // format: YYYY-MM-DD
    const currentTime = now.toTimeString().split(' ')[0] // format: HH:MM:SS

    console.log(
      permitNumber,
      issuedTo,
      workDetails,
      earthPoints,
      substation,
      issuedWithConsent,
      earthConnections
    )

    const permit = await Permit.create({
      permitNumber,
      issuedTo,
      workDetails,
      earthPoints,
      //   workDescription,
      //   mvlvEquipment,
      additionalEarthConnections: earthConnections,
      consentPerson: issuedWithConsent,
      //   issueDate,
      //   issueTime,

      receiptDate: currentDate,
      receiptTime: currentTime,

      //   clearanceDate,
      //   clearanceTime,
      //   cancellationEarthConnections,
      //   cancellationConsentPerson,
      //   cancellationSignature,
      userId
    })

    res.status(201).json({
      message: 'Permit saved successfully',
      permit
    })
  } catch (error) {
    console.error('Error saving permit:', error)
    res.status(500).json({ message: 'Error saving permit', error })
  }
}

// router.post('/cancel-permit', (req, res) => {

// })




router.post('/cancel-permit', (req, res) => {
  const { clearanceCompleted, earthConnections, systemControlEngineer } = req.body;

  // Basic validation
  if (
    typeof clearanceCompleted !== 'boolean' ||
    !earthConnections ||
    !systemControlEngineer
  ) {
    return res.status(400).json({ message: 'Invalid or incomplete data.' });
  }

  // Simulate saving the data (replace this with DB logic)
  const savedData = {
    clearanceCompleted,
    earthConnections,
    systemControlEngineer,
    cancelledAt: new Date().toISOString()
  };

  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: true,      // Only if using HTTPS
    sameSite: 'Strict',
    path: '/',
  });

  console.log('Permit cancellation received:', savedData);

  // Respond with success
  res.status(200).json({
    message: 'Permit cancelled successfully.',
    data: savedData
  });
});



module.exports = router
