import {  createContext} from 'react';
import { useContext} from 'react';


export const ToastContext = createContext({});




export function useToast() {
    return useContext(ToastContext)

}