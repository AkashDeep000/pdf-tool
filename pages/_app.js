import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
  <>
   <Head>

<link rel="preconnect" href="https://cdn.statically.io/" />
<link rel="dns-prefetch" href="https://cdn.statically.io/" />

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
 <script src="https://cdn.jsdelivr.net/npm/eruda-dom"></script>
<script>eruda.init();eruda.add(erudaDom);
</script>

 </Head>

    <Component {...pageProps} />
    </>
)}

export default MyApp
