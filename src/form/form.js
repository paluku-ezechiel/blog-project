import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorsElement = document.querySelector("#errors");
const btnCancel = document.querySelector(".btn-secondary");
let articleId;
let errors = [];

const fillForm = (article) => {
  const author = document.querySelector("input[name='author']");
  const img = document.querySelector("input[name='img']");
  const category = document.querySelector("input[name='category']");
  const title = document.querySelector("input[name='title']");
  const content = document.querySelector("textarea");
  author.value = article.author || "";
  img.value = article.img || "";
  category.value = article.category || "";
  title.value = article.title || "";
  content.value = article.content || "";
};

const initForm = async () => {
  const params = new URL(location.href);
  articleId = params.searchParams.get("id");
  if (articleId) {
    const response = await fetch(`https://restapi.fr/api/article/${articleId}`);
    if (response.status < 300) {
      const article = await response.json();
      fillForm(article);
    }
  }
};

initForm();

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
        let response;
        if (articleId) {
          response = await fetch(
            `https://restapi.fr/api/article/${articleId}`,
            {
              method: "PATCH",
              body: body,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          response = await fetch("https://restapi.fr/api/article", {
            method: "POST",
            body: body,
            headers: {
              "Content-type": "application/json",
            },
          });
        }
        if (response.status < 299) {
          location.assign("../index.html");
        }
      }
    } catch (e) {
      console.log(`Erreur ${e}`);
    }
  });
}
