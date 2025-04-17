import { useEffect, useState } from 'react'

import axios from 'axios'
import { Toaster, toast } from 'sonner'
import './landing.css'
import {
  Card,
  Title,
  Text,
  TextInput,
  Button,
  Radio,
  NumberInput,
  Image,
  Loader
} from '@mantine/core'

import LOGO from '../../assets/images/LOGO3.png'
import ReceiptSection from '../Sections/ReceiptSection'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react';
import axiosInstance from '../../utils/axios'

const LandingPagexx = () => {
  // State for form data
  const [workDetails, setWorkDetails] = useState({
    workDetail1: '',
    workDetail2: '',
    workDetail3: ''
  })

  const [substation, setSubstation] = useState('')

  const [earthPoints, setEarthPoints] = useState({
    earthPoint1: '',
    earthPoint2: ''
  })
  const [isMVLVIsolated, setIsMVLVIsolated] = useState('')
  const [isIsolationA, setIsIsolationA] = useState('')
  const [isIsolationB, setIsIsolationB] = useState('')
  const [earthConnections, setEarthConnections] = useState(0)
  const [issuedWithConsent, setIssuedWithConsent] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resp, setResp] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const history = useNavigate()

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault()

    setIsSubmitting(true)
    const formData = {
      userId: localStorage.getItem('authToken'),
      permitNumber: localStorage.getItem('permitNumber'),
      issuedTo: localStorage.getItem('userName'),
      substation,
      workDetails: [workDetails.workDetail1, workDetails.workDetail2],
      earthPoints: [earthPoints.earthPoint1, earthPoints.earthPoint2],
      isMVLVIsolated,
      earthConnections,
      issuedWithConsent,
      isIsolationA,
      isIsolationB
    }

    console.log(formData)

    try {
      // const response = await axios.post(
      //   'http://localhost:3001/api/submit-permit',
      //   formData
      // )
      const response = await axiosInstance.post(
        '/api/submit-permit',
        formData
      )
      if (response) {
        localStorage.setItem('permitId', response.data.permit.id)
        setResp(true)
        const status = response.data.permit.status

        let approved =
          status == 'pending' ? setIsApproved(false) : setIsApproved(true)
        // setIsSubmitting(false)
      }
      console.log('Success:', response.data.permit)
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message
      )
    }
  }


  useEffect(() => {
    const interval = setInterval(() => {
      // Get the permitId from localStorage
      const permitId = localStorage.getItem('permitId');
      if (permitId) {
        // Call your API to check the status
        axiosInstance
          .get(`/api/check-status/${permitId}`)
          .then(response => {
            const status = response.data.status;
            if (status === 'approved') {
              setIsApproved(true);
              setResp(true); // Show the approved modal
              history('/cancel-permit')
              clearInterval(interval); // Stop the interval once status is approved
            }
          })
          .catch(error => {
            console.error('Error checking status:', error);
          });
      }
    }, 10000); // Check every 10 seconds
  
    // Cleanup interval when component unmounts or status is approved
    return () => clearInterval(interval);
  }, [resp]); // Only run this effect when resp changes
  

  return (
    <div className='landing-page mx-auto'>
      {/* <div className='header bg-[#f1f8ff] px-6 py-4  z-50 w-full sticky -top-[20%] left-0 shadow-md'> */}
      <div className='header bg-[#f1f8ff] px-6 py-4 z-50 w-full sticky top-0 left-0 shadow-md'>
        <div className='upper flex flex-col items-center justify-between py-1'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='text-[#002b57] font-bold flex items-center bg-rd-300 w-full h-[50px]'>
              <span className='text-[#002b57] font-extrabold mx-auto'>
                <Image src={LOGO} className='scale-30 object-cover bg-ambr-200' />
              </span>
              <span className='text-[#002b57]'>
                {/* The Kenya Power and Lighting Co. Ltd. */}
                {/* KPLC */}
              </span>
            </h2>
          </div>
          <div className='text-[#002b57] font-bold text-[0.9em] mt-2'>
            {/* Number: LLA 25 */}
            Number: {localStorage.getItem('permitNumber')}
          </div>
        </div>

        <div className='title text-center mt-4'>
          <Title order={1} className='text-[#002b57] font-bold text-[1.5em]'>
            Electrical Permit to Work
          </Title>
        </div>
      </div>

      <form onSubmit={handleSubmit} className=' py-4'>
        <Card
          shadow='sm'
          padding='lg'
          radius='md'
          className='w-full max-w-md mx-auto border border-gray-300 mb-4'
        >
          <Text className='text-lg font-semibold'>To</Text>
          <Text className='text-gray-700 mb-4'>
            {localStorage.getItem('userName')}
          </Text>

          <Text className='text-lg font-bold text-[#002b57]'>Substation</Text>
          {/* <Text className='text-gray-700 mb-4'>Githunguri </Text> */}
          <TextInput
            // label='Work Detail 1'
            placeholder='Enter substation Name'
            value={substation}
            onChange={e => setSubstation(e.target.value)}
            className='mb-3'
          />

          <Text className='text-lg font-bold mb-2 text-[#002b57]'>
            For the following work to be carried out:
          </Text>

          <TextInput
            label='Work Detail 1'
            placeholder='Enter work detail 1'
            value={workDetails.workDetail1}
            onChange={e =>
              setWorkDetails({ ...workDetails, workDetail1: e.target.value })
            }
            className='mb-3'
          />
          <TextInput
            label='Work Detail 2'
            placeholder='Enter work detail 2'
            value={workDetails.workDetail2}
            onChange={e =>
              setWorkDetails({ ...workDetails, workDetail2: e.target.value })
            }
            className='mb-3'
          />
          <TextInput
            label='Work Detail 3'
            placeholder='Enter work detail 3'
            value={workDetails.workDetail3}
            onChange={e =>
              setWorkDetails({ ...workDetails, workDetail3: e.target.value })
            }
            className='mb-3'
          />
        </Card>

      

        <Card
          shadow='sm'
          padding='lg'
          radius='md'
          className='w-full max-w-md mx-auto border border-gray-300 mb-4'
        >
          <Text className='text-lg font-semibold mb-2'>A.</Text>
          <Text className='text-gray-700 mb-4'>
            I hereby declare that it is safe to work within the following
            defined limits in the proximity of Live HV / MV Apparatus.
          </Text>

          <Radio.Group
            name='isolationA'
            className='mb-3'
            value={isIsolationA}
            onChange={setIsIsolationA}
          >
            <Radio value='yes' label='Yes' className='mb-3' />
            <Radio value='no' label='No' />
          </Radio.Group>

          <Text className='text-red-500 font-semibold mt-2'>
            ALL OTHER PARTS ARE DANGEROUS
          </Text>
        </Card>

        <Card
          shadow='sm'
          padding='lg'
          radius='md'
          className='w-full max-w-md mx-auto border border-gray-300 mb-4'
        >
          <Text className='text-lg font-semibold mb-2'>B.</Text>
          <Text className='text-gray-700 mb-4'>
            I hereby declare that it is safe to work on the following H.V.
            Apparatus which is switched out, isolated from all live conductors
            and is connected to Earth.
          </Text>

          <Radio.Group
            name='isolationB'
            className='mb-3'
            value={isIsolationB}
            onChange={setIsIsolationB}
          >
            <Radio value='yes' label='Yes' className='mb-3' />
            <Radio value='no' label='No' />
          </Radio.Group>

          <Text className='text-red-500 font-semibold mt-2'>
            ALL OTHER PARTS ARE DANGEROUS
          </Text>
        </Card>

      
        <Card
          shadow='sm'
          padding='lg'
          radius='md'
          className='w-full max-w-md mx-auto border border-gray-300 mb-4'
        >
          <Text className='text-lg font-semibold mb-2'>
            MV/LV Equipment Isolation
          </Text>
          <Text className='text-gray-700 mb-4'>
            MV/LV Equipment isolated and earthed
          </Text>

          <Radio.Group
            value={isMVLVIsolated}
            onChange={setIsMVLVIsolated}
            name='isolation'
            className='mb-3'
          >
            <Radio value='yes' label='Yes' className='mb-3' />
            <Radio value='no' label='No' />
          </Radio.Group>
        </Card>

        <Card
          shadow='sm'
          padding='lg'
          radius='md'
          className='w-full max-w-md mx-auto border border-gray-300 mb-4'
        >
          <Text className='text-lg font-semibold mb-2'>
            Circuit Main Earths
          </Text>
          <Text className='text-gray-700 mb-4'>
            Circuit Main Earths have been at the following points:
          </Text>

          <TextInput
            label='Earth Point 1'
            placeholder='Enter Earth Point 1'
            value={earthPoints.earthPoint1}
            onChange={e =>
              setEarthPoints({ ...earthPoints, earthPoint1: e.target.value })
            }
            className='mb-3'
          />
          <TextInput
            label='Earth Point 2'
            placeholder='Enter Earth Point 2'
            value={earthPoints.earthPoint2}
            onChange={e =>
              setEarthPoints({ ...earthPoints, earthPoint2: e.target.value })
            }
          />
        </Card>

        <Card
          shadow='sm'
          padding='lg'
          radius='md'
          className='w-full max-w-md mx-auto border border-gray-300 mb-4'
        >
          <Text className='text-lg font-bold mb-2 text-[#002b57]'>
            No. of Additional Earth Connections
          </Text>
          <Text className='text-gray-700 mb-4'>
            Please specify the number of additional earth connections.
          </Text>

          <NumberInput
            label='No. of Earth Connections'
            placeholder='Enter number'
            value={earthConnections}
            onChange={setEarthConnections}
            min={0}
            className='mb-3'
          />

          <TextInput
            label='Issued with the consent of'
            placeholder='Enter name'
            value={issuedWithConsent}
            onChange={e => setIssuedWithConsent(e.target.value)}
          />
        </Card>

        <ReceiptSection />
        <Button
          type='submit'
          fullWidth
          className='mt-3 mb-10 h-[3em] text-[1.2em] bg-blue-500 hover:bg-blue-600 my-4 w-[92%] mx-auto '
        >
          Submit
        </Button>
      </form>

      {resp === true && isApproved == false && (
        <div className='fixed inset-0 bg-gray-200 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <Loader
              size='lg'
              color='blue'
              className='mx-auto mb-4'
              type='dots'
            />
            <p className='text-lg font-semibold text-gray-700'>
              Waiting for approval...
            </p>
          </div>
        </div>
      )}

      {resp === true && isApproved == true && (
        <div className='fixed inset-0 bg-gray-200 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
          <CheckCircle className="w-10 h-10 text-green-500 animate-bounce" />
            <p className='text-lg font-semibold text-gray-700'>
              Approved
            </p>
          </div>
        </div>
      )}

  
    </div>
  )
}

export default LandingPagexx
