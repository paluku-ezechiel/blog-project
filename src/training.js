import "./assets/styles/styles.scss";
import "./index.scss";

const articleContainer = document.querySelector(".articles-container");

const createArticleElement = (article) => {
  const articleDiv = document.createElement("article");
  articleDiv.classList.add("article");

  const img = document.createElement("img");
  img.src = `${article.img}`;
  img.alt = `${article.category}`;

  const h2 = document.createElement("h2");
  h2.classList.add("article-title");
  h2.textContent = `${article.title}`;

  const articleAuthor = document.createElement("p");
  articleAuthor.classList.add("article-author");
  articleAuthor.textContent = `${article.author} - ${new Date(
    article.createdAt
  ).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;

  const articleContent = document.createElement("p");
  articleContent.classList.add("article-content");
  articleContent.textContent = `${article.content}`;

  const articleActions = document.createElement("div");
  articleActions.classList.add("article-actions");

  const btnDanger = document.createElement("button");
  btnDanger.type = "button";
  btnDanger.classList.add("btn", "btn-danger");
  btnDanger.textContent = "Supprimer";
  btnDanger.setAttribute("data-id", `${article._id}`);

  const btnPrimary = document.createElement("button");
  btnPrimary.type = "button";
  btnPrimary.classList.add("btn", "btn-primary");
  btnPrimary.textContent = "Modifier";
  btnPrimary.setAttribute("data-id", `${article._id}`);

  articleActions.append(btnDanger, btnPrimary);
  articleDiv.append(img, h2, articleAuthor, articleContent, articleActions);

  return articleDiv;
};

const createArticles = (articles) => {
  const articlesArr = Array.isArray(articles) ? articles : [articles];
  const articleDOM = articlesArr.map((article) => {
    return createArticleElement(article);
  });

  if (!articleContainer) return;
  articleContainer.replaceChildren(...articleDOM);

  const updateArticle = articleContainer.querySelectorAll(".btn-primary");
  updateArticle.forEach((button) => {
    button.addEventListener("click", (event) => {
      const articleId = event.currentTarget.dataset.id;
      if (articleId) {
        location.assign(`./form/form.html?id=${articleId}`);
      }
    });
  });

  const deleteArticle = articleContainer.querySelectorAll(".btn-danger");
  deleteArticle.forEach((button) => {
    button.addEventListener("click", async (event) => {
      try {
        const articleId = event.currentTarget.dataset.id;
        if (articleId) {
          const response = await fetch(
            `https://restapi.fr/api/article/${articleId}`,
            {
              method: "DELETE",
            }
          );
          if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
          }
          const body = await response.json();
          fetchAllArticles();
        }
      } catch (e) {
        console.log("Erreur : ", e);
      }
    });
  });
};

const fetchAllArticles = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/article");
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const articles = await response.json();
    createArticles(articles);
  } catch (error) {
    console.log("Erreur : ", error);
  }
};

fetchAllArticles();
