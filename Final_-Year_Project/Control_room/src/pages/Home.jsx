import React, { useState, useEffect } from 'react'
import './Home.css'
import logo from '../assets/LOGO3.png'
import axios from 'axios'
import { Toaster, toast } from 'sonner'
import isEqual from 'lodash.isequal'

const Home = () => {
  const [pendingPermits, setPendingPermits] = useState([])
  const [selectedPermit, setSelectedPermit] = useState(null)
  const [approvalForm, setApprovalForm] = useState({
    status: '',
    comments: '',
    approverName: '',
    approvalDate: '',
    approvalTime: ''
  })

  const [processedPermits, setProcessedPermits] = useState([])

  const [viewMode, setViewMode] = useState('pending')

  useEffect(() => {

    setInterval(() => {
      fetchMockPendingPermits()
    }, 5000)

    // Apply styles when component mounts
    document.body.style.backgroundColor = '#f8f9fa'
    document.body.style.color = '#333'
    document.body.style.marginTop = '90px'

    return () => {
      // Reset styles when component unmounts
      document.body.style.backgroundColor = ''
      document.body.style.color = ''
      document.body.style.marginTop = ''
    }
  }, [])

  console.log("creeeeeeee",selectedPermit)


  // async function fetchMockPendingPermits () {
  //   try {
  //     const response = await axios.get('http://localhost:3001/api/permits') 
  //     const allPermits = response.data.permits

  //     console.log('All Permits:', allPermits)

  //     const pending = allPermits.filter(p => p.status === 'pending')
  //     const processed = allPermits.filter(
  //       p => p.status === 'approved' || p.status === 'rejected'
  //     )

  //     setPendingPermits(pending)
  //     setProcessedPermits(processed) 
  //   } catch (error) {
  //     console.error('Error fetching permits:', error)
  //   }
  // }
  async function fetchMockPendingPermits() {
    try {
      const response = await axios.get('http://localhost:3001/api/permits')
      const allPermits = response.data.permits
  
      const pending = allPermits.filter(p => p.status === 'pending')
      const processed = allPermits.filter(
        p => p.status === 'approved' || p.status === 'rejected'
      )
  
      // Only update state if data has changed
      if (!isEqual(pending, pendingPermits)) {
        setPendingPermits(pending)
      }
  
      if (!isEqual(processed, processedPermits)) {
        setProcessedPermits(processed)
      }
  
    } catch (error) {
      console.error('Error fetching permits:', error)
    }
  }



  const handleSelectPermit = permit => {
    setSelectedPermit(permit)
   
    const now = new Date()
    setApprovalForm({
      status: '',
      comments: '',
      approverName: '',
      approvalDate: now.toISOString().split('T')[0],
      approvalTime: now.toTimeString().substring(0, 5)
    })
  }

  const handleApprovalChange = e => {
    const { name, value } = e.target
    setApprovalForm(prev => ({ ...prev, [name]: value }))
  }

  const handlePermitAction = async action => {
    if (!approvalForm.approverName) {
      alert('Please enter your name as the approver')
    
      return
    }

    const permitPayload = {
      // ...selectedPermit,
      // status: action,
      comments: approvalForm.comments,
      approverName: approvalForm.approverName,
      issueDate: approvalForm.approvalDate,
      issueTime: approvalForm.approvalTime
    }

    const response =
      action === 'approve'
        ? await axios.post(
            `http://localhost:3001/api/approve-permit/${selectedPermit.id}`,
            {
              permitPayload
            }
          )
        : await axios.post(
            `http://localhost:3001/api/reject-permit/${selectedPermit.id}`,
            {
              permitPayload
            }
          )

    toast.info('Wait...')

    if (response.data.message === 'p-success') {
      toast.success('Permit approved Successfully')
    } else if (response.data.message === 'p-failure') {
      toast.success('Permit Rejected Successfully')
    }

    setPendingPermits(prev => prev.filter(p => p.id !== selectedPermit.id))
  
    setSelectedPermit(null)
  }


  const formatTimeAgo = (dateString) => {
   
    const submitted = new Date(dateString.replace(' ', 'T'))
    const now = new Date()
    const diffMs = now - submitted
    const diffMins = Math.floor(diffMs / 60000)
  
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
    } else if (diffMins < 1440) {
      const diffHrs = Math.floor(diffMins / 60)
      return `${diffHrs} hour${diffHrs !== 1 ? 's' : ''} ago`
    } else {
      const diffDays = Math.floor(diffMins / 1440)
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
    }
  }


  // Get urgency class for styling
  const getUrgencyClass = urgency => {
    switch (urgency) {
      case 'high':
        return 'high-urgency'
      case 'medium':
        return 'medium-urgency'
      case 'low':
        return 'low-urgency'
      default:
        return ''
    }
  }



  return (
    <div className='dashboard-container'>
      {/* Header with logo */}
      <div className='nav'>
        <img src={logo} alt='LOGO' />
        <div className='h1_container'>
          <h1>KENYA POWER </h1>
          <h2>and LIGHTING COMPANY</h2>
        </div>
      </div>

      <div className='dashboard-content'>
        <div className='dashboard-header'>
          <h1>System Control Engineer Dashboard</h1>
          <p>Review and manage electrical permits to work</p>

          <div className='view-toggle'>
            <button
              className={viewMode === 'pending' ? 'active' : ''}
              onClick={() => setViewMode('pending')}
            >
              Pending Approvals
            </button>
            <button
              className={viewMode === 'history' ? 'active' : ''}
              onClick={() => setViewMode('history')}
            >
              Approval History
            </button>
          </div>
        </div>

        <div className='dashboard-main'>
          <div className='permit-list'>
            <h2>
              {viewMode === 'pending' ? 'Pending Permits' : 'Processed Permits'}
            </h2>

            {viewMode === 'pending' && pendingPermits.length === 0 && (
              <p className='no-permits'>No pending permits to review</p>
            )}

            {viewMode === 'history' && processedPermits.length === 0 && (
              <p className='no-permits'>No processed permits in history</p>
            )}

            {/* Fetch all permits */}
            {viewMode === 'pending' &&
              pendingPermits.map(permit => (
                <div
                  key={permit.id}
                  className={`permit-card ${
                    selectedPermit?.id === permit.id ? 'selected' : ''
                  } ${getUrgencyClass(permit.urgency)}`}
                  onClick={() => handleSelectPermit(permit)}
                >
                  <div className='permit-card-header'>
                    <h3>{permit.permitNumber}</h3>
                    <span className='time-ago'>
                      {formatTimeAgo(permit?.createdAt)}
                    </span>
                  </div>
                  <p>
                    <strong>Issued To:</strong> {permit.issuedTo}
                  </p>
                  <p>
                    <strong>Work:</strong> {permit.workDescription}
                  </p>
                  <p>
                    <strong>Equipment:</strong> {permit.mvlvEquipment}
                  </p>
                  <div className='permit-card-footer'>
                    {/* <span className='permit-id'>{permit.id}</span> */}
                    <span className='permit-id'>{permit.User.workId}</span>
                    <span className='urgency-indicator'>
                      {/* {permit.urgency === 'high'
                        ? '⚠️ High Priority'
                        : permit.urgency === 'medium'
                        ? '⚡ Medium Priority'
                        : 'Low Priority'} */}
                    </span>
                  </div>
                </div>
              ))}
            {/* Fetch all permits */}

            {viewMode === 'history' &&
              processedPermits.map(permit => (
                <div
                  key={permit.id}
                  className={`permit-card ${
                    permit.status === 'approved' ? 'approved' : 'rejected'
                  }`}
                  onClick={() => handleSelectPermit(permit)}
                >
                  <div className='permit-card-header'>
                    <h3>{permit.permitNumber}</h3>
                    <span className={`status-badge ${permit.status}`}>
                      {permit.status === 'approved'
                        ? '✓ Approved'
                        : '✗ Rejected'}
                    </span>
                  </div>
                  <p>
                    <strong>Issued To:</strong> {permit.issuedTo}
                  </p>
                  <p>
                    <strong>Work:</strong> {permit.workDescription}
                  </p>
                  <p>
                    <strong>Approved By:</strong> {permit.approverName}
                  </p>
                  <p>
                    <strong>Date:</strong> {permit.approvalDate} at{' '}
                    {permit.approvalTime}
                  </p>
                  <div className='permit-card-footer'>
                    <span className='permit-id'> ID: {selectedPermit?.User.workId}</span>
                  </div>
                </div>
              ))}
          </div>

          <div className='permit-details'>
            {selectedPermit ? (
              <div className='permit-review'>
                <h2>
                  Permit Review: {selectedPermit.permitNumber}
                  <span className='permit-id-small'>
                    {/* ID: {selectedPermit.id} */}
                    ID: {selectedPermit.User.workId}
                  </span>
                </h2>

                <div className='permit-info'>
                  <div className='info-section'>
                    <h3>General Information</h3>
                    <p>
                      <strong>Issued To:</strong> {selectedPermit.issuedTo}
                    </p>
                    <p>
                      <strong>Issue Date:</strong> {selectedPermit.issueDate}
                    </p>
                    <p>
                      <strong>Issue Time:</strong> {selectedPermit.issueTime}
                    </p>
                    <p>
                      <strong>Submitted:</strong>{' '}
                      {formatTimeAgo(selectedPermit.createdAt)}
                    </p>
                  </div>

                  <div className='info-section'>
                    <h3>Work Details</h3>
                    <p>
                      {/* <strong>Description:</strong>{' '} */}
                      {/* {selectedPermit.workDescription} */}
                    </p>
                    <div className='work-details-list'>
                      {selectedPermit.workDetails.map((detail, idx) => (
                        <p key={idx}>• {detail}</p>
                      ))}
                    </div>
                  </div>

                  <div className='info-section'>
                    <h3>Safety Information</h3>
                    <p>
                      <strong>MV/LV Equipment:</strong>{' '}
                      {selectedPermit.mvlvEquipment}
                    </p>
                    <p>
                      <strong>Earth Points:</strong>
                    </p>
                    <div className='earth-points-list'>
                      {selectedPermit.earthPoints.map((point, idx) => (
                        <p key={idx}>• {point}</p>
                      ))}
                    </div>
                    <p>
                      <strong>Additional Earth Connections:</strong>{' '}
                      {selectedPermit.additionalEarthConnections}
                    </p>
                  </div>
                </div>

                {!selectedPermit.status === 'pending' ? (
                  // If permit is already processed, show the decision details
                  <div className='decision-details'>
                    <h3>Decision Information</h3>
                    <p>
                      <strong>Status:</strong>
                      <span className={`status-text ${selectedPermit.status}`}>
                        {selectedPermit.status === 'approved'
                          ? 'Approved'
                          : 'Rejected'}
                      </span>
                    </p>
                    <p>
                      <strong>Comments:</strong> {selectedPermit.comments}
                    </p>
                    <p>
                      <strong>Decided By:</strong> {selectedPermit.approverName}
                    </p>
                    <p>
                      <strong>Date/Time:</strong> {selectedPermit.approvalDate}{' '}
                      at {selectedPermit.approvalTime}
                    </p>
                  </div>
                ) : (
                  // If permit is pending, show the approval form
                  <div className='approval-form'>
                    <h3>Review Decision</h3>
                    <div className='form-group'>
                      <label htmlFor='approverName'>Your Name:</label>
                      <input
                        type='text'
                        id='approverName'
                        name='approverName'
                        value={approvalForm.approverName}
                        onChange={handleApprovalChange}
                        required
                        placeholder='Enter your full name'
                      />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='comments'>Comments/Reason:</label>
                      <textarea
                        id='comments'
                        name='comments'
                        value={approvalForm.comments}
                        onChange={handleApprovalChange}
                        placeholder='Enter your comments or reason for approval/rejection'
                        rows='4'
                      ></textarea>
                    </div>

                    <div className='form-row'>
                      <div className='form-group'>
                        <label htmlFor='approvalDate'>Date:</label>
                        <input
                          type='date'
                          id='approvalDate'
                          name='approvalDate'
                          value={approvalForm.approvalDate}
                          onChange={handleApprovalChange}
                        />
                      </div>

                      <div className='form-group'>
                        <label htmlFor='approvalTime'>Time:</label>
                        <input
                          type='time'
                          id='approvalTime'
                          name='approvalTime'
                          value={approvalForm.approvalTime}
                          onChange={handleApprovalChange}
                        />
                      </div>
                    </div>

                    <div className='action-buttons'>
                      <button
                        className='approve-btn'
                        onClick={() => handlePermitAction('approve')}
                      >
                        Approve Permit
                      </button>
                      <button
                        className='reject-btn'
                        onClick={() => handlePermitAction('reject')}
                      >
                        Reject Permit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className='no-selection'>
                <div className='placeholder-content'>
                  <h3>No Permit Selected</h3>
                  <p>Select a permit from the list to review its details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster position='top-right' richColors />
    </div>
  )
}

export default Home
