import { Navbar } from '../ui';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title: string
}

export const Layout: FC<Props> = ({ children, title }) => {


const origin = (typeof window === 'undefined') ? '' : window.location.origin;


  return (
    <div style={{ marginTop: '70px' }}>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='Alejandro Rodriguez' />
        <meta name='description' content={`Información sobre el pokemon ${title}`} />
        <meta name='keywords' content={`${title} , pokemon, pokedex`} />
        
        <meta property="og:title" content={`Informaion sobre ${title}`} />
        <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <main style={{
        padding: '0px 20px'
      }}>
        {children}
      </main>

      < Navbar />
    </div>
  )
}
