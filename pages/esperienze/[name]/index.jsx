import styles from './SingleExperience.module.scss';
import HeroIntern from "../../../components/HeroIntern";
import Cities from '../../../components/Cities';
import Layout from '../../../components/Layouts';
import { useRouter } from "next/router";
import ActivityDescription from '../../../components/ActivityDescription';
import CityDescription from '../../../components/CityDescription';


export default function Activity({activity}) {
    const router = useRouter();



    return (
        <>
            <Layout>
                <HeroIntern 
                    title={activity.title} 
                    description={activity.description} 
                    bgImage={activity.city.cover_image_url}                    
                />
                <ActivityDescription 
                    image={activity.cover_image_url}
                    title={activity.title}
                    description={activity.about}
                    price={activity.retail_price.formatted_value}
                />
                <CityDescription 
                    image={activity.city.cover_image_url}
                    title={activity.city.name}
                    description={activity.city.content}
                    more={activity.city.more}
                    id={activity.city.id}
                />
                <Cities />
            </Layout>
        </>
    );
}

export async function getServerSideProps({params}) {
    const res = await fetch(
        `https://sandbox.musement.com/api/v3/activities/${params.name}`,
        {
            headers: {
              Accept: "application/json",
              "X-Musement-Version": "3.4.0",
              "Accept-Language": "it-IT",
            },
        }
    );
    const data = await res.json();


    return {
        props:{
            activity: data,
        },
    };
}
