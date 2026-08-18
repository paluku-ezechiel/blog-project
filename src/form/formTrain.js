import "../assets/styles/styles.scss";
import "../form/form.scss";
const form = document.querySelector("form");
const errorsElement = document.querySelector("#errors");
let errors = [];
let articleId;
let response;

const fillForm = (articles) => {
  const author = document.querySelector("input[name='author']");
  const img = document.querySelector("input[name='img']");
  const category = document.querySelector("input[name='category']");
  const title = document.querySelector("input[name='title']");
  const content = document.querySelector("textarea");

  author.value = articles.author || "";
  img.value = articles.img || "";
  category.value = articles.category || "";
  title.value = articles.title;
  content.value = articles.content || "";
};

const initForm = async () => {
  const param = new URL(location.href);
  articleId = param.searchParams.get("id");
  if (articleId) {
    response = await fetch(`https://restapi.fr/api/article/${articleId}`);
    if (response.status < 300) {
      const articles = await response.json();
      fillForm(articles);
    }
  }
};

initForm();

if (form) {
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(form);
      const article = Object.fromEntries(formData.entries());
      if (formIsValid(article)) {
        const json = JSON.stringify(article);
        if (articleId) {
          response = await fetch(
            `https://restapi.fr/api/article/${articleId}`,
            {
              method: "PATCH",
              body: json,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          response = await fetch("https://restapi.fr/api/article", {
            method: "POST",
            body: json,
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
        if (response.status < 299) {
          location.assign("../index.html");
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
