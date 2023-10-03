import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html lang="ru">
            <Head>
                <title>Consudoc</title>
                <meta name="description" content="Медецинское консультирование" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, user-scalable=no, maximum-scale=1"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
