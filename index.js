let data = JSON.parse(localStorage.getItem('user_data')) || {
    font : 'j12',
    muted_music : false,
    volume : 0.3,
    total_count : 0,
    current_count : 0.00,
    cps : 0,
    nb_tools : 0,
    tools_price : 10,
    cps_tools : 0,
    total_tools : 0,
    nb_camp : 0,
    camp_price : 100,
    cps_camp : 0,
    total_camp : 0,
    nb_table : 0,
    table_price : 100,
    cps_table : 0,
    total_table : 0,
};

// let data = {
//     font : 'j12',
//     muted_music : false,
//     volume : 0.3,
//     total_count : 0,
//     current_count : 0.00,
//     cps : 0,
//     nb_tools : 0,
//     tools_price : 10,
//     cps_tools : 0,
//     total_tools : 0,
//     nb_camp : 0,
//     camp_price : 100,
//     cps_camp : 0,
//     total_camp : 0,
//     nb_table : 0,
//     table_price : 100,
//     cps_table : 0,
//     total_table : 0,
// };
console.log(data);
//valeur dev pour remettre a 0 data.nb_sword (ajout de bouton reset ou ascension)
localStorage.setItem('user_data', JSON.stringify(data));

// const user_data = JSON.parse(localStorage.getItem('user_data'));

//musique de fond
const background_music = new Audio();
background_music.src = "./ressources/sound/Tidecaller.mp3";
background_music.loop = true;
background_music.volume = data.volume;
const sound_elem = document.querySelector(".sound_control");

//son pour les boutons
const button_sound = new Audio();
button_sound.src = "./ressources/sound/button_ui.wav";
button_sound.volume = data.volume;

//journale de quête
const quest_journal_elem = document.querySelector(".quest_journal");
const quest_journal_text = document.querySelector(".quest_journal_text");
let data_quest_journal = [
    "Un fermier affirme avoir vu un gobelin voler son épouvantail. Le gobelin nie en bloc.",
    "Un dragon a été aperçu en train de piquer une sieste sur la grande place. Personne n’a osé le réveiller.",
    "Le sorcier du village affirme que son chat est l’incarnation d’un ancien dieu… Encore.",
    "Le maire de Bourbier-Moqueux a déclaré la guerre à un tas de fumier, affirmant qu'il lui avait 'manqué de respect'.",
    "Cherche aventurier pour récupérer une poule très précieuse. Elle répond au nom de ‘Bernadette’ et est plus vicieuse qu’elle n’en a l’air.",
    "Récompense à qui retrouvera la bague de mariage du forgeron. Il jure qu’elle n’est pas dans le puits… mais allez quand même vérifier.",
    "Besoin urgent d’un héros ! Problème : la taverne est à court de bière. C’est une crise nationale.",
    "Un apprenti mage a transformé son maître en chaise. Il faudrait le retrouver avant qu’un client ne s’assoie dessus.",
    "Le roi veut un gâteau d’anniversaire géant. Problème : il faut un œuf de dragon pour la recette. Détails à voir avec le pâtissier.",
    "Un village entier a été transformé en moutons. On ne sait pas qui est l’ennemi, mais on sait qu’il adore la laine.",
    "On raconte qu’un chevalier errant a combattu un escargot géant pendant 6 heures… et a perdu.",
    "Un marchand vendrait une épée maudite qui insulte son porteur à chaque coup raté.",
    "Une vieille dame du marché prétend que les pigeons du royaume sont des espions du roi. C’est probablement faux… ou pas.",
    "Le mage royal aurait accidentellement transformé son lit en golem. Résultat : il n’a pas dormi depuis trois jours.",
    "Un gobelin serait devenu riche en inventant une 'potion d’énergie' à base de café. Les alchimistes sont furieux.",
    "Il paraît que les squelettes des donjons se mettent à danser si on joue de la flûte.",
    "Une pluie de grenouilles s’est abattue sur la vallée. Les druides affirment que c’est un signe. De quoi ? On ne sait pas.",
    "Un chevalier s’est lancé dans une quête épique… pour retrouver son sandwich perdu.",
    "Le barde du village a composé une chanson tellement mauvaise que les trolls eux-mêmes ont fui.",
    "Un nain ivre a accidentellement découvert un trésor en trébuchant dans une grotte. Il refuse de dire où.",
    "Un sorcier a invoqué un démon... qui est devenu serveur à la taverne du coin. Service impeccable, mais ambiance tendue.",
    "Un apprenti nécromancien a ramené son poisson rouge à la vie. Il flotte toujours... mais dans les airs maintenant.",
    "Le roi a tenté de cuisiner aujourd'hui… le château sent encore le brûlé.",
    "Un gobelin aurait ouvert un stand de potions douteuses sur la place du marché. Résultats non garantis.",
    "La taverne Au Dragon Bourré lance un concours de beuverie. Venez avec votre foie et repartez sans vos souvenirs !",
    "Un poulet géant a été aperçu près du village. Oui, un poulet. Et non, ce n’est pas une blague.",
    "Le fermier Berthe cherche quelqu'un pour retrouver sa vache disparue… encore.",
    "On recherche un héros pour débarrasser la cave des rats. Encore une fois, ils ont pris le contrôle de la réserve de fromage.",
    "Urgent : besoin d’un volontaire pour tester une nouvelle potion d’invisibilité. Effets secondaires possibles : disparition de vêtements.",
    "Le mage local a invoqué quelque chose par erreur. Il ne sait pas quoi, mais ça grignote les meubles.",
    "La guilde des voleurs organise une chasse au trésor… dans votre maison.",
    "On dit que le dragon de la Montagne Nord a une allergie au pollen. La saison du printemps risque d’être intéressante.",
    "Le nain Grumbar aurait enfin trouvé une bière qu’il n’aime pas. Les témoins sont encore sous le choc.",
    "Une licorne aurait été vue en train de faire la sieste dans un champ de choux. Le propriétaire du champ est perplexe.",
    "Certains aventuriers affirment avoir entendu des squelettes jouer de la musique dans les catacombes. Ambiance garantie.",
    "La forêt Murmurante murmure… mais seulement des ragots sur les habitants du village.",
    "Un marchand ambulant vend des potions ‘à moitié prix’ car il a oublié ce qu’il a mis dedans.",
    "La pluie d’aujourd’hui est étrange… elle sent la soupe de légumes.",
    "Une bande de slimes a décidé de former un groupe de musique. Leur premier concert est prévu… dès qu’ils trouvent des instruments qui ne fondent pas.",
    "Le concours annuel du plus beau chapeau est reporté après un ‘incident magique’ l’année dernière.",
    "Un chevalier a perdu son armure en plein centre-ville. Si vous la trouvez, merci de ne pas la porter.",
    "Le roi Aldred annonce une grande fête pour célébrer la moisson exceptionnelle de cette année.",
    "Des éclaireurs rapportent la présence inquiétante de dragons aux frontières du Nord.",
    "La peste noire semble s'être emparée du village de Brisegrêle.",
    "Les forgerons de Forgeflamme auraient découvert un nouveau métal aux propriétés mystérieuses.",
    "Une prime est offerte pour quiconque éliminera les loups hantant les Bois Maudits.",
    "Le seigneur Tharom cherche des aventuriers pour escorter une caravane de précieuses marchandises.",
    "Le sanctuaire d'Auren a été profané par des cultistes. Justice doit être rendue.",
    "Un alchimiste offre une forte récompense pour des écailles de basilic fraîchement récoltées.",
    "Des murmures parlent d'un artefact ancien perdu dans les ruines d'Elthorn.",
    "On raconte qu'une sorcière vit dans les marais et exauce des vœux... contre un lourd tribut.",
    "Un vieil ermite prétend avoir vu un cerf d'or, présage de grands bouleversements.",
    "Certains disent qu'une armée de morts se rassemble dans les Terres Sombres.",
    "Un mystérieux marchand vendrait des objets maudits à la foire de Brumelande.",
    "Une étrange brume a englouti le village de Dorselune, nul n'ose s'en approcher."
];
let availableQuests = [...data_quest_journal];

//sous menu pour paramètre
const sous_menu_param = document.querySelector(".param_menu");
const btn_param = document.querySelector(".param_control");
const volume_slider = document.getElementById('volume');
const volume_value = document.getElementById('volume_value');
const select = document.getElementById('font_select');
const text_elem = document.querySelectorAll(".text");
const text_count_elem = document.querySelector(".count");
select.value = data.font;
let param_open = false;
volume_slider.value = data.volume;
volume_value.textContent = (data.volume*100).toFixed(0) + "%";
change_font();


//sous menu pour upgrade
const sous_menu_upgrade = document.querySelector(".sous_menu_upgrade")
const sous_menu_tools = document.querySelector(".sous_menu_tools");
const cps_tools_elem = document.querySelector(".cps_tools");
const total_tools_elem = document.querySelector(".total_tools");

const sous_menu_camp = document.querySelector(".sous_menu_camp");
const cps_camp_elem = document.querySelector(".cps_camp");
const total_camp_elem = document.querySelector(".total_camp");

const sous_menu_table = document.querySelector(".sous_menu_table");
const cps_table_elem = document.querySelector(".cps_table");
const total_table_elem = document.querySelector(".total_table");

//compteur
const count_current_elem = document.querySelector(".count_current");
const cps_elem = document.querySelector(".cps");

//animations visible par le joueur
const animations_visible_elem = document.querySelector(".animation_visible");
const click_elem = document.querySelector(".click");

//var outils
const tools_upgrade = document.querySelector(".tools_upgrade");
const tools_price_elem = document.querySelector(".tools_price");
const nb_tools_elem = document.querySelector(".nb_tools");

//var feu de camp
const camp_upgrade = document.querySelector(".camp_upgrade");
const camp_price_elem = document.querySelector(".camp_price");
const nb_camp_elem = document.querySelector(".nb_camp");

//var table en bois
const table_upgrade = document.querySelector(".table_upgrade");
const table_price_elem = document.querySelector(".table_price");
const nb_table_elem = document.querySelector(".nb_table");



let user_data = JSON.parse(localStorage.getItem('user_data')) || data;
background_music.muted = user_data.muted_music;
if (background_music.muted){
    sound_elem.setAttribute("src", "./ressources/img/muted.png");
}else{
    sound_elem.setAttribute("src", "./ressources/img/unmuted.png");
}


/**
 * ----------------- UPGRADE ----------------------------------------------------------------------------------------------------------------------------------
 */

//gère les attribut de tools
tools_upgrade.addEventListener('click', () => {
    //sauvegarde du compteur de tools
    if(data.current_count >= data.tools_price)
    {
        data.nb_tools += 1;
        data.muted_music = background_music.muted;
        data.current_count -= data.tools_price;
        data.tools_price += 3;
        data.cps_tools = 0.1*data.nb_tools;

        localStorage.setItem('user_data', JSON.stringify(data));
    
        nb_tools_elem.textContent = data.nb_tools;
        tools_price_elem.textContent = data.tools_price;
    }
});

//gère les attribut de camp
camp_upgrade.addEventListener('click', () => {
    //sauvegarde du compteur de camp
    if(data.current_count >= data.camp_price)
    {
        data.nb_camp += 1;
        data.muted_music = background_music.muted;
        data.current_count -= data.camp_price;
        data.camp_price += 3;
        data.cps_camp = 1*data.nb_camp;

        localStorage.setItem('user_data', JSON.stringify(data));
    
        nb_camp_elem.textContent = data.nb_camp;
        camp_price_elem.textContent = data.camp_price;
    }
});

//gère les attribut de table
table_upgrade.addEventListener('click', () => {
    //sauvegarde du compteur de camp
    if(data.current_count >= data.camp_price)
    {
        data.nb_table += 1;
        data.muted_music = background_music.muted;
        data.current_count -= data.table_price;
        data.table_price += 3;
        data.cps_table = 1*data.nb_table;

        localStorage.setItem('user_data', JSON.stringify(data));
    
        nb_table_elem.textContent = data.nb_table;
        table_price_elem.textContent = data.table_price;
    }
});

/**
 * ----------------- FIN UPGRADE ----------------------------------------------------------------------------------------------------------------------------------
 */




/**
 * ----------------- JOURNAL DE QUETE ----------------------------------------------------------------------------------------------------------------------------------
 */
// Fonction pour tirer une quête aléatoire sans répétition
function getRandomQuest()
{
    if (availableQuests.length === 0)
    {
        console.log("Toutes les quêtes ont été affichées, reset !");
        availableQuests = [...data_quest_journal];
    }
    const randomIndex = Math.floor(Math.random() * availableQuests.length);
    const quest = availableQuests.splice(randomIndex, 1)[0]; // Retire la quête tirée
    return quest;
}

// Mise à jour du journal toutes les secondes
window.setInterval(() => {
    quest_journal_text.style.opacity = "0.4";

    setTimeout( () => {
        const newQuest = getRandomQuest();
        quest_journal_text.textContent = newQuest;
        quest_journal_text.style.opacity = "1";
        console.log(newQuest);
    }, 600);
}, 15000);

/**
 * ----------------- FIN JOURNAL DE QUETE ----------------------------------------------------------------------------------------------------------------------------------
 */




/**
 * ----------------- BOUTON PARAM ----------------------------------------------------------------------------------------------------------------------------------
 */

//gère l'état du bouton musique de fond
sound_elem.addEventListener("click", () => {
    //sauvegarde de la musique muted
    background_music.muted = !background_music.muted;
    data.muted_music = background_music.muted;
    localStorage.setItem('user_data', JSON.stringify(data));

    button_sound.play();
    if(background_music.muted)
        sound_elem.setAttribute("src", "./ressources/img/muted.png");
    else
        sound_elem.setAttribute("src", "./ressources/img/unmuted.png");
});

//gère l'état du bouton de param
btn_param.addEventListener("click", () => {
    if(!param_open){
        sous_menu_param.style.visibility = "visible";
        param_open = true;
    }else{
        sous_menu_param.style.visibility = "hidden";
        param_open = false;
    }
    button_sound.play();
});

volume_slider.addEventListener('input', () => {
    const value = volume_slider.value;
    volume_value.textContent = (value*100).toFixed(0) + "%";
    data.volume = value;
    background_music.volume = data.volume;
    button_sound.volume = data.volume;
    localStorage.setItem('user_data', JSON.stringify(data));
  
    // Si vous avez un élément audio : audio.volume = value / 100;
    console.log('Volume:', value); // Pour débogage
    console.log('data.volume ' + data.volume);
});

select.addEventListener("change", () => {
    button_sound.play();
    change_font();

    localStorage.setItem('user_data', JSON.stringify(data));
});

/**
 * ----------------- FIN BOUTON PARAM ----------------------------------------------------------------------------------------------------------------------------------
 */

//déclenche la musique ou non
window.addEventListener("click", () => {
    background_music.muted = data.muted_music;
    console.log("le son est mute ? : " + background_music.muted);
    if (!background_music.muted)
        background_music.play();
});


/**
 * ----------------- SOUS MENU UPGRADE ----------------------------------------------------------------------------------------------------------------------------------
 */

document.querySelectorAll('.upgrade_container').forEach((item) => {
    const targetId = item.dataset.target;
    const sousMenu = document.getElementById(targetId);

    item.addEventListener("mouseenter", () => {
        const rect = item.getBoundingClientRect();
        sousMenu.style.top = (rect.top - 15 + window.scrollY) + "px";
        sousMenu.style.left = (rect.left - 330 + window.scrollX) + "px";

        setTimeout(() => {
            sousMenu.style.visibility = "visible";
            sousMenu.style.opacity = "1";
        }, 100);
    });

    item.addEventListener("mouseleave", () => {
        sousMenu.style.opacity = "0";
        setTimeout(() => {
            sousMenu.style.visibility = "hidden";
        }, 300);
    });
});

/**
 * ----------------- FIN SOUS MENU UPGRADE ----------------------------------------------------------------------------------------------------------------------------------
 */

window.setInterval(() => {
    data.current_count += data.cps;
    data.total_tools += data.cps_tools;
    data.total_camp += data.cps_camp;
    data.total_table += data.cps_table;
    localStorage.setItem('user_data', JSON.stringify(data));
}, 1000);

//mets a jour l'affichage
window.setInterval(() => {
    //maj affichage compteur
    count_current_elem.textContent = data.current_count.toFixed(2) + " d'or";
    cps_elem.textContent = data.cps.toFixed(2) + " ops";

    //mets a jour l'affichage nb de chaque upgrade
    nb_tools_elem.textContent = data.nb_tools;
    nb_camp_elem.textContent = data.nb_camp;
    nb_table_elem.textContent = data.nb_table;

    //mise a jour de l'affichage des prix
    tools_price_elem.textContent = "prix : " + data.tools_price.toFixed(2) + " or";
    camp_price_elem.textContent = "prix : " + data.camp_price.toFixed(2) + " or";
    table_price_elem.textContent = "prix : " + data.table_price.toFixed(2) + " or";

    //maj affichage sous menu upgrade
    cps_tools_elem.textContent = "Les outils vous rapportent " + data.cps_tools.toFixed(2) + " OpS soit " + (data.cps_tools*100/data.cps).toFixed(2) + "%";
    total_tools_elem.textContent = "Les outils vous ont rapporté un total de " + data.total_tools.toFixed(2) + " or";
    cps_camp_elem.textContent = "Le feu de camp vous rapporte " + data.cps_camp.toFixed(2) + " OpS soit " + (data.cps_camp*100/data.cps).toFixed(2) + "%";
    total_camp_elem.textContent = "Le feu de camp vous a rapporté un total de " + data.total_camp.toFixed(2) + " or"; 
    cps_table_elem.textContent = "La table vous rapporte " + data.cps_table.toFixed(2) + " OpS soit " + (data.cps_table*100/data.cps).toFixed(2) + "%";
    total_table_elem.textContent = "La table vous a rapporté un total de " + data.total_table.toFixed(2) + " or"; 
}, 0);


setInterval(() => {
    data.cps = data.cps_tools + data.cps_camp + data.cps_table;
    data.total_count += data.cps
}, 0);


//clic sur animations
animations_visible_elem.addEventListener("click", (e) => {
    let clic = 1+0.2*data.cps;
    data.current_count += clic;
    click_elem.style.visibility = "visible"
    click_elem.style.opacity = 1;
    click_elem.style.left = (e.pageX-20) + "px";
    click_elem.style.top = (e.pageY-30) + "px";
    click_elem.textContent = "+" + clic.toFixed(2);

    click_elem.classList.remove("animate-float");
    void click_elem.offsetWidth; // force reflow
    click_elem.classList.add("animate-float");

    // Et le cacher complètement après l'animation (ex : 800ms total)
    setTimeout(() => {
        click_elem.style.visibility = "hidden";
    }, 400);
});







const resetButton = document.querySelector(".reset_button");
resetButton.addEventListener("click", () => {
    localStorage.removeItem('user_data');
    location.reload(); // recharge avec valeurs par défaut
    console.log("reset");
});






function change_font()
{
    if(select.value === "monospace")
    {
        text_count_elem.style.fontSize = "14px";
        document.querySelector(".count_current").style.fontSize = "40px";
        document.querySelector(".cps").style.fontSize = "24px";
        text_elem.forEach(elem => {
            elem.style.fontSize = "14px";
        });
    }
    else
    {
        text_elem.forEach(elem => {
            elem.style.fontSize = "21px";
        });
        document.querySelector(".click").style.fontSize = "37px";
        text_count_elem.style.fontSize = "70px";
        quest_journal_text.style.fontSize = "clamp(14px, 4vw, 28px)";
        document.querySelector('.count_current').style.fontSize = "70px";
        document.querySelector(".cps").style.fontSize = "40px";
        document.querySelectorAll('.upgrade_title').forEach(elem => {
            elem.style.fontSize = "36px";
        });
        document.querySelectorAll('.upgrade_quote').forEach(elem => {
            elem.style.fontSize = "14px";
        });
        document.querySelectorAll('.upgrade_price').forEach(elem => {
            elem.style.fontSize = "18px";
        });
        document.querySelectorAll('.nb_upgrade p').forEach(elem => {
            elem.style.fontSize = "65px";
        });
        document.querySelectorAll('.smtext').forEach(elem => {
            elem.style.fontSize = "21px";
        });
    }

    data.font = select.value;
    text_count_elem.style.fontFamily = data.font;
    text_elem.forEach(elem => {
        elem.style.fontFamily = data.font;
    });
}