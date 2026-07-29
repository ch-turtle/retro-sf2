async function loadArticles() {
    const response = await fetch('data/articles.json');
    const data = await response.json();
    const news = document.getElementById('news-container');
    const sport = document.getElementById('sport-container');
    news.innerHTML = '';
    sport.innerHTML = '';
    data.news.forEach(article => {
        news.innerHTML += ` <div class="news-item"> <a href="${article.url}" target="_blank">${article.title}</a> <div class="news-summary">${article.summary}</div> <div class="news-date">${article.date}</div> </div> `;
    });
    data.sport.forEach(article => {
        sport.innerHTML += ` <div class="news-item"> <a href="${article.url}" target="_blank">${article.title}</a> <div class="news-date">${article.date}</div> </div> `;
    });
}
loadArticles();