import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

function Layout(): ReactElement {
  return (
    <>
      <main className="flex flex-col min-h-screen bg-slate-300">
        <div className="flex flex-col h-full">
          <div className="mx-1 sm:ml-[48vh] px-4 pt-[84px] max-w-screen-lg pb-8">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}

export { Layout };
