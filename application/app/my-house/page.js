import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const page = () => {
  return (
    // <div className="flex justify-center w-full">
  <Card className=" w-full mx-3 ml-32">
    <CardHeader className=" mb-16">
      <CardTitle>Rent</CardTitle>
      <CardDescription>Pay you rent with just one click</CardDescription>
    </CardHeader>
    <CardContent className="w-full mx-auto">
    <div className="grid grid-cols-3 mb-32 place-content-center">
      <div className="flex flex-col">Due Date: <span>Due Date</span></div>
      <div className="flex flex-col">Advance: <span>₹Advance</span></div>
      <div className="flex flex-col">Initial Deposit: <span>₹house.initialdeposit</span></div>
    </div>
    <div className="grid grid-cols-3 mb-10 mx-auto">
      <div className="flex flex-col">Rent: <span>₹Rent</span></div>
      <div className="flex flex-col">Status <span>Due</span></div>
      <div className="flex flex-col">Due Date:<span>12-10-2020</span></div>
    </div>
    </CardContent>
    <CardFooter className="w-[900px]">
      <Button className="mx-auto w-fit">Pay Rent</Button>
    </CardFooter>
  </Card>
  )
}

export default page