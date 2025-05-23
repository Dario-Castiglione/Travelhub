
import Image from 'next/image'
import InfoIconBox from '../InfoIconBox'
import styles from './ActivityDescription.module.scss'


export default function ActivityDescription({
    image = 'https://images.unsplash.com/photo-1510253687831-0f982d7862fc',
    title = 'immagine attività',
    description = 'Descrizione Lorem Ipsum',
    price = '€',
    showService1 = false,
    showService2 = false,
    showService3 = false,
    showService4 = false,
    btnActive = false,
    btnAction = undefined
    }) {

    return (
        <section className={styles.wrapper_activity_description}>
            <div className={styles.wrapper_activity_image}>
                <Image 
                    src={image.replace('?w=540', '') + '?h=400&w'}
                    alt={title}
                    width='600px'
                    height='400px'
                />
            </div>
            <div className={styles.wrapper_activity_info}>
                <h2>Descrizione</h2>
                <p>{description}</p>
                <div className={styles.wrapper_activity_shop}>
                    <p className={styles.price}>{price}</p>
                    {
                        
                        btnActive ?
                            <button className={styles.active}>Aggiunto</button>
                        :
                        <button onClick={btnAction}>Aggiungi al carrello</button>
                    }
                </div>
                <div className={styles.wrapper_activity_services}>
                    {showService1 && <InfoIconBox icon={1} title='Offerta Regalabile'/>}
                    {showService2 && <InfoIconBox icon={2} title='Offerta Speciale' />}
                    {showService3 && <InfoIconBox icon={3} title='Cancellazione Gratuita'/>}
                    {showService4 && <InfoIconBox icon={4} title='Disponibile Oggi'/>}
                </div>
            </div>
        </section>
    )
};