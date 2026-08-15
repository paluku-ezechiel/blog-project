import "./assets/styles/styles.scss";

import "./index.scss";

const articlesContainer = document.querySelector(".articles-container");
const categoriesContainerElement = document.querySelector(".categories");

const createArticles = (articles) => {
  const articlesArray = Array.isArray(articles) ? articles : [articles];
  const articleDOM = articlesArray.map((article) => {
    return createArticleElements(article);
  });

  if (!articlesContainer) return;
  articlesContainer.replaceChildren(...articleDOM);

  const deleteButtons = articlesContainer.querySelectorAll(".btn-danger");

  const updateButtons = articlesContainer.querySelectorAll(".btn-primary");
  updateButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const articleId = event.currentTarget.dataset.id;
      if (articleId) {
        location.assign(`./form/form.html?id=${articleId}`);
      }
    });
  });
  if (deleteButtons) {
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        try {
          const articleId = event.currentTarget.dataset.id;
          const responseDel = await fetch(
            `https://restapi.fr/api/article/${articleId}`,
            {
              method: "DELETE",
            }
          );
          if (!responseDel.ok) {
            throw new Error(`Erreur HTTP (${responseDel.status})`);
          }
          const body = await responseDel.json();
          fetchArticle();
        } catch (error) {
          console.log("erreur : ", error);
        }
      });
    });
  }
};


const displayMenuCategories = (categoriesArr) => {
  const liElement = categoriesArr.map(categoryElem => {
    const li = document.createElement("li");
    li.innerHTML = `
      <li>${categoryElem[0]} ( <strong>${categoryElem[1]}</strong> )</li>
    `
    return li;
  })

  categoriesContainerElement.replaceChildren(...liElement)
}

//  ============================================
const createMenuCategories = (articles) => {
  const categories = articles.reduce((acc, article) => {
    acc[article.category] = acc[article.category]
      ? (acc[article.category] += 1)
      : 1;
    return acc;
  }, {});
  const categoriesArr = Object.keys(categories).map(category => {
    return [category, categories[category]];
  });
  displayMenuCategories(categoriesArr);
};

// ================================================

const fetchArticle = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/article");
    if (!response.ok) {
      throw new Error(`Erreur HTTP (${response.status})`);
    }
    const article = await response.json();
    createArticles(article);
    createMenuCategories(article);
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
