import { ReactNode, createContext, useContext, useReducer } from "react";

type FileContextState = {
  isLoading: boolean;
  file: File | null;
  fileList: File[];
};

type SetFileAction = {
  type: string;
  payload: File | null;
};

type FileAction = SetFileAction;

type FileDispatch = (action: FileAction) => void;

type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
};

type FileProviderProps = { children: ReactNode };

export const FileContextInitialValues: FileContextState = {
  file: null,
  isLoading: false,
  fileList: [],
};

const FileContext = createContext({} as FileContextType);

const FileReducer = (
  state: FileContextState,
  action: FileAction,
): FileContextState => {
  switch (action.type) {
    case "SET_FILE":
      return {
        ...state,
        file: action.payload,
      };
    case "FILE_UPLOADED":
      return {
        ...state,
        file: null
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const FileProvider = ({ children }: FileProviderProps) => {
  const [state, dispatch] = useReducer(
    FileReducer,
    FileContextInitialValues,
  );

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};

const useFileContext = () => {
  const context = useContext(FileContext);

  if (context === undefined)
    throw new Error("useFileContext must be used within a FileProvider");

  return context;
};

export {
  FileProvider,
  useFileContext
};
