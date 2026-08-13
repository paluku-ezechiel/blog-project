import "./assets/styles/styles.scss";
import "./index.scss";

const articlesContainer = document.querySelector(".articles-container");

const createArticles = (articles) => {
  const articlesArray = Array.isArray(articles) ? articles : [articles];
  const articleDOM = articlesArray.map((article) => {
    return createArticleElements(article);
  });

  if (!articlesContainer) return;
  articlesContainer.replaceChildren(...articleDOM);
  const deleteButtons = articlesContainer.querySelectorAll(".btn-danger");
  if (deleteButtons) {
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        try {
          const articleId = event.currentTarget.dataset.id;
          const responseDel = await fetch(`https://restapi.fr/api/article/${articleId}`, {
              method: "DELETE",
            }
          );
          if(!responseDel.ok){
              throw new Error(`Erreur HTTP (${response.status})`);
          }
          const body = await responseDel.json();
          fetchArticle(body);
        } catch (error) {
            console.log('e : ', e);
        }
      });
    });
  }
};

const fetchArticle = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/article");
    if (!response.ok) {
      throw new Error(`Erreur HTTP (${response.status})`);
    }
    const article = await response.json();
    createArticles(article);
  } catch (error) {
    console.log(`erreur ${error}`);
  }
};

const createArticleElements = (article) => {
  const articleDiv = document.createElement("article");
  articleDiv.classList.add("article");

  const img = document.createElement("img");
  img.src = `${article.img}`;
  img.alt = `${article.author}`;

  const articleTitle = document.createElement("h2");
  articleTitle.classList.add("article-title");
  articleTitle.textContent = `${article.title}`;

  const articleAuthor = document.createElement("p");
  articleAuthor.classList.add("article-author");
  articleAuthor.textContent = `${article.author} - ${article.category}`;

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
  articleDiv.append(
    img,
    articleTitle,
    articleAuthor,
    articleContent,
    articleActions
  );
  articleActions.append(btnDanger, btnPrimary);

  return articleDiv;
};

fetchArticle();
