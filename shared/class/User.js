const GeoJSON = require('geojson')

class User {

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
    constructor(firstName, lastName, email, DoB, gender, orientation, latitude, longitude, interestList){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.DoB = DoB;
        this.gender = gender;
        this.orientation = orientation;
        this.location = location;
        this.interestList = interestList;
    }



}