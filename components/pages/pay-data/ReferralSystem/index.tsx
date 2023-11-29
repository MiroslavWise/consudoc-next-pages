import { Typography } from "antd/lib"

import { useProfile } from "@/store/state"

import styles from "./style.module.scss"

export function ReferralSystem() {
    const profile = useProfile(({ profile }) => profile)

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.link}>
                    <p>Ссылка для приглашения друга:</p>
                    <Typography.Paragraph
                        copyable={{
                            text: `${profile?.user?.get_full_name} ${
                                profile?.gender === "male"
                                    ? "пригласил Вас в сервис Spenat"
                                    : "пригласила Вас в сервис Spenat"
                            } https://${process.env.NEXT_PUBLIC_FRONTEND}/?referral_code=${
                                profile?.referral_code
                            }`,
                        }}
                        style={{ padding: 0, margin: 0, color: "var(--success-600)" }}
                    >
                        {profile?.referral_code}
                    </Typography.Paragraph>
                </div>
                <div className={styles.listContainer}>
                    <p>Список мной приглашённых:</p>
                </div>
            </div>
        </div>
    )
}
