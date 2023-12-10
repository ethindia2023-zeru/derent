import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const page = () => {
  return (
    <Table className="">
      <TableCaption className=" w-[900px]">A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>House</TableHead>
          <TableHead>Rent</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Name</TableCell>
          <TableCell>$30000</TableCell>
          <TableCell>Occupied||Ininital Deposit paid||Vacant</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default page;
