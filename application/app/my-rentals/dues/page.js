import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const page = () => {
  return (
    <Table className="w-fit mx-auto">
    <TableCaption className=" w-[900px]"></TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>House</TableHead>
        <TableHead>Location</TableHead>
        <TableHead>Rent Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">Name</TableCell>
        <TableCell>Chandigad</TableCell>
        <TableCell>Paid||Due</TableCell>
      </TableRow>
    </TableBody>
  </Table>
  )
}

export default page