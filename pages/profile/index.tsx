import dayjs from "dayjs"
import Image from "next/image"
import { isMobile } from "react-device-detect"

import { LabelInfo } from "@/components/pages/profile/components/LabelInfo"
import { ProfileLayout } from "@/components/layout/ProfileLayout"

import { cx } from "@/lib/cx"
import { useProfile } from "@/store/state"
import { usePush } from "@/hooks/usePath"
import { styleIsMobile } from "@/lib/styleIsMobile"

import styles from "./styles.module.scss"

export default function Profile() {
    const { user, profile, loading } = useProfile()
    const { handlePush } = usePush()

    return (
        <ProfileLayout>
            <section className={cx(styles.wrapper, styles[styleIsMobile])}>
                <header>
                    <h2>Профиль</h2>
                    {isMobile && (
                        <Image
                            src="/svg/user-edit.svg"
                            alt="user-edit"
                            width={25}
                            height={25}
                            onClick={() => handlePush("/change")}
                        />
                    )}
                </header>
                {isMobile ? (
                    <div className={styles.photo}>
                        <Image
                            src={profile?.photo!}
                            alt="avatar"
                            width={400}
                            height={400}
                            unoptimized
                        />
                    </div>
                ) : null}
                <div className={styles.mainInfo}>
                    {loading ? null : (
                        <>
                            <LabelInfo label="ФИО" text={user?.get_full_name!} />
                            <LabelInfo
                                label="Дата рождения"
                                text={
                                    profile?.birthday
                                        ? dayjs(profile?.birthday).format("DD.MM.YYYY")
                                        : null
                                }
                            />
                            <LabelInfo label="Телефон" text={profile?.phone!} />
                            <LabelInfo label="Email" text={user?.email!} />
                        </>
                    )}
                </div>
            </section>
        </ProfileLayout>
    )
}
