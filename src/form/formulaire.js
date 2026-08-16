import "../assets/styles/styles.scss";
import "../form/form.scss";

const form = document.querySelector("form");
const errorHTMLElement = document.querySelector("#errors");
const btnCancel = document.querySelector(".btn-secondary");
let errors = [];

btnCancel.addEventListener("click", () => {
  location.assign("../index.html");
});

const formIsValid = (article) => {
  const author = article.author.trim();
  const img = article.img.trim();
  const category = article.category.trim();
  const title = article.title.trim();
  const content = article.content.trim();

  if (!author || !img || !category || !title || !content) {
    errors.push("Vous devez renseigner tous les champs");
  } else {
    errors = [];
  }

  if (content && content.length < 20) {
    errors.push("Le contenu de votre article est trop court.");
  }

  if (errors.length) {
    let errorHTML = "";
    errors.forEach((e) => {
      errorHTML += `<li>${e}</li>`;
    });
    errorHTMLElement.innerHTML = errorHTML;
    return false;
  } else {
    errorHTMLElement.innerHTML = "";
    return true;
  }
};

const initForm = async () => {

}

initForm();

if (form) {
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const formDate = new FormData(form);
      const article = Object.fromEntries(formDate.entries());
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
          location.assign("../index.html");
        }
      }
    } catch (error) {
      console.log("Erreur :", error);
    }
  });
}
