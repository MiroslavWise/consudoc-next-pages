"use client"

import { toast } from "react-toastify"

import type { TType } from "./types"

export function OnToast(value: string, type?: TType) {
    return toast[type || "info"](value, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    })
}
