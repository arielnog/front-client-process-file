import { useFileContext } from "@/components/ui/file";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function FileUploader() {
  const { state, dispatch } = useFileContext();
  const { file } = state;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      dispatch({ type: 'SET_FILE', payload: selectedFile });
    }
  }

  const navigate = useNavigate();

  const handleSubmitFile = async () => {
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formData.append('file', file);

    axios.post("http://localhost:8080/api/file/save", {
      'file': file
    }, {
      headers: {
        "x-api-key": "01HVYX4Q6SV0D67DM1XX9AHC0X",
        'Content-Type': 'multipart/form-data'
      }
    }).then(function () {
      withReactContent(Swal).fire({
        title: 'Success!',
        icon: 'success',
        showConfirmButton: false
      })
      
      dispatch({ type: 'FILE_UPLOADED', payload: null });

    });
  }

  const handleClick = () => {
    navigate("/list");
  }

  return (
    <>
      <div className="flex py-7 justify-end">
        <button onClick={handleClick} className="bg-[#7A87A0] p-3 rounded-xl text-white r-0">
          Go to List
        </button>
      </div>
      <div className="flex flex-col gap-6">
        <div className="mx-auto flex flex-row">
          <p className="font-bold text-[20px]">Submit File here: </p>
        </div>
        <div className="border p-3 rounded-xl">
          <label htmlFor="file" className="sr-only">
            Choose a file
          </label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
          />
        </div>
        {file && (
          <section className="border p-3 rounded-xl">
            <p className="pb-6">File details:</p>
            <ul>
              <li>
                <span className="font-bold pr-1">
                  Name:
                </span>
                <span>
                  {file.name}
                </span>
              </li>
              <li>
                <span className="font-bold pr-1">
                  Type:
                </span>
                <span>
                  {file.type}
                </span>
              </li>
              <li>
                <span className="font-bold pr-1">
                  Size:
                </span>
                <span>
                  {file.size}
                </span>
              </li>
            </ul>
          </section>
        )}

        {file && (
          <button onClick={handleSubmitFile} className="rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold">
            Upload the file
          </button>
        )}
      </div>
    </>
  );
}

export { FileUploader };
