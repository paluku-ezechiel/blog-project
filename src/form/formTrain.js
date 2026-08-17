import "../assets/styles/styles.scss";
import "../form/form.scss";
const form = document.querySelector("form");
const errorsElement = document.querySelector("#errors");
let errors = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  formIsValid(article);
});

const formIsValid = (article) => {
  errors = [];
  const author = article.author.trim();
  const img = article.img.trim();
  const category = article.category.trim();
  const title = article.title.trim();
  const content = article.content.trim();

  if (!author || !img || !category || !title || !content) {
    errors.push("Vous devez renseignez tous les champs");
  } else {
    errors = [];
  }

  if (content && content.lenght < 20) {
    errors.push("Le contenu de votre article est trop court.");
  }

  if (errors.length) {
    let errorHTML = "";
    errors.forEach((e) => {
      errorHTML += `<li>${e}</li>`;
    });
    errorsElement.innerHTML = errorHTML;
    return false;
  } else {
    errorsElement.innerHTML = "";
    return true;
  }
};
