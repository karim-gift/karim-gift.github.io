document.addEventListener("DOMContentLoaded", () => {
    let config;
    let currentPage = "welcome";
  
    // Charger la configuration JSON
    fetch("config.json")
      .then(response => response.json())
      .then(data => {
        config = data.pages.reduce((acc, page) => {
          acc[page.id] = page;
          return acc;
        }, {});
        loadPage(currentPage);
      });
  
    function loadPage(pageId) {
      const page = config[pageId];
      const container = document.getElementById("game-container");
      container.innerHTML = ""; // Effacer le contenu précédent
  
      // Afficher une image
      if (page.image) {
        const img = document.createElement("img");
        img.src = page.image;
        img.alt = "Illustration";
        container.appendChild(img);
      }
  
      // Afficher le texte
      if (page.text) {
        const text = document.createElement("p");
        text.textContent = page.text;
        container.appendChild(text);
      }
  
      // Lancer un MP3
      if (page.mp3) {
        const audio = new Audio(page.mp3);
        audio.play();
      }
  
      // Afficher un champ d'entrée si nécessaire
      if (page.input_placeholder) {
        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = page.input_placeholder;
        input.id = "user-input";
        container.appendChild(input);
      }
  
      // Ajouter un bouton
      const button = document.createElement("button");
      button.textContent = page.button_text;
      container.appendChild(button);
  
      // Gérer le clic du bouton
      button.addEventListener("click", () => {
        if (page.correct_answer !== undefined) {
          const userInput = parseInt(document.getElementById("user-input").value, 10);
          if (userInput === page.correct_answer) {
            alert("Bonne réponse !");
            loadPage(page.next_page);
          } else {
            alert("Mauvaise réponse, réessaie !");
          }
        } else {
          loadPage(page.next_page);
        }
      });
    }
  });
  