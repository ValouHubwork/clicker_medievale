let data = {nb_tools : 0};
//valeur dev pour remettre a 0 data.nb_sword (ajout de bouton reset ou ascension)
localStorage.setItem('user_data', JSON.stringify(data));

// const user_data = JSON.parse(localStorage.getItem('user_data'));

//journale de quête
const quest_journal_elem = document.querySelector(".quest_journal");
let data_quest_journal = [
    "quete1",
    "quete2",
    "quete3",
    "quete4"
];
let data_quest_passed = []; //enlève les quete déjà passé

//var outils de base
const tools_upgrade = document.querySelector(".tools_upgrade");
const tools_price_elem = document.querySelector(".tools_price");
const nb_tools_elem = document.querySelector(".nb_tools");
let nb_tools_current = 0;


tools_upgrade.addEventListener('click', () => {
    nb_tools_current += 1;

    //sauvegarde du compteur d'épée
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    data.nb_tools = user_data.nb_tools + 1;
    localStorage.setItem('user_data', JSON.stringify(data));
    
    nb_tools_elem.textContent = nb_tools_current;
    console.log(user_data.nb_tools);
    // console.log(nb_tools_current);
});

window.setInterval( () => {
    if(data_quest_passed.length === data_quest_journal.length)
    {
        console.log("reset");
        data_quest_passed.length = 0;
    }

    let quest_ok = false;
    random_quest = Math.floor(Math.random()*data_quest_journal.length); 

    if (data_quest_passed.length == 0) 
    {
        quest_ok = true;
    }
    else 
    {
        let found = false; // Ajoute une variable pour savoir si tu as trouvé un doublon
        while (!found) {
            for (let i = 0; i < data_quest_passed.length; i++) {
                if (random_quest === data_quest_passed[i]) {
                    quest_ok = false;
                    random_quest = Math.floor(Math.random() * data_quest_journal.length); // Générer un nouveau random_quest
                    break; // Sort de la boucle for
                } else {
                    quest_ok = true;
                }
            }
            if (quest_ok) found = true; // Si quest_ok est true, on a trouvé une valeur unique, donc on sort de la boucle while
        }
    }

    if(quest_ok)
        console.log(data_quest_journal[random_quest]);
        data_quest_passed.push(random_quest);

}, 1000);