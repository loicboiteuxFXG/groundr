class User {
    firstName;
    lastName;
    email;
    DoB;
    gender;
    orientation;
    interestList;
    latitude;
    longitude;

    /**
     * Constructeur pour un utilisateur de GoundR.
     * @param {string} firstName Prénom
     * @param {string} lastName Nom de famille
     * @param {string} email Email
     * @param {Date} DoB Date de naissance
     * @param {string} gender Identité de genre ["M", "F", "X"]
     * @param {string} orientation Orientation sexuelle ["M", "F", "B", "A"]
     * @param {number} latitude À VOIR
     * @param {number} longitude
     * @param {Array<string>} interestList Array des intérets de l'utilisateur
     */
    constructor(firstName, lastName, email, DoB, gender, orientation, interestList, latitude, longitude){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.DoB = DoB;
        this.gender = gender;
        this.orientation = orientation;
        this.interestList = interestList;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    /**
     * Retourne les propriétés de géolocalisation dans le format GeoJSON
     * @returns {{coordinates: number[], type: string}}
     */
    getGeoData() {
        return {"type": "Point", "coordinates": [this.latitude, this.longitude]};
    }

}