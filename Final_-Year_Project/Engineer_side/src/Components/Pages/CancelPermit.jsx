import React, { useState } from 'react'
import {
  Card,
  Text,
  Checkbox,
  Button,
  Input,
  Title,
  Image
} from '@mantine/core'
import LOGO from '../../assets/images/LOGO3.png'
import { Toaster, toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axios'

const CancelPermit = () => {
  const [isChecked, setIsChecked] = useState(false)
  const [earthConnections, setEarthConnections] = useState('')
  const [systemControlEngineer, setSystemControlEngineer] = useState('')

  const navigate = useNavigate()

  const handleCheckboxChange = e => {
    setIsChecked(e.target.checked)
  }

  const handleSubmit = async () => {
    const formData = {
      clearanceCompleted: isChecked,
      earthConnections,
      systemControlEngineer
    }

    try {
      // const response = await axios.post(
      //   'http://localhost:3001/api/cancel-permit',
      //   formData,
      //   { withCredentials: true }
      // )
      const response = await axiosInstance.post(
        '/api/cancel-permit',
        formData,
        { withCredentials: true }
      )

      if (response.status === 200) {
        toast.success('Permit cancelled successfully!')

        // Clear cookies
        // document.cookie.split(";").forEach((c) => {
        //   document.cookie = c
        //     .replace(/^ +/, "")
        //     .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        // });

        document.cookie =
          'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

        // Clear localStorage
        localStorage.clear()

        // Redirect after short delay
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    } catch (error) {
      toast.error('An error occurred while cancelling the permit.')
      console.error('Cancel Permit Error:', error)
    }

    // Log form data to the console
    console.log('Form submitted with data: ', formData)
  }

  return (
    <div>
      {/* <div className='header bg-[#f1f8ff] px-6 py-4 z-50 w-full sticky -top-[25%] left-0'> */}
      <div className='header bg-[#f1f8ff] px-6 py-4 z-50 w-full sticky top-0 left-0 shadow-md'>
        <div className='upper flex flex-col items-center justify-between py-3'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='text-[#002b57] font-bold text-[1.5em] flex items-center bg-rd-300 w-full h-[50px]'>
              <span className='text-[#002b57] font-extrabold mx-auto'>
                <Image src={LOGO} className='scal-75 scale-30 object-cover bg-ambr-200' />
              </span>
              <span className='text-[#002b57]'>
                {/* The Kenya Power and Lighting Co. Ltd. */}
              </span>
            </h2>
          </div>
          <div className='text-[#002b57] font-bold text-[0.9em] mt-2'>
            Number: {localStorage.getItem('permitNumber')}
          </div>
        </div>

        <div className='title text-center mt-4'>
          <Title order={1} className='text-[#002b57] font-bold text-[2em]'>
            Cancellation
          </Title>
        </div>
      </div>

      <Card
        shadow='sm'
        padding='lg'
        radius='md'
        className='w-full max-w-md mx-auto border border-gray-300 mb-4'
      >
        {/* Clearance Section */}
        <Text className='text-lg font-bold mb-2 text-[#002b57]'>CLEARANCE</Text>
        <Text className='text-gray-700 mb-4'>
          I hereby declare that all men under my charge have been withdrawn and
          warned that it is NO LONGER SAFE to work on the apparatus specified on
          the P.T.W. and that all gear, tool and ADDITIONAL EARTH CONNECTION are
          clear and have been checked in.
        </Text>
        <Checkbox
          label='I confirm that the clearance actions have been completed.'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='mb-4'
        />

        {/* Cancellation Section */}
        <Text className='text-lg font-bold mb-2 mt-6 text-[#002b57]'>CANCELLATION</Text>
        <Text className='text-gray-700 mb-4'>
          I hereby declare that I have checked in{' '}
          <Input
            value={earthConnections}
            onChange={e => setEarthConnections(e.target.value)}
            placeholder='Additional Earth Connections'
            className='mt-2 mb-4'
            size='sm'
          />
          and that with the Consent of{' '}
          <Input
            value={systemControlEngineer}
            onChange={e => setSystemControlEngineer(e.target.value)}
            placeholder='System Control Engineer'
            className='mt-2 mb-4'
            size='sm'
          />
          this Permit and all copies are cancelled.
        </Text>

        {/* Submit Button */}
        <Button
          fullWidth
          className='mt-3'
          onClick={handleSubmit}
          disabled={!isChecked || !earthConnections || !systemControlEngineer} // Disable the button unless conditions are met
        >
          Submit
        </Button>
      </Card>
      <Toaster position='top-right' richColors />
    </div>
  )
}

export default CancelPermit
