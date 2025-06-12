

import { useState} from 'react';
import { Mysnackbar } from "../compontes/mysnackbar"
import {  createContext} from 'react';
import { useContext } from 'react';

export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
        const [open, setOpen] = useState(false);
        const [message, setMessage] = useState("");
    
        function showHideToast(message) {
            setOpen(true);
            setMessage(message)
            setTimeout(() => {
                setOpen(false);
            }, 2000);
        }
    return (
        <>
        <ToastContext.Provider value={{ showHideToast}}>
            <Mysnackbar open={open} message={message} />
            {children}
            </ToastContext.Provider>
            </>
    )
}

export function useToast() {
    return useContext(ToastContext)

}
