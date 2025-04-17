import { Card, Text, Radio } from "@mantine/core";

export default function SafetyDeclarationCard({ title, description, warning }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" className="w-full max-w-md mx-auto border border-gray-300 mb-4">
      <Text className="text-lg font-semibold mb-2">{title}</Text>
      <Text className="text-gray-700 mb-4">{description}</Text>

      <Radio.Group name="safety" className="mb-3">
        <Radio value="yes" label="Yes" className="mb-3" />
        <Radio value="no" label="No" />
      </Radio.Group>

      {warning && <Text className="text-red-500 font-semibold mt-2">{warning}</Text>}
    </Card>
  );
}


   // } finally {
    //   setIsSubmitting(false)
    // }

    // try {
    //   // Simulate a successful API call (replace with your actual Axios call)
    //   await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate 2 seconds delay for approval

    //   // Set approval state to true after "approval" and show the success indicator
    //   setIsApproved(true)

    //   // After 2 seconds, navigate to the /landingpage
    //   setTimeout(() => {
    //     // history('/landingpage') // Redirect to the landing page
    //   }, 2000)
    // } catch (error) {
    //   console.error('Error during submission', error)
    // } finally {
    //   setIsSubmitting(false) // Hide loader after submission
    // }

    // console.log('Form Data:', formData)
    // setTimeout(() => {
    //   setIsSubmitting(false)
    // }, 3000)