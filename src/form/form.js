import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorsElement = document.querySelector("#errors");

const formIsValid = (article) => {
  let errors = [];
  const author = article.author.trim();
  const category = article.category.trim();
  const content = article.content.trim();
  if (!author || !category || !content) {
    errors.push("Vous devez renseigner tous les champs");
  }

  if (content && content.length < 20) {
    errors.push("Le contenu de votre article est trop court.");
  }

  if (errors.length) {
    let errorHtml = "";
    errors.forEach((e) => {
      errorHtml += `<li>${e}</li>`;
    });
    errorsElement.innerHTML = errorHtml;
    return false;
  } else {
    errorsElement.innerHTML = "";
    return true;
  }
};

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(form);
      const article = Object.fromEntries(formData.entries());
      if (formIsValid(article)) {
        const body = JSON.stringify(article);
        const response = await fetch("https://restapi.fr/api/article", {
          method: "POST",
          body: body,
          headers: {
            "Content-type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`La création à échouer (${response.status})`);
        }
        const saveArticle = await response.json();
        console.log(saveArticle);
        form.reset();
      }
    } catch (e) {
      console.log(`Erreur ${e}`);
    }
  });
}
