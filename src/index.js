import "./assets/styles/styles.scss";
import "./index.scss";

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

fetchArticle();
