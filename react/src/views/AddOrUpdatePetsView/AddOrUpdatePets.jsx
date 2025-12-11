import { useState, useEffect } from 'react';
import styles from './AddOrUpdatePets.module.css';
import PetService from "../../services/PetService";

export default function AddOrUpdatePets() {
    const [mode, setMode] = useState(null); // 'add' or 'update'
     const [formData, setFormData] = useState({
    animalType: '',
    animalBreed: '',
    animalColor: '',
    animalAge: '',
    animalName: '',
    adoptionStatus: 'available',
    imageUrl: '',
    imageUrl1: '',
    imageUrl2: '',
});


    const [petsList, setPetsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPet, setSelectedPet] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [imageOptions, setImageOptions] = useState({
        image_url: 'url',
        image_url1: 'url',
        image_url2: 'url'
    });

    // Load all pets
    const loadPets = () => {
        PetService.getAllAvailablePets()
            .then(res => setPetsList(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        if (mode === 'update') loadPets();
    }, [mode]);

    // Populate form when a pet is selected
    useEffect(() => {
        if (selectedPet) {
            setFormData({
                animal_type: selectedPet.animal_type || '',
                breed: selectedPet.breed || '',
                color: selectedPet.color || '',
                age: selectedPet.age != null ? selectedPet.age : '',
                name: selectedPet.name || '',
                adoption_status: selectedPet.adoption_status || 'available',
                image_url: selectedPet.image_url || '',
                image_url1: selectedPet.image_url1 || '',
                image_url2: selectedPet.image_url2 || '',
            });
        }
    }, [selectedPet]);

    const handleChange = e => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (mode === 'add') {
            PetService.addNewPet(formData)
                .then(() => {
                    setSuccessMessage('Pet added successfully!');
                    loadPets();
                    setFormData({
                        animal_type: '',
                        breed: '',
                        color: '',
                        age: '',
                        name: '',
                        adoption_status: 'available',
                        image_url: '',
                        image_url1: '',
                        image_url2: '',
                    });
                })
                .catch(err => {
                    console.error(err);
                    setErrorMessage('Failed to add pet.');
                });
        } else if (mode === 'update') {
            if (!selectedPet) return setErrorMessage('Select a pet to update');
            PetService.updatePet(selectedPet.animal_id, formData)
                .then(() => {
                    setSuccessMessage('Pet updated successfully!');
                    loadPets();
                })
                .catch(err => {
                    console.error(err);
                    setErrorMessage('Failed to update pet.');
                });
        }
    };

    const handleSearch = () => {
        if (!searchTerm) {
            loadPets();
        } else {
            const filtered = petsList.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setPetsList(filtered);
        }
    };

    if (!mode) {
        return (
            <div className={styles.container}>
                <h2 className={styles.title}>What would you like to do?</h2>
                <div className={styles.buttonRow}>
                    <button className={styles.actionButton} onClick={() => setMode('add')}>Add Pet</button>
                    <button className={styles.actionButton} onClick={() => setMode('update')}>Update Pet</button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{mode === 'add' ? 'Add New Pet' : 'Update Pet'}</h2>

            {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

            {mode === 'update' && (
                <div className={styles.updateSection}>
                    <div className={styles.updateHeader}>
                        <div className={styles.searchRow}>
                            <input
                                type="text"
                                placeholder="Search pets..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className={styles.searchInput}
                            />
                            <button className={styles.searchButton} onClick={handleSearch}>Search</button>
                            <button className={styles.backButton} onClick={() => {
                                setMode(null);
                                setSelectedPet(null);
                                setSearchTerm('');
                                loadPets();
                            }}>Back</button>
                        </div>
                    </div>
                    <div className={styles.petsList}>
                        {petsList.map(pet => (
                            <div
                                key={pet.animal_id}
                                className={`${styles.petCard} ${selectedPet?.animal_id === pet.animal_id ? styles.selectedPet : ''}`}
                                onClick={() => setSelectedPet(pet)}
                            >
                                <img src={pet.image_url} alt={pet.name} className={styles.petImage} />
                                <div>{pet.name} ({pet.animal_type})</div>
                            </div>
                        ))}
                        {petsList.length === 0 && <div>No pets found</div>}
                    </div>
                </div>
            )}

            {(mode === 'add' || selectedPet) && (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className={styles.field}>
                            <label>Type</label>
                            <input type="text" name="animal_type" value={formData.animal_type} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Breed</label>
                            <input type="text" name="breed" value={formData.breed} onChange={handleChange} required />
                        </div>
                        <div className={styles.field}>
                            <label>Color</label>
                            <input type="text" name="color" value={formData.color} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Age</label>
                            <input type="number" name="age" value={formData.age ?? ''} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Adoption Status</label>
                            <select name="adoption_status" value={formData.adoption_status} onChange={handleChange}>
                                <option value="available">Available</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    {['image_url', 'image_url1', 'image_url2'].map((imgField, idx) => (
                        <div className={styles.row} key={imgField}>
                            <div className={styles.field}>
                                <label>{idx === 0 ? 'Main Image' : `Additional Image ${idx}`}</label>
                                <input type="text" name={imgField} value={formData[imgField]} onChange={handleChange} />
                            </div>
                        </div>
                    ))}

                    <div className={styles.buttonRow}>
                        <button type="submit" className={styles.submitButton}>
                            {mode === 'add' ? 'Add Pet' : 'Update Pet'}
                        </button>
                        <button type="button" className={styles.backButton} onClick={() => {
                            setMode(null);
                            setSelectedPet(null);
                        }}>
                            Back
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
