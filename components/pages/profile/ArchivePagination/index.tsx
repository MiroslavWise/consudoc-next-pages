"use client"

import { Pagination } from "antd/lib"

import { useArchive } from "@/store/state"

export function ArchivePagination() {
    const page = useArchive(({ page }) => page)
    const setPage = useArchive(({ setPage }) => setPage)
    const total = useArchive(({ total }) => total)

    return (
        <Pagination
            total={total}
            pageSize={5}
            current={page}
            onChange={(value) => setPage(value)}
            showSizeChanger={false}
        />
    )
}
