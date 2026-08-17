import "./assets/styles/styles.scss";
import "./index.scss";

const articleContainer = document.querySelector(".articles-container");
const categoriesContainerElement = document.querySelector(".categories");
const selectElement = document.querySelector("select");
let filtrer;
let articles;
let sortBy = "desc";
selectElement.addEventListener("change", () => {
  sortBy = selectElement.value;
  fetchArticles();
});

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

const createArticles = () => {
  const articlesArr = Array.isArray(articles) ? articles : [articles];
  const articleDOM = articlesArr
    .filter((article) => {
      if (filtrer) {
        return article.category === filtrer;
      } else {
        return true;
      }
    })
    .map((article) => {
      return createArticleElement(article);
    });

  if (!articleContainer) return;
  articleContainer.replaceChildren(...articleDOM);

  const updateArticles = articleContainer.querySelectorAll(".btn-primary");
  updateArticles.forEach((button) => {
    button.addEventListener("click", (event) => {
      const articleId = event.currentTarget.dataset.id;
      location.assign(`./form/form.html?id=${articleId}`);
    });
  });

  const deleteArticles = articleContainer.querySelectorAll(".btn-danger");
  deleteArticles.forEach((button) => {
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
          fetchArticles();
        }
      } catch (error) {
        console.log("Erreur :", error);
      }
    });
  });
};

const displayArticles = (categoriesArr) => {
  const liElement = categoriesArr.map((categoryElement) => {
    const li = document.createElement("li");
    li.innerHTML = `${categoryElement[0]} ( <strong>${categoryElement[1]}</strong>)`;
    if (categoryElement[0] === filtrer) {
      li.classList.add("active");
    }
    li.addEventListener("click", () => {
      if (filtrer === categoryElement[0]) {
        filtrer = null;
        li.classList.remove("active");
        createArticles();
      } else {
        filtrer = categoryElement[0];
        liElement.forEach((li) => {
          li.classList.remove("active");
        });
        li.classList.add("active");
        createArticles();
      }
    });
    return li;
  });
  categoriesContainerElement.replaceChildren(...liElement);
};

const createMenuCategories = () => {
  const categories = articles.reduce((acc, curr) => {
    if (acc[curr.category]) {
      acc[curr.category]++;
    } else {
      acc[curr.category] = 1;
    }
    return acc;
  }, {});
  const categoriesArr = Object.keys(categories)
    .map((category) => {
      return [category, categories[category]];
    })
    .sort((c1, c2) => c1[0].localeCompare(c2[0]));
  displayArticles(categoriesArr);
};

const fetchArticles = async () => {
  try {
    const response = await fetch(
      `https://restapi.fr/api/article?sort=createdAt:${sortBy}`
    );
    if (!response.ok) {
      throw new Error(`Erreur HTTP: (${response.status})`);
    }

    articles = await response.json();
    // console.log(articles);
    createArticles();
    createMenuCategories();
  } catch (error) {
    console.log("Erreur :", error);
  }
};

fetchArticles();
