import Image from "next/image"
import { DatePicker } from "antd/lib"
import dayjs, { type Dayjs } from "dayjs"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { type ChangeEvent, useState } from "react"

import type { TGender } from "@/types/general"

import { cx } from "@/lib/cx"
import { useProfile } from "@/store/state"
import { usePush } from "@/hooks/usePath"
import { styleIsMobile } from "@/lib/styleIsMobile"
import {
    setUploadPhoto,
    setUpdateProfile,
    setUpdateUser,
    IValueDataUser,
    IValueDataProfile,
} from "@/services/profile"

import styles from "./style.module.scss"

interface IFormData {
    name: string
    email: string
    phone: string
    gender: TGender
    date: Dayjs | null
    address: string
}

export function FormChange() {
    const { t } = useTranslation()
    const profile = useProfile(({ profile }) => profile)
    const loading = useProfile(({ loading }) => loading)
    const setProfile = useProfile(({ setProfile }) => setProfile)
    const [file, setFile] = useState<File | null>(null)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const { handlePush } = usePush()
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormData>({
        defaultValues: {
            name: profile?.user?.get_full_name || "",
            email: profile?.user?.email || "",
            phone: profile?.phone || "",
            gender: null,
            date: profile?.birthday ? dayjs(profile?.birthday) : null,
        },
    })

    const onSubmit = handleSubmit(async (values: IFormData) => {
        const dataProfile: IValueDataProfile = {}
        const dataUser: IValueDataUser = {}
        if (values?.address && values?.address !== profile?.address) {
            dataProfile.address = values.address
        }
        if (values?.name && values?.name !== profile?.user?.get_full_name) {
            dataUser.get_full_name = values?.name
        }
        if (
            values?.date &&
            dayjs(values?.date).format("YYYY-MM-DD") !==
                dayjs(profile?.birthday).format("YYYY-MM-DD")
        ) {
            dataProfile.birthday = dayjs(values?.date).format("YYYY-MM-DD")
        }
        if (values.gender && values?.gender !== profile?.gender) {
            dataProfile.gender = values?.gender
        }
        if (values.phone && values?.phone !== profile?.phone) {
            dataProfile.phone = values?.phone
        }
        const formData = new FormData()

        if (selectedImage && file) {
            formData.append("photo", file)
        }
        Promise.all([
            selectedImage && file ? setUploadPhoto(formData) : () => {},
            Object.keys(dataProfile).length ? setUpdateProfile(dataProfile) : () => {},
            Object.keys(dataUser).length ? setUpdateUser(dataUser) : () => {},
        ])
            .then((responses) => {
                console.log("responses: ", responses)
            })
            .finally(() => {
                setProfile()
                handlePush("/profile")
            })
    })

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setSelectedImage(reader.result as string)
            }
            reader.readAsDataURL(file)
            setFile(file)
        }
    }

    if (loading) return <></>

    return (
        <div className={cx(styles.container, styles[styleIsMobile])}>
            <div className={styles.wrapperPhoto}>
                {selectedImage ? (
                    <Image
                        src={selectedImage}
                        alt="avatar"
                        width={400}
                        height={400}
                        unoptimized
                    />
                ) : profile?.photo ? (
                    <Image
                        src={profile?.photo}
                        alt="avatar"
                        width={400}
                        height={400}
                        unoptimized
                    />
                ) : (
                    <Image
                        src="/png/default_avatar.avif"
                        alt="avatar"
                        width={400}
                        height={400}
                        unoptimized
                    />
                )}
                <input
                    type="file"
                    className={styles.inputUploadFile}
                    accept=".jpg, .jpeg, .png, image/*"
                    onChange={handleImageChange}
                    id="imageInput"
                />
                <Image
                    src="/svg/image-user-up.svg"
                    alt="image-user-up"
                    width={15}
                    height={15}
                    className={styles.imageUp}
                    unoptimized
                />
            </div>
            <form onSubmit={onSubmit} className={styles[styleIsMobile]}>
                <div className={cx(styles.inputs)}>
                    <div className={styles.labelInput}>
                        <label>Имя</label>
                        <input placeholder="Имя" {...register("name", { required: true })} />
                        {errors.name ? <i>Обязательное поле, введите имя</i> : null}
                    </div>
                    <div className={styles.labelInput}>
                        <label>Электронная почта</label>
                        <input
                            placeholder="Электронная почта"
                            {...register("email", {
                                required: false,
                            })}
                            disabled
                        />
                    </div>
                    <div className={styles.labelInput}>
                        <label>Телефон</label>
                        <input
                            {...register("phone", {
                                required: true,
                                minLength: 11,
                                maxLength: 11,
                            })}
                        />
                        {errors.phone ? <i>Обязательное поле(11 цифр)</i> : null}
                    </div>
                    <div className={styles.labelInput}>
                        <label>Пол</label>
                        <input {...register("gender", { required: false })} />
                        {errors.gender ? <i>Обязательное поле, укажите пол</i> : null}
                    </div>
                    <div className={styles.labelInput}>
                        <label>Дата рождения</label>
                        <DatePicker
                            className={styles.picker}
                            placeholder="Дата рождения"
                            value={watch("date")}
                            onChange={(value) => {
                                setValue("date", value)
                            }}
                        />
                    </div>
                    <div className={styles.labelInput}>
                        <label>{t("Address")}</label>
                        <input
                            {...register("address", { required: false })}
                            placeholder={t("Enter the address")}
                        />
                    </div>
                </div>
                <div className={cx(styles.buttons)}>
                    <button type="submit">
                        <span>сохранить</span>
                    </button>
                </div>
            </form>
        </div>
    )
}
