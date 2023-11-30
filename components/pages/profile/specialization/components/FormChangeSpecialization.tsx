"use client"

import { Select } from "antd/lib"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

import type { IDataReplaceSpec, IGetSpecializations } from "@/types/specializations"

import { LabelInput } from "./LabelInput"

import { usePush } from "@/hooks/usePath"
import { getSpecializations, getSpecializationsAllList, editSpecialization, addSpecialization } from "@/services/doctors"

import styles from "./styles/form-change.module.scss"
import stylesInputs from "./styles/label-input.module.scss"

interface IFormValues {
    spec: number
    university: string
    workExperience: number
    cost: number
    address: string
    additional: string
}

export const FormChangeSpecialization = () => {
    const idSpecialization = useSearchParams().get("id")
    const { handlePush } = usePush()
    const { data } = useQuery({
        queryFn: () => getSpecializations(),
        queryKey: ["specializations"],
        refetchOnWindowFocus: false,
    })
    const { data: specializationsAll, refetch } = useQuery({
        queryFn: () => getSpecializationsAllList(),
        queryKey: ["specializations_all"],
        refetchOnWindowFocus: false,
    })

    const current: IGetSpecializations | null = useMemo(() => {
        if (data?.ok) {
            if (data?.res) {
                return data?.res?.find((item) => Number(item?.id) === Number(idSpecialization)) || null
            }
        }
        return null
    }, [data])

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormValues>({
        values: {
            cost: Number(current?.consultation_time[0]?.original_price) || 0,
            workExperience: current?.work_experience || 0,
            university: current?.university!,
            additional: current?.additional_info!,
            spec: current?.specialization_id!,
            address: current?.region_living!,
        },
    })

    const onSubmit = handleSubmit((values: IFormValues) => {
        const consultation_time = [
            {
                sessions_time: "20min",
                original_price: values?.cost!,
            },
        ]
        if (!!current) {
            const data: IDataReplaceSpec = {
                id: Number(idSpecialization),
                specialization_id: values?.spec,
                university: values.university,
                scientific_degree: false,
                work_experience: values.workExperience || 0,
                consultation_time: consultation_time,
                // additional_info: values?.additional,
            }
            editSpecialization(Number(idSpecialization), data).then((response) => {
                refetch().finally(() => {
                    handlePush("/specialization")
                })
            })
        } else {
            const data: IDataReplaceSpec = {
                id: Number(idSpecialization),
                specialization_id: values.spec!,
                university: values.university || "",
                scientific_degree: false,
                work_experience: values.workExperience || 0,
                consultation_time: consultation_time,
                // additional_info: values?.additional,
            }
            addSpecialization(data).then((response) => {
                refetch().finally(() => {
                    handlePush("/specialization")
                })
            })
        }
    })

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <section>
                <LabelInput label="Выберите специализацию:">
                    <Select
                        {...register("spec", { required: true })}
                        onChange={(value) => {
                            setValue("spec", value)
                        }}
                        value={watch("spec")}
                        placeholder="Выберите специализацию для консультаций"
                        className={stylesInputs.select}
                        style={{ borderRadius: 20 }}
                        options={
                            specializationsAll?.ok && specializationsAll?.res
                                ? specializationsAll?.res?.map((item) => ({
                                      label: item?.name,
                                      value: item?.id,
                                  }))
                                : []
                        }
                    />
                    {errors.spec && <i>Ввыберите специальность!!!</i>}
                </LabelInput>
                <LabelInput label="Оконченное высшее образование:">
                    <input placeholder="Введите название ВУЗа" maxLength={256} {...register("university", { required: false })} />
                </LabelInput>
                <LabelInput label="Опыт работы:">
                    <input
                        type="number"
                        min={0}
                        placeholder="Введите кол-во отработанных лет на данной специальности"
                        {...register("workExperience", { required: false })}
                    />
                </LabelInput>
                <LabelInput label="Цена за одну консультацию:">
                    <input
                        type="number"
                        min={0}
                        placeholder="Введите стоимость консультации"
                        {...register("cost", { required: true })}
                    />
                    {errors?.cost && <i>Введите стоимость специальности!!!</i>}
                </LabelInput>
                <LabelInput label="Дополнительные сведения о специальности:">
                    <input
                        type="text"
                        maxLength={256}
                        placeholder="(Не обязательное поле)"
                        {...register("additional", { required: false })}
                    />
                </LabelInput>
            </section>
            <div className={styles.flexEnd}>
                <button type="submit">
                    <span>Сохранить</span>
                </button>
            </div>
        </form>
    )
}
