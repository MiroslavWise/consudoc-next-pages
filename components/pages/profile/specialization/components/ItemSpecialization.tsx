"use client"

import { useState } from "react"

import type { TItemSpecialization } from "./types/types"

import { cx } from "@/lib/cx"
import { usePush } from "@/hooks/usePath"
import { workExperience } from "@/lib/work-exp"
import { deleteSpecialization } from "@/services/doctors"

import styles from "./styles/item-specialization.module.scss"

export const ItemSpecialization: TItemSpecialization = ({
    additional_info,
    attachments,
    consultation_time,
    degree,
    id,
    profile,
    rating,
    scientific_degree,
    scientific_degree_text,
    specialization,
    specialization_id,
    university,
    work_experience,
    refetch,
}) => {
    const { handlePush } = usePush()
    const [visible, setVisible] = useState(false)

    function handleClickOnChange() {
        handlePush(`/specialization/modification?id=${id}`)
    }

    function handleDelete() {
        setVisible(true)
    }

    function handleCancel() {
        setVisible(false)
    }

    async function handleSuccessDelete() {
        deleteSpecialization(id).then((response) => {
            refetch().finally(() => {
                console.log("delete specialization: ", response)
                setVisible(false)
            })
        })
    }

    return (
        <li className={styles.container}>
            <header>
                <h3>{specialization?.name!}</h3>
                {specialization?.description ? <h6>{specialization?.description}</h6> : null}
            </header>
            <section>
                {university ? <MiniItem label="ВУЗ" text={university} /> : null}
                <MiniItem
                    label="Стаж"
                    text={workExperience(work_experience, (value) => value)}
                />
                <MiniItem label="Категория" text="Нет категории" />
            </section>
            <footer>
                <div onClick={handleClickOnChange} className={styles.success}>
                    <span>Изменить</span>
                </div>
                <div onClick={handleDelete} className={styles.error}>
                    <span>Удалить</span>
                </div>
            </footer>
            <div className={cx(styles.popup, visible && styles.active)}>
                <h3>Вы точно хотите удалить специальность?</h3>
                <div>
                    <div onClick={handleSuccessDelete} className={styles.success}>
                        <span>Да, удалить</span>
                    </div>
                    <div onClick={handleCancel} className={styles.error}>
                        <span>Отмена</span>
                    </div>
                </div>
            </div>
        </li>
    )
}

const MiniItem = ({ label, text }: { label: string; text: string }) => {
    return (
        <div>
            <label>{label}: </label>
            <i>{text}</i>
        </div>
    )
}
