import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell
} from "@/components";
import {useEffect, useState} from "react";
import axios from "axios";

interface ListContent {
  uuid: string,
  name: string,
  status: string,
  created_at: string,
  updated_at: string
}

function List() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/file/", {
      headers: {
        "x-api-key": "01HVYX4Q6SV0D67DM1XX9AHC0X",
      }
    }).then(({data}) => {
      setTableData(data.data);
    });
  }, [])

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((item: ListContent[]) => {
            return (
              <TableRow key={item.uuid}>
                <TableCell>{item.uuid}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.created_at}</TableCell>
                <TableCell>{item.updated_at}</TableCell>
              </TableRow>
            )
          })}

        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </>
  );
}

export {List}
