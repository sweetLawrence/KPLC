import { useState } from 'react'
import SafetyDeclarationCard from '../Sections/SafetyDeclarationCard'
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
  Loader,
 
} from '@mantine/core'

import LOGO from '../../assets/images/LOGO3.png'
import ReceiptSection from '../Sections/ReceiptSection'

const LandingPagexx = () => {
  // State for form data
  const [workDetails, setWorkDetails] = useState({
    workDetail1: '',
    workDetail2: ''
  })
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


  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = {
      workDetails: [workDetails.workDetail1, workDetails.workDetail2],
      earthPoints: [earthPoints.earthPoint1, earthPoints.earthPoint2],
      isMVLVIsolated,
      earthConnections,
      issuedWithConsent,
      isIsolationA,
      isIsolationB
    }

 

    console.log('Form Data:', formData)
    setTimeout(() => {
      setIsSubmitting(false)
    }, 3000)
  }

  return (

    
    <div className='landing-page mx-auto'>
      <div className='header bg-[#f1f8ff] px-6 py-4  z-50 w-full sticky -top-[20%] left-0'>
        <div className='upper flex flex-col items-center justify-between py-3'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='text-[#002b57] font-bold text-[1.5em] flex items-center'>
              <span className='text-[#002b57] font-extrabold mr-2'>
                <Image src={LOGO} className='scale-75' />
              </span>
              <span className='text-[#002b57]'>
                The Kenya Power and Lighting Co. Ltd.
              </span>
            </h2>
          </div>
          <div className='text-[#002b57] font-bold text-[0.9em] mt-2'>
            Number: LLA 25
          </div>
        </div>

        <div className='title text-center mt-4'>
          <Title order={1} className='text-[#002b57] font-bold text-[2em]'>
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
          <Text className='text-gray-700 mb-4'>John Doe</Text>

          <Text className='text-lg font-semibold mb-2'>
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
        </Card>

        {/* <SafetyDeclarationCard
            title='A.'
            description='I hereby declare that it is safe to work within the following defined limits in the proximity of Live HV / MV Apparatus.'
            warning='ALL OTHER PARTS ARE DANGEROUS'
          /> */}

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

        {/* <SafetyDeclarationCard
            title='B.'
            description='I hereby declare that it is safe to work on the following H.V. Apparatus which is switched out, isolated from all live conductors and is connected to Earth.'
            warning='ALL OTHER PARTS ARE DANGEROUS'
          /> */}

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
          <Text className='text-lg font-semibold mb-2'>
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
      {isSubmitting && (
        <div className='fixed inset-0 bg-gray-200 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <Loader size='lg' color='blue' className='mx-auto mb-4' />
            <p className='text-lg font-semibold text-gray-700'>
              Waiting for approval...
            </p>
          </div>
        </div>
      )}


    </div>

  )
}


export default LandingPagexx
