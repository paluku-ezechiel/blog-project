import "../assets/styles/styles.scss";
import "../form/form.scss";
const form = document.querySelector("form");
const errorsElement = document.querySelector("#errors");
let errors = [];

if (form) {
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(form);
      const article = Object.fromEntries(formData.entries());
      if (formIsValid(article)) {
        const json = JSON.stringify(article);
        const response = await fetch("https://restapi.fr/api/article", {
          method: "POST",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status < 299) {
          const body = await response.json();
          console.log(body);
          form.reset();
        }
      }
    } catch (error) {
      console.log("Erreur : ", e);
    }
  });
}

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
