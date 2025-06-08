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
    camp_price : 30,
    cps_camp : 0,
    total_camp : 0,

    nb_table : 0,
    table_price : 80,
    cps_table : 0,
    total_table : 0,

    nb_tente : 0,
    tente_price : 200,
    cps_tente : 0,
    total_tente : 0,

    nb_corde : 0,
    corde_price : 600,
    cps_corde : 0,
    total_corde : 0,

    nb_enclume : 0,
    enclume_price : 1500,
    cps_enclume : 0,
    total_enclume : 0,

    nb_epee : 0,
    epee_price : 4000,
    cps_epee : 0,
    total_epee : 0,

    nb_armure : 0,
    armure_price : 9000,
    cps_armure : 0,
    total_armure : 0,

    nb_dog : 0,
    dog_price : 25000,
    cps_dog : 0,
    total_dog : 0,

    nb_mannequin : 0,
    mannequin_price : 60000,
    cps_mannequin : 0,
    total_mannequin : 0,
};

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

let data_quest_journal = [];
let availableQuests = [];

fetch('./quest.json')
    .then(response => response.json())
    .then(json => {
        data_quest_journal = json;
        availableQuests = [...data_quest_journal];
    })
    .catch(error => console.error("Erreur de chargement du journal de quêtes :", error));


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


/****************************** sous menu pour upgrade ******************************/

const sous_menu_upgrade = document.querySelector(".sous_menu_upgrade");

const sous_menu_tools = document.querySelector(".sous_menu_tools");
const cps_tools_elem = document.querySelector(".cps_tools");
const total_tools_elem = document.querySelector(".total_tools");

const sous_menu_camp = document.querySelector(".sous_menu_camp");
const cps_camp_elem = document.querySelector(".cps_camp");
const total_camp_elem = document.querySelector(".total_camp");

const sous_menu_table = document.querySelector(".sous_menu_table");
const cps_table_elem = document.querySelector(".cps_table");
const total_table_elem = document.querySelector(".total_table");

const sous_menu_tente = document.querySelector(".sous_menu_tente");
const cps_tente_elem = document.querySelector(".cps_tente");
const total_tente_elem = document.querySelector(".total_tente");

const sous_menu_corde = document.querySelector(".sous_menu_corde");
const cps_corde_elem = document.querySelector(".cps_corde");
const total_corde_elem = document.querySelector(".total_corde");

const sous_menu_enclume = document.querySelector(".sous_menu_enclume");
const cps_enclume_elem = document.querySelector(".cps_enclume");
const total_enclume_elem = document.querySelector(".total_enclume");

const sous_menu_epee = document.querySelector(".sous_menu_epee");
const cps_epee_elem = document.querySelector(".cps_epee");
const total_epee_elem = document.querySelector(".total_epee");

const sous_menu_armure = document.querySelector(".sous_menu_armure");
const cps_armure_elem = document.querySelector(".cps_armure");
const total_armure_elem = document.querySelector(".total_armure");

const sous_menu_dog = document.querySelector(".sous_menu_dog");
const cps_dog_elem = document.querySelector(".cps_dog");
const total_dog_elem = document.querySelector(".total_dog");

const sous_menu_mannequin = document.querySelector(".sous_menu_mannequin");
const cps_mannequin_elem = document.querySelector(".cps_mannequin");
const total_mannequin_elem = document.querySelector(".total_mannequin");


/****************************** compteur ******************************/

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

//var tente
const tente_upgrade = document.querySelector(".tente_upgrade");
const tente_price_elem = document.querySelector(".tente_price");
const nb_tente_elem = document.querySelector(".nb_tente");

//var corde
const corde_upgrade = document.querySelector(".corde_upgrade");
const corde_price_elem = document.querySelector(".corde_price");
const nb_corde_elem = document.querySelector(".nb_corde");

//var enclume
const enclume_upgrade = document.querySelector(".enclume_upgrade");
const enclume_price_elem = document.querySelector(".enclume_price");
const nb_enclume_elem = document.querySelector(".nb_enclume");

//var epee
const epee_upgrade = document.querySelector(".epee_upgrade");
const epee_price_elem = document.querySelector(".epee_price");
const nb_epee_elem = document.querySelector(".nb_epee");

//var armure
const armure_upgrade = document.querySelector(".armure_upgrade");
const armure_price_elem = document.querySelector(".armure_price");
const nb_armure_elem = document.querySelector(".nb_armure");

//var dog
const dog_upgrade = document.querySelector(".dog_upgrade");
const dog_price_elem = document.querySelector(".dog_price");
const nb_dog_elem = document.querySelector(".nb_dog");

//var dog
const mannequin_upgrade = document.querySelector(".mannequin_upgrade");
const mannequin_price_elem = document.querySelector(".mannequin_price");
const nb_mannequin_elem = document.querySelector(".nb_mannequin");


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
    const base_tools_price = 10;      // coût initial plus petit
    const cost_multiplier = 1.08;    // croissance plus lente
    const cost_log_coef = 1;         // log moins impactant
    const n = data.nb_tools;
    const current_cost = base_tools_price * Math.pow(cost_multiplier, n) + cost_log_coef * Math.log(n + 1);

    //sauvegarde du compteur de tools
    if(data.current_count >= current_cost)
    {
        data.nb_tools += 1;
        data.muted_music = background_music.muted;
        data.current_count -= current_cost;

        const next_cost = base_tools_price * Math.pow(cost_multiplier, data.nb_tools) + cost_log_coef * Math.log(data.nb_tools + 1);
        data.tools_price = next_cost;

        data.cps_tools = 0.05 * Math.pow(data.nb_tools + 1, 1.1);  // progression plus douce du gain

        // Sauvegarde et mise à jour UI
        localStorage.setItem('user_data', JSON.stringify(data));

        nb_tools_elem.textContent = data.nb_tools;
        tools_price_elem.textContent = next_cost;
    }
});

//gère les attribut de camp
camp_upgrade.addEventListener('click', () => {
    const base_camp_price = 30;      // coût initial plus petit
    const cost_multiplier = 1.09;    // croissance plus lente
    const cost_log_coef = 1;         // log moins impactant
    const n = data.nb_camp;
    const current_cost = base_camp_price * Math.pow(cost_multiplier, n) + cost_log_coef * Math.log(n + 1);

    //sauvegarde du compteur de camp
    if(data.current_count >= current_cost)
    {
        data.nb_camp += 1;
        data.muted_music = background_music.muted;
        data.current_count -= current_cost;

        const next_cost = base_camp_price * Math.pow(cost_multiplier, data.nb_camp) + cost_log_coef * Math.log(data.nb_camp + 1);
        data.camp_price = next_cost;

        data.cps_camp = 0.2 * Math.pow(data.nb_camp + 1, 1.1);  // progression plus douce du gain

        // Sauvegarde et mise à jour UI
        localStorage.setItem('user_data', JSON.stringify(data));

        nb_camp_elem.textContent = data.nb_camp;
        camp_price_elem.textContent = next_cost;
    }
});

//gère les attribut de table
table_upgrade.addEventListener('click', () => {
    const base_table_price = 80;      // coût initial plus petit
    const cost_multiplier = 1.1;    // croissance plus lente
    const cost_log_coef = 1;         // log moins impactant
    const n = data.nb_table;
    const current_cost = base_table_price * Math.pow(cost_multiplier, n) + cost_log_coef * Math.log(n + 1);

    //sauvegarde du compteur de table
    if(data.current_count >= current_cost)
    {
        data.nb_table += 1;
        data.muted_music = background_music.muted;
        data.current_count -= current_cost;

        const next_cost = base_table_price * Math.pow(cost_multiplier, data.nb_table) + cost_log_coef * Math.log(data.nb_table + 1);
        data.table_price = next_cost;

        data.cps_table = 0.6 * Math.pow(data.nb_table + 1, 1.08);  // progression plus douce du gain

        // Sauvegarde et mise à jour UI
        localStorage.setItem('user_data', JSON.stringify(data));

        nb_table_elem.textContent = data.nb_table;
        table_price_elem.textContent = next_cost;
    }
});

//gère les attribut de tente
tente_upgrade.addEventListener('click', () => {
    const base_tente_price = 200;      // coût initial plus petit
    const cost_multiplier = 1.11;    // croissance plus lente
    const cost_log_coef = 1;         // log moins impactant
    const n = data.nb_tente;
    const current_cost = base_tente_price * Math.pow(cost_multiplier, n) + cost_log_coef * Math.log(n + 1);

    //sauvegarde du compteur de tente
    if(data.current_count >= current_cost)
    {
        data.nb_tente += 1;
        data.muted_music = background_music.muted;
        data.current_count -= current_cost;

        const next_cost = base_tente_price * Math.pow(cost_multiplier, data.nb_tente) + cost_log_coef * Math.log(data.nb_tente + 1);
        data.tente_price = next_cost;

        data.cps_tente = 1.5 * Math.pow(data.nb_tente + 1, 1.07);  // progression plus douce du gain

        // Sauvegarde et mise à jour UI
        localStorage.setItem('user_data', JSON.stringify(data));

        nb_tente_elem.textContent = data.nb_tente;
        tente_price_elem.textContent = next_cost;
    }
});

//gère les attribut de corde
corde_upgrade.addEventListener('click', () => {
    const base_corde_price = 600;      // coût initial plus petit
    const cost_multiplier = 1.12;    // croissance plus lente
    const cost_log_coef = 1;         // log moins impactant
    const n = data.nb_corde;
    const current_cost = base_corde_price * Math.pow(cost_multiplier, n) + cost_log_coef * Math.log(n + 1);

    //sauvegarde du compteur de corde
    if(data.current_count >= current_cost)
    {
        data.nb_corde += 1;
        data.muted_music = background_music.muted;
        data.current_count -= current_cost;

        const next_cost = base_corde_price * Math.pow(cost_multiplier, data.nb_corde) + cost_log_coef * Math.log(data.nb_corde + 1);
        data.corde_price = next_cost;

        data.cps_corde = 4 * Math.pow(data.nb_corde + 1, 1.06);  // progression plus douce du gain

        // Sauvegarde et mise à jour UI
        localStorage.setItem('user_data', JSON.stringify(data));

        nb_corde_elem.textContent = data.nb_corde;
        corde_price_elem.textContent = next_cost;
    }
});

//gère les attribut de enclume
enclume_upgrade.addEventListener('click', () => {
    const base_enclume_price = 1500;      // coût initial plus petit
    const cost_multiplier = 1.13;    // croissance plus lente
    const cost_log_coef = 1;         // log moins impactant
    const n = data.nb_enclume;
    const current_cost = base_enclume_price * Math.pow(cost_multiplier, n) + cost_log_coef * Math.log(n + 1);

    //sauvegarde du compteur de enclume
    if(data.current_count >= current_cost)
    {
        data.nb_enclume += 1;
        data.muted_music = background_music.muted;
        data.current_count -= current_cost;

        const next_cost = base_enclume_price * Math.pow(cost_multiplier, data.nb_enclume) + cost_log_coef * Math.log(data.nb_enclume + 1);
        data.enclume_price = next_cost;

        data.cps_enclume = 10 * Math.pow(data.nb_enclume + 1, 1.05);  // progression plus douce du gain

        // Sauvegarde et mise à jour UI
        localStorage.setItem('user_data', JSON.stringify(data));

        nb_enclume_elem.textContent = data.nb_enclume;
        enclume_price_elem.textContent = next_cost;
    }
});

//gère les attribut de epee
epee_upgrade.addEventListener('click', () => {
    const base_epee_price = 4000;      // coût initial plus petit
    const cost_multiplier = 1.14;    // croissance plus lente
    const cost_log_coef = 1;         // log moins impactant
    const n = data.nb_epee;
    const current_cost = base_epee_price * Math.pow(cost_multiplier, n) + cost_log_coef * Math.log(n + 1);

    //sauvegarde du compteur de epee
    if(data.current_count >= current_cost)
    {
        data.nb_epee += 1;
        data.muted_music = background_music.muted;
        data.current_count -= current_cost;

        const next_cost = base_epee_price * Math.pow(cost_multiplier, data.nb_epee) + cost_log_coef * Math.log(data.nb_epee + 1);
        data.epee_price = next_cost;

        data.cps_epee = 30 * Math.pow(data.nb_epee + 1, 1.04);  // progression plus douce du gain

        // Sauvegarde et mise à jour UI
        localStorage.setItem('user_data', JSON.stringify(data));

        nb_epee_elem.textContent = data.nb_epee;
        epee_price_elem.textContent = next_cost;
    }
});

//gère les attribut de armure
armure_upgrade.addEventListener('click', () => {
    const base_armure_price = 9000;      // coût initial plus petit
    const cost_multiplier = 1.15;    // croissance plus lente
    const cost_log_coef = 1;         // log moins impactant
    const n = data.nb_armure;
    const current_cost = base_armure_price * Math.pow(cost_multiplier, n) + cost_log_coef * Math.log(n + 1);

    //sauvegarde du compteur de armure
    if(data.current_count >= current_cost)
    {
        data.nb_armure += 1;
        data.muted_music = background_music.muted;
        data.current_count -= current_cost;

        const next_cost = base_armure_price * Math.pow(cost_multiplier, data.nb_armure) + cost_log_coef * Math.log(data.nb_armure + 1);
        data.armure_price = next_cost;

        data.cps_armure = 70 * Math.pow(data.nb_armure + 1, 1.03);  // progression plus douce du gain

        // Sauvegarde et mise à jour UI
        localStorage.setItem('user_data', JSON.stringify(data));

        nb_armure_elem.textContent = data.nb_armure;
        armure_price_elem.textContent = next_cost;
    }
});

//gère les attribut de dog
dog_upgrade.addEventListener('click', () => {
    const base_dog_price = 25000;      // coût initial plus petit
    const cost_multiplier = 1.16;    // croissance plus lente
    const cost_log_coef = 1;         // log moins impactant
    const n = data.nb_dog;
    const current_cost = base_dog_price * Math.pow(cost_multiplier, n) + cost_log_coef * Math.log(n + 1);

    //sauvegarde du compteur de dog
    if(data.current_count >= current_cost)
    {
        data.nb_dog += 1;
        data.muted_music = background_music.muted;
        data.current_count -= current_cost;

        const next_cost = base_dog_price * Math.pow(cost_multiplier, data.nb_dog) + cost_log_coef * Math.log(data.nb_dog + 1);
        data.dog_price = next_cost;

        data.cps_dog = 200 * Math.pow(data.nb_dog + 1, 1.02);  // progression plus douce du gain

        // Sauvegarde et mise à jour UI
        localStorage.setItem('user_data', JSON.stringify(data));

        nb_dog_elem.textContent = data.nb_dog;
        dog_price_elem.textContent = next_cost;
    }
});

//gère les attribut de mannequin
mannequin_upgrade.addEventListener('click', () => {
    const base_mannequin_price = 60000;      // coût initial plus petit
    const cost_multiplier = 1.17;    // croissance plus lente
    const cost_log_coef = 1;         // log moins impactant
    const n = data.nb_mannequin;
    const current_cost = base_mannequin_price * Math.pow(cost_multiplier, n) + cost_log_coef * Math.log(n + 1);

    //sauvegarde du compteur de mannequin
    if(data.current_count >= current_cost)
    {
        data.nb_mannequin += 1;
        data.muted_music = background_music.muted;
        data.current_count -= current_cost;

        const next_cost = base_mannequin_price * Math.pow(cost_multiplier, data.nb_mannequin) + cost_log_coef * Math.log(data.nb_mannequin + 1);
        data.mannequin_price = next_cost;

        data.cps_mannequin = 600 * Math.pow(data.nb_mannequin + 1, 1.01);  // progression plus douce du gain

        // Sauvegarde et mise à jour UI
        localStorage.setItem('user_data', JSON.stringify(data));

        nb_mannequin_elem.textContent = data.nb_mannequin;
        mannequin_price_elem.textContent = next_cost;
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
    data.total_tente += data.cps_tente;
    data.total_corde += data.cps_corde;
    data.total_enclume += data.cps_enclume;
    data.total_epee += data.cps_epee;
    data.total_armure += data.cps_armure;
    data.total_dog += data.cps_dog;
    data.total_mannequin += data.cps_mannequin;

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
    nb_tente_elem.textContent = data.nb_tente;
    nb_corde_elem.textContent = data.nb_corde;
    nb_enclume_elem.textContent = data.nb_enclume;
    nb_epee_elem.textContent = data.nb_epee;
    nb_armure_elem.textContent = data.nb_armure;
    nb_dog_elem.textContent = data.nb_dog;
    nb_mannequin_elem.textContent = data.nb_mannequin;


    //mise a jour de l'affichage des prix
    tools_price_elem.textContent = "prix : " + data.tools_price.toFixed(2) + " or";
    camp_price_elem.textContent = "prix : " + data.camp_price.toFixed(2) + " or";
    table_price_elem.textContent = "prix : " + data.table_price.toFixed(2) + " or";
    tente_price_elem.textContent = "prix : " + data.tente_price.toFixed(2) + " or";
    corde_price_elem.textContent = "prix : " + data.corde_price.toFixed(2) + " or";
    enclume_price_elem.textContent = "prix : " + data.enclume_price.toFixed(2) + " or";
    epee_price_elem.textContent = "prix : " + data.epee_price.toFixed(2) + " or";
    armure_price_elem.textContent = "prix : " + data.armure_price.toFixed(2) + " or";
    dog_price_elem.textContent = "prix : " + data.dog_price.toFixed(2) + " or";
    mannequin_price_elem.textContent = "prix : " + data.mannequin_price.toFixed(2) + " or";


    //maj affichage sous menu upgrade
    cps_tools_elem.textContent = "Les outils vous rapportent " + data.cps_tools.toFixed(2) + " OpS soit " + (data.cps === 0 ? 0 : (data.cps_tools * 100 / data.cps)).toFixed(2) + "%";
    total_tools_elem.textContent = "Les outils vous ont rapporté un total de " + data.total_tools.toFixed(2) + " or";
    
    cps_camp_elem.textContent = "Le feu de camp vous rapporte " + data.cps_camp.toFixed(2) + " OpS soit " + (data.cps === 0 ? 0 : (data.cps_camp * 100 / data.cps)).toFixed(2) + "%";
    total_camp_elem.textContent = "Le feu de camp vous a rapporté un total de " + data.total_camp.toFixed(2) + " or"; 
    
    cps_table_elem.textContent = "La table vous rapporte " + data.cps_table.toFixed(2) + " OpS soit " + (data.cps === 0 ? 0 : (data.cps_table * 100 / data.cps)).toFixed(2) + "%";
    total_table_elem.textContent = "La table vous a rapporté un total de " + data.total_table.toFixed(2) + " or";
    
    cps_tente_elem.textContent = "La tente vous rapporte " + data.cps_tente.toFixed(2) + " OpS soit " + (data.cps === 0 ? 0 : (data.cps_tente * 100 / data.cps)).toFixed(2) + "%";
    total_tente_elem.textContent = "La tente vous a rapporté un total de " + data.total_tente.toFixed(2) + " or";

    cps_corde_elem.textContent = "La corde vous rapporte " + data.cps_corde.toFixed(2) + " OpS soit " + (data.cps === 0 ? 0 : (data.cps_corde * 100 / data.cps)).toFixed(2) + "%";
    total_corde_elem.textContent = "La corde vous a rapporté un total de " + data.total_corde.toFixed(2) + " or";

    cps_enclume_elem.textContent = "La enclume vous rapporte " + data.cps_enclume.toFixed(2) + " OpS soit " + (data.cps === 0 ? 0 : (data.cps_enclume * 100 / data.cps)).toFixed(2) + "%";
    total_enclume_elem.textContent = "La enclume vous a rapporté un total de " + data.total_enclume.toFixed(2) + " or";

    cps_epee_elem.textContent = "La epee vous rapporte " + data.cps_epee.toFixed(2) + " OpS soit " + (data.cps === 0 ? 0 : (data.cps_epee * 100 / data.cps)).toFixed(2) + "%";
    total_epee_elem.textContent = "La epee vous a rapporté un total de " + data.total_epee.toFixed(2) + " or";

    cps_armure_elem.textContent = "La armure vous rapporte " + data.cps_armure.toFixed(2) + " OpS soit " + (data.cps === 0 ? 0 : (data.cps_armure * 100 / data.cps)).toFixed(2) + "%";
    total_armure_elem.textContent = "La armure vous a rapporté un total de " + data.total_armure.toFixed(2) + " or";

    cps_dog_elem.textContent = "La dog vous rapporte " + data.cps_dog.toFixed(2) + " OpS soit " + (data.cps === 0 ? 0 : (data.cps_dog * 100 / data.cps)).toFixed(2) + "%";
    total_dog_elem.textContent = "La dog vous a rapporté un total de " + data.total_dog.toFixed(2) + " or";

    cps_mannequin_elem.textContent = "La mannequin vous rapporte " + data.cps_mannequin.toFixed(2) + " OpS soit " + (data.cps === 0 ? 0 : (data.cps_mannequin * 100 / data.cps)).toFixed(2) + "%";
    total_mannequin_elem.textContent = "La mannequin vous a rapporté un total de " + data.total_mannequin.toFixed(2) + " or";

    if(data.total_count > data.camp_price)
    {
        camp_upgrade.style.visibility = "visible";
    }
    if(data.total_count > data.table_price)
    {
        table_upgrade.style.visibility = "visible";
        table_upgrade.style.opacity = 0.7;
    }
    if(data.total_count > data.tente_price)
    {
        tente_upgrade.style.visibility = "visible";
        tente_upgrade.style.opacity = 0.7;
    }
    if(data.total_count > data.corde_price)
    {
        corde_upgrade.style.visibility = "visible";
        corde_upgrade.style.opacity = 0.7;
    }
    if(data.total_count > data.enclume_price)
    {
        enclume_upgrade.style.visibility = "visible";
        enclume_upgrade.style.opacity = 0.7;
    }
    if(data.total_count > data.epee_price)
    {
        epee_upgrade.style.visibility = "visible";
        epee_upgrade.style.opacity = 0.7;
    }
    if(data.total_count > data.armure_price)
    {
        armure_upgrade.style.visibility = "visible";
        armure_upgrade.style.opacity = 0.7;
    }
    if(data.total_count > data.dog_price)
    {
        dog_upgrade.style.visibility = "visible";
        dog_upgrade.style.opacity = 0.7;
    }
    if(data.total_count > data.mannequin_price)
    {
        mannequin_upgrade.style.visibility = "visible";
        mannequin_upgrade.style.opacity = 0.7;
    }
}, 0);


setInterval(() => {
    data.cps = data.cps_tools + data.cps_camp + data.cps_table + data.cps_tente + data.cps_corde + data.cps_enclume + data.cps_epee + data.cps_armure + data.cps_dog + data.cps_mannequin;
    data.total_count = data.total_count + data.cps;
}, 1000);


//clic sur animations
animations_visible_elem.addEventListener("click", (e) => {
    let clic = 1+0.08*data.cps;
    data.current_count += clic;
    data.total_count = data.total_count + clic;
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