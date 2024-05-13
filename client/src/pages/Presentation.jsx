import ShowcaseHeader from "../components/ShowcaseHeader";
import Footer from "../components/Footer";
import '../styles.css'
import React, {useEffect} from "react";


const Presentation = () => {
    useEffect(() => {
        document.title = "GroundR | Site de rencontre"
    }, []);

    return (
        <div className="presentation">
            <ShowcaseHeader/>
            <div className="presentationcontainer container">
                <h2 className="golden">GroundR, <span>LA</span> plateforme pour trouver l'amour.</h2>
                <h3>Trouver votre âme soeur n'a jamais été aussi façile!</h3>
                <div>
                    <p>GroundR repousse les limites de la datation en ligne en mettant l'accent sur la connexion
                        réelle
                        et profonde entre les individus. Nous croyons que les rencontres devraient être plus que de
                        simples swipes et que chaque interaction a le potentiel de changer votre vie.</p>
                    <h4>
                        Ce qui nous distingue :
                    </h4>
                    <ol>
                        <li><p><strong>Connexions Authentiques</strong> : Dites adieu aux conversations superficielles. Sur GroundR, nous
                            valorisons les échanges sincères et les relations authentiques.</p></li>
                        <li><p><strong>Profils Complets</strong> : Notre approche axée sur la personnalité vous permet de créer un profil
                            détaillé, mettant en avant vos passions, vos valeurs et ce qui vous rend unique.</p></li>
                        <li><p><strong>Algorithmes Intelligents</strong> : Notre algorithme de correspondance avancé utilise des données
                            pertinentes pour vous mettre en relation avec des personnes partageant vos intérêts et vos
                            objectifs.</p></li>
                        <li><p><strong>Sécurité Renforcée</strong> : Votre sécurité est notre priorité. Nous avons mis en place des
                            mesures de sécurité robustes pour garantir une expérience sûre et respectueuse pour tous nos
                            utilisateurs.</p></li>
                        <li><p><strong>Communauté Engagée</strong> : Rejoignez une communauté vibrante de personnes qui partagent votre
                            désir de trouver des relations significatives. Partagez des expériences, des conseils et des
                            moments de vie avec d'autres membres de GroundR.</p></li>
                    </ol>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Presentation;