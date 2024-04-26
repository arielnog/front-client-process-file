import { FileUploader } from "@/components";
import { FileProvider } from "@/components/ui/file";

function ControlList() {
  return (
    <>
      <FileProvider>
        <div className="px-4 bg-white max-w-screen-lg sm:mx-auto mx-2.5">
          <div className='flex flex-col py-8 px-8'>
            <FileUploader />
          </div>
        </div>
      </FileProvider>
    </>
  );
}

export { ControlList }
