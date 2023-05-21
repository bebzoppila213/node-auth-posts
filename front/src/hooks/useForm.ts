import { useState } from "react"



export default function useForm<T extends object>(defaultState: T){
    const [formState, setFormState] = useState(defaultState)

    const updateFormState = (key: keyof T, value: string) => {
        setFormState({...formState, [key]: value})
    }

    return{
        formState,
        updateFormState
    }
}