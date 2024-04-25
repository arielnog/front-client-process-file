import {FileUploader} from "@/components";
import {FileProvider} from "@/components/ui/file";

function ControlList() {
  return (
    <>
      <FileProvider>
        <FileUploader/>
      </FileProvider>
    </>
  );
}

export {ControlList}
