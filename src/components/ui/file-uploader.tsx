import {useFileContext} from "@/components/ui/file";
import axios from "axios";
import React from "react";

function FileUploader() {
  const {state, dispatch} = useFileContext();
  const {file} = state;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      dispatch({type: 'SET_FILE', payload: selectedFile});
    }
  }

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
    }).then(function(){
      dispatch({type: 'FILE_UPLOADED', payload: null });
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
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
        <section>
          <p className="pb-6">File details:</p>
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button onClick={handleSubmitFile} className="rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold">
          Upload the file
        </button>
      )}
    </div>
  );
}

export {FileUploader};
