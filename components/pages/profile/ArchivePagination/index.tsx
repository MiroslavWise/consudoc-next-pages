"use client"

import { Pagination } from "antd"

import { useArchive } from "@/store/state"

export function ArchivePagination() {
    const { page, setPage, total } = useArchive()

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
