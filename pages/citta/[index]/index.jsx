import HeroIntern from "../../../components/HeroIntern";
import Activities from "../../../components/Activities";
import Cities from "../../../components/Cities";
import { useRouter } from "next/router";
import Layout from "../../../components/Layouts";
import { API_URL, FETCH_HEADERS } from "../../../libs/variables";
import axios from 'axios';
import stylesTitle from "../../../components/SectionTitle/SectionTitle.module.scss";
import { useState, useEffect } from "react";

const initialFilterState = {
  maxPrice: 100,
  category: 0
};

export default function City({ city, activities, cities }) 
{
  // Router
  const router = useRouter();

  if (router.isFallback) 
  {
    return <h1>loading</h1>;
  }
  
  




  
  return (
    <>
      <Layout>
        <HeroIntern
          title={city.name}
          description={city.content}
          bgImage={city.cover_image_url}
        />
        <div 
          className={stylesTitle.wrapper_title_button}
          style={{ padding: '100px 100px 0' }}
        >
          <div className={stylesTitle.wrapper_title}>
            <h2>Scopri cosa puoi fare a {city.name}</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
        </div>
        <Activities  showTitle={false} />
        <Cities data={cities} exceptId={city.id} />
      </Layout>
    </>
  );
}


export async function getStaticProps({ params }) 
{
  const city = await axios(
    `${API_URL}cities/${params.index}`,
    {
      headers: FETCH_HEADERS
    }
  );

  const activities = await axios(
    `${API_URL}cities/${params.index}/activities?sort_by=city-relevance&limit=20`,
    {
      headers: FETCH_HEADERS
    }
  );

  const cities = await axios(
    `${API_URL}cities?limit=6&without_events=yes`,
    {
      headers: FETCH_HEADERS
    }
  );

  if (!city) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      city: city.data,
      activities: activities.data,
      cities: cities.data,
    }
  };
}


export async function getStaticPaths() 
{
  const cities = await axios(
    `${API_URL}cities`,
    {
      headers: FETCH_HEADERS
    }
  );

  const paths = cities.data.map((city) => {
    return {
      params: {
        index: `${city.id}`,
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
}
