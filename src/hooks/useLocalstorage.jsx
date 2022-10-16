import { useState, useEffect } from "react";

const getSaved = (key, initialValue = []) => {
    const savedValue = JSON.parse(localStorage.getItem(key))
    if (savedValue) return savedValue
    else return initialValue
}

const useLocalstorage = (key) => {
    const [array, setArray] = useState(() => {
        return getSaved(key)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(array))
    }, [array, key])

    return [array, setArray]
}

export default useLocalstorage;