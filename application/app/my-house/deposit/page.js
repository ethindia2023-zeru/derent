"use client"
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';

const page = () => {
  const [advancePay,setAdvancePay] = useState(false);
  // if advance is paid
  if(advancePay){
    return (
      <Table className="ml-10">
      <TableCaption className=" w-[900px]">A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Context</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>For house repairy</TableCell>
          <TableCell>$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    )
  }
  else{
    return (
      <Card className=" w-full mx-3 ml-32">
      <CardHeader className=" mb-16">
        <CardTitle>Advance</CardTitle>
        <CardDescription>Pay you advance here</CardDescription>
      </CardHeader>
      <CardContent className="w-full mx-auto">
      <div className="grid grid-cols-3 mb-10 place-content-center">
        <div className="flex flex-col">Advance: <span>rs: 300000</span></div>
      </div>
      </CardContent>
      <CardFooter className="w-[900px]">
        <Button className="mx-auto w-fit">Pay Advance</Button>
      </CardFooter>
    </Card>
    )
  }
}

export default page;