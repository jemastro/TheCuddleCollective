import styles from './PetCard.module.css';

export default function PetCard({ pet }) {
     return (
          <div className={styles.card}>
               <img
                    src={pet.image_url} 
                    alt={pet.animal_name} 
                    className={styles.petImage} 
               />
               <h3>{pet.animal_name}</h3>
               <p>Type: {pet.animal_type}</p>
               <p>Breed: {pet.animal_breed}</p>
               <p>Age: {pet.animal_age}</p>
               <p>Status: {pet.adoption_status}</p>
          </div>
     );
}
