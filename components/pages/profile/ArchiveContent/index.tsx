import { useSearchParams } from "next/navigation"

import { ArchiveList } from "../ArchiveList"
import { ArchiveCurrent } from "../ArchiveCurrent"
import { ArchivePagination } from "../ArchivePagination"

export function ArchiveContent() {
    const searchParams = useSearchParams()
    const idArchive = searchParams.get("uuid")

    return (
        <section>
            {idArchive ? (
                <ArchiveCurrent />
            ) : (
                <>
                    <ArchiveList />
                    <ArchivePagination />
                </>
            )}
        </section>
    )
}
