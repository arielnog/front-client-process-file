import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell
} from "@/components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ListContent {
  uuid: string,
  name: string,
  status: string,
  created_at: string,
  updated_at: string
}

function List() {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/file/", {
      headers: {
        "x-api-key": "01HVYX4Q6SV0D67DM1XX9AHC0X",
      }
    }).then(({ data }) => {
      setTableData(data.data);
    });
  }, [])


  const handleClick = () => {
    navigate("/");
  }


  return (
    <>
      <div className="px-4 bg-white max-w-screen-lg sm:mx-auto mx-2.5">
        <div className='flex flex-col py-8 px-8'>
          <div className="flex py-7 justify-end">
            <button onClick={handleClick} className="bg-[#7A87A0] p-3 rounded-xl text-white r-0">
              Go to Submit File
            </button>
          </div>
          <div className="flex flex-col gap-6">
            <div className="mx-auto flex flex-row">
              <p className="font-bold text-[20px]">List Files:</p>
            </div>
            <Table className="border">
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
                      {item.status == "unprocessed" &&
                        <TableCell>
                          <span className="bg-[#f25145] p-2 rounded-full text-white">Unprocessed</span>
                        </TableCell>
                      }
                      {item.status == "processed" &&
                        <TableCell>
                          <span className="bg-[#008b59] p-2 rounded-full text-white">Unprocessed</span>
                        </TableCell>
                      }
                      <TableCell>{item.created_at}</TableCell>
                      <TableCell>{item.updated_at}</TableCell>
                    </TableRow>
                  )
                })}

              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </div>
        </div>
      </div >
    </>
  );
}

export { List }
