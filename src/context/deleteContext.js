import { createContext, useState } from "react";

const deleteContext = createContext();

export default function DeleteContextProvider({ children }) {
    const [deleteShow, setDeleteShow] = useState({
        status: false,
        item: "",
        id: 0,
        refresh: () => {},
    });

    const value = {
        deleteShow: deleteShow,
        setDeleteShow: setDeleteShow,
    };

    return (
        <deleteContext.Provider value={value}>
            {children}
        </deleteContext.Provider>
    );
}

export { deleteContext };
