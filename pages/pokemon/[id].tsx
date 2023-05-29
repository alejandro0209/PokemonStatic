import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { pokeApi } from "@/api";
import { Layout } from "@/components"
import { Pokemon } from "@/interfaces";
import { getPokemonInfo, localFavorites } from "@/utils";





interface Props {
  pokemon: Pokemon;
}


const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const onToggleFavorite =  () => {
     localFavorites.toggleFavorite( pokemon.id );
     setIsInFavorites( !isInFavorites );

     if( isInFavorites ) return;

     confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin:{
        x: 1,
        y: 0,
      }
     })
  }

  const [isInFavorites , setIsInFavorites ] = useState( false );

  useEffect(() => {
    setIsInFavorites( localFavorites.existInFavorites(pokemon.id) );
  }, [ pokemon.id ]);
  

  return (
    <Layout title={ pokemon.name }>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>
              <Button
                onClick={ onToggleFavorite }
                style={{ background: !isInFavorites ? 'linear-gradient(to bottom right, blue , DeepSkyBlue)' : 'linear-gradient(to bottom right, green , DarkCyan)'}} 
              >
                { isInFavorites ? 'En Favoritos' : 'Agregar a favoritos' }
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction='row' display='flex'>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  height={100}
                  width={100}
                />

                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  height={100}
                  width={100}
                />

                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  height={100}
                  width={100}
                />

                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  height={100}
                  width={100}
                />

              </Container>
            </Card.Body>
          </Card>
        </Grid>

      </Grid.Container>

    </Layout>
  )
}




// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {


  const pokemosn151 = [...Array(151)].map((value, index) => `${index + 1}`)

  return {
    paths: pokemosn151.map(id => ({
      params: { id }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { id } = params as { id: string };

  return {
    props: {
      pokemon: await getPokemonInfo( id ),
    }
  }
}

export default PokemonPage;
