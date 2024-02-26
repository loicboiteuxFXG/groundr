export class User {
    firstName;
    lastName;
    password;
    email;
    DoB;
    gender;
    orientation;
    interestList;
    latitude;
    longitude;
    pfpURL;

    /**
     * Constructeur pour un utilisateur de GoundR.
     * @param {string} firstName Prénom
     * @param {string} lastName Nom de famille
     * @param {string} password Mot de passe
     * @param {string} email Email
     * @param {string} DoB Date de naissance
     * @param {string} gender Identité de genre ["M", "F", "X"]
     * @param {string} orientation Orientation sexuelle ["M", "F", "B", "A"]
     * @param {number} latitude À VOIR
     * @param {number} longitude
     * @param {Array<string>} interestList Array des intérets de l'utilisateur
     * @param {string} pfpURL Nom du fichier de la PFP
     */
    constructor(firstName, lastName, password, email, DoB = null, gender = "", orientation = "", interestList = [], pfpURL = "", latitude = 0, longitude = 0){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.DoB = DoB;
        this.gender = gender;
        this.orientation = orientation;
        this.interestList = interestList;
        this.pfpURL = pfpURL;
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

    setPFP(url) {
        this.pfpURL = url;
    }

}