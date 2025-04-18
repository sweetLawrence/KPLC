import { Card, Text, Radio } from "@mantine/core";

export default function ReceiptSection() {
  return (
    <Card shadow="sm" padding="lg" radius="md" className="w-full max-w-md mx-auto border border-gray-300">
      <Text className="text-lg font-bold mb-2 text-[#002b57]">2. RECEIPT</Text>
      <Text className="text-gray-700 mb-4">
        I hereby declare that I accept responsibility for carrying out the work on the Apparatus detailed on this Permit, 
        and that no attempt will be made by me, or by any man under my control, to carry out work on any other apparatus.
      </Text>

      <Radio.Group name="agreement" className="mb-3">
        <Radio value="agree" label="I Agree" className="mb-3" required/>
      </Radio.Group>
    </Card>
  );
}
