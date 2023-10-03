
interface IVariables{
  url_api: string
  url: string
  wss: string
}

export const ENV: IVariables = {
  url: process.env.NEXT_PUBLIC_URL!,
  url_api: process.env.NEXT_PUBLIC_URL_API!,
  wss: process.env.NEXT_PUBLIC_WSS!,
}
