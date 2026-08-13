import "./assets/styles/styles.scss";
import "./index.scss";

const createArticles = (articles) => {
  const articleDOM = articles.map((article) => {
    return createArticleElements(article);
  });
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

{
  /* <div class="articles-container">
          <article class="article">
            <img
              src="https://randomuser.me/api/portraits/men/73.jpg"
              alt="Portrait de l’auteur de l’article"
              width="128"
              height="128"
              loading="lazy"
              decoding="async"
            />
            <h2 class="article-title">Titre de l’article</h2>
            <p class="article-author">Auteur de l’article</p>
            <p class="article-content">
              Napoléon Ier, né le 15 août 1769 à Ajaccio et mort le 5 mai 1821
              sur l’île Sainte-Hélène, est le premier empereur des Français, du
              18 mai 1804 au 6 avril 1814 et du 20 mars 1815 au 22 juin 1815.
              Second enfant de Charles Bonaparte et Letizia Ramolino, Napoléon
              Bonaparte est un militaire, général dans les armées de la Première
              République française, née de la Révolution, commandant en chef de
              l’armée d’Italie puis de l’armée d’Orient. Arrivé au pouvoir en
              1799 par le coup d’État du 18 Brumaire, il est Premier consul
              jusqu’au 2 août 1802, puis consul à vie jusqu’au 18 mai 1804, date
              à laquelle il est proclamé empereur des Français par un
              sénatus-consulte suivi d’un plébiscite. Il est sacré empereur, en
              la cathédrale Notre-Dame de Paris, le 2 décembre 1804, par le pape
              Pie VII. Son épouse, l’impératrice Joséphine de Beauharnais, est
              également sacrée. En tant que général en chef et chef d’État,
              Napoléon tente de briser les coalitions montées et financées par
              le royaume de Grande-Bretagne et qui rassemblent, à partir de
              1792, les monarchies européennes contre la France et son régime né
              de la Révolution. Il conduit les armées françaises d’Italie au Nil
              et d’Autriche à la Prusse et à la Pologne : les nombreuses et
              brillantes victoires de Bonaparte (Arcole, Rivoli, Pyramides,
              Marengo, Austerlitz, Iéna, Friedland), dans des campagnes
              militaires rapides, disloquent les quatre premières coalitions.
              Les paix successives, qui mettent un terme à chacune de ces
              coalitions, renforcent la France et donnent à Napoléon un degré de
              puissance jusqu’alors rarement égalé en Europe, lors de la paix de
              Tilsit (1807).
            </p>
            <div class="article-actions">
              <button type="button" class="btn btn-danger">Supprimer</button>
              <button type="button" class="btn btn-primary">Modifier</button>
            </div>
          </article>
        </div> */
}

const createArticleElements = (article) => {
  const articleContainer = document.createElement("div");
  articleContainer.classList.add("articles-container");

  const articleDiv = document.createElement("article");
  articleDiv.classList.add("article");

  const img = document.createElement("img");
  img.src = "https://randomuser.me/api/portraits/men/73.jpg";
  img.alt = "Portrait de l’auteur de l’article";
  img.style.width = "128px";
  img.style.width = "128px";
  img.setAttribute("loading", "lazy");
  img.setAttribute("decoding", "async");

  const articleTitle = document.createElement("h2");
  articleTitle.classList.add("article-title");
  articleTitle.textContent = "Titre de l’article";

  const articleAuthor = document.createElement("p");
  articleAuthor.classList.add("article-author");
  articleAuthor.textContent = "Auteur de l’article";

  const articleContent = document.createElement("p");
  articleContent.classList.add("article-content");
  articleContent.textContent = `Napoléon Ier, né le 15 août 1769 à Ajaccio et mort le 5 mai 1821
  sur l’île Sainte-Hélène, est le premier empereur des Français, du
  18 mai 1804 au 6 avril 1814 et du 20 mars 1815 au 22 juin 1815.
  Second enfant de Charles Bonaparte et Letizia Ramolino, Napoléon
  Bonaparte est un militaire, général dans les armées de la Première
  République française, née de la Révolution, commandant en chef de
  l’armée d’Italie puis de l’armée d’Orient. Arrivé au pouvoir en
  1799 par le coup d’État du 18 Brumaire, il est Premier consul
  jusqu’au 2 août 1802, puis consul à vie jusqu’au 18 mai 1804, date
  à laquelle il est proclamé empereur des Français par un
  sénatus-consulte suivi d’un plébiscite. Il est sacré empereur, en
  la cathédrale Notre-Dame de Paris, le 2 décembre 1804, par le pape
  Pie VII. Son épouse, l’impératrice Joséphine de Beauharnais, est
  également sacrée. En tant que général en chef et chef d’État,
  Napoléon tente de briser les coalitions montées et financées par
  le royaume de Grande-Bretagne et qui rassemblent, à partir de
  1792, les monarchies européennes contre la France et son régime né
  de la Révolution. Il conduit les armées françaises d’Italie au Nil
  et d’Autriche à la Prusse et à la Pologne : les nombreuses et
  brillantes victoires de Bonaparte (Arcole, Rivoli, Pyramides,
  Marengo, Austerlitz, Iéna, Friedland), dans des campagnes
  militaires rapides, disloquent les quatre premières coalitions.
  Les paix successives, qui mettent un terme à chacune de ces
  coalitions, renforcent la France et donnent à Napoléon un degré de
  puissance jusqu’alors rarement égalé en Europe, lors de la paix de
  Tilsit (1807).`;
  const articleActions = document.createElement("div");
  articleActions.classList.add("article-actions");

  const btnDanger = document.createElement("button");
  

};

fetchArticle();
