// Charger le JSON depuis app.json
fetch('app.json')
  .then(response => response.json())
  .then(data => {
    window.questions = data;
    getRandomQuestion(); // Afficher une question au chargement
  })
  .catch(error => {
    console.error('Erreur de chargement du JSON :', error);
    document.getElementById('random-question').textContent = "Erreur : Impossible de charger les questions.";
  });

// Fonction pour générer une question aléatoire
function getRandomQuestion() {
  if (!window.questions) return;

  const categories = Object.keys(questions);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const subcategories = Object.keys(questions[randomCategory]);
  const randomSubcategory = subcategories[Math.floor(Math.random() * subcategories.length)];
  const questionList = questions[randomCategory][randomSubcategory];
  const randomQuestion = questionList[Math.floor(Math.random() * questionList.length)];

  // Afficher la question
  document.getElementById('random-question').textContent = randomQuestion;

  // Afficher le thème avec la couleur correspondante
  const themeSpan = document.getElementById('category-theme');
  themeSpan.textContent = `Thème : ${randomCategory}`;
  themeSpan.className = ''; // Réinitialiser les classes
  themeSpan.classList.add('theme-' + randomCategory.toLowerCase().replace(/é/g, 'e').replace(/ /g, '-'));
}