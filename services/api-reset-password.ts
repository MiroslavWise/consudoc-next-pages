import axios from "axios";

import { URL_API } from "./general-api";

export const apiResetPassword = async (email: string) => {
        return await axios.post(`${URL_API}/send-reset-email/`, {
                email: email,
                redirect_url: 'https://consudoc.online/password-reset/'
        },
                {
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                        }
                }
        )
                .then(data => data.status)
                .catch(e => console.error('ERROR RESET PASSWORD: ', e))
}