"use client"

import { useQuery } from "react-query"
import styles from "./styles/doctor-screen.module.scss"
import { getDoctors } from "@/services/apiDoctors"
import { ItemDoctor } from "./ItemDoctor"

export const DoctorScreen = () => {
    const { data } = useQuery({
        queryKey: ["doctors"],
        queryFn: () => getDoctors({}),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    console.log("data: ", { data })

    return (
        <section className={styles.container}>
            {data?.ok && Array.isArray(data?.res?.results)
                ? data?.res?.results?.map((item: any) => (
                      <ItemDoctor key={item?.id + item?.doctor_id} {...item} />
                  ))
                : null}
        </section>
    )
}
