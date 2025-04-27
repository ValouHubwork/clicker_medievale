let data = {nb_tools : 0};
//valeur dev pour remettre a 0 data.nb_sword (ajout de bouton reset ou ascension)
localStorage.setItem('user_data', JSON.stringify(data)); 

// const user_data = JSON.parse(localStorage.getItem('user_data'));


let nb_tools_current = 0;
const tools_upgrade = document.querySelector(".tools_upgrade");


tools_upgrade.addEventListener('click', () => {
    nb_tools_current += 1;

    //sauvegarde du compteur d'épée
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    data.nb_tools = user_data.nb_tools + 1;

    localStorage.setItem('user_data', JSON.stringify(data));
    
    console.log(user_data.nb_tools);
    // console.log(nb_tools_current);
});

