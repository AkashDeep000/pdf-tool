import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
  <>
   <Head>

<link rel="preconnect" href="https://cdn.statically.io/" />
<link rel="dns-prefetch" href="https://cdn.statically.io/" />



 </Head>

    <Component {...pageProps} />
    </>
)}

export default MyApp
