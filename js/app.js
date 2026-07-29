function loadNews() {
    fetch("/data/news.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load news.json");
            }
            
            return response.json();
        })
        .then(news => {
            const container = document.getElementById("news-container");

            news.slice(0, 5).forEach(article => {
                const item = document.createElement("div");
                item.classList.add("news-item");

                const date = new Date(article.pubDate);

                const time = date.toLocaleTimeString("de-CH", {
                    hour: "2-digit",
                    minute: "2-digit"
                });

                item.innerHTML = `
                    <div class="news-time">${time}</div>
                    <a href="${article.link}" target="_blank">
                        ${article.title}
                    </a>
                `;

                container.appendChild(item);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

function loadSport() {
    fetch("/data/sport.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load sport.json");
            }
            
            return response.json();
        })
        .then(sport => {
            const container = document.getElementById("sport-container");

            // display first 8 sport headlines
            sport.slice(0, 8).forEach(article => {
                const item = document.createElement("div");
                item.classList.add("sport-item");

                const date = new Date(article.pubDate);

                const time = date.toLocaleTimeString("de-CH", {
                    hour: "2-digit",
                    minute: "2-digit"
                });

                item.innerHTML = `
                    <span class="sport-time">${time}</span>
                    <a href="${article.link}" target="_blank">
                        ${article.title}
                    </a>
                `;

                container.appendChild(item);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

function loadWeather() {
    fetch("/data/wetter.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load wetter.json");
            }
            return response.json();
        })
        .then(weather => {
            const container = document.getElementById("weather-container");

            const table = document.createElement("table");
            table.classList.add("weather-table");

            weather.forEach(day => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td class="weather-day">
                        ${day.titleShort.de}
                    </td>

                    <td class="weather-icon">
                        <img src="images/weather/${day.locations.symbolCode}.gif"
                             alt="Weather">
                    </td>

                    <td class="weather-temp">
                        ${day.locations.tmax}°<br>
                        <span>${day.locations.tmin}°</span>
                    </td>
                `;

                table.appendChild(row);
            });

            container.appendChild(table);
        })
        .catch(error => {
            console.error(error);
        });
}

function loadTVGuide() {
    fetch("/data/tv_guide.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load tv_guide.json");
            }
            return response.json();
        })
        .then(data => {

            const now = new Date();

            const sf1 = document.getElementById("sf1-container");
            const sf2 = document.getElementById("sf2-container");

            const channels = data.channels || data;

            channels.forEach(channel => {

                const programs = channel.programList
                    .filter(program => {
                        return new Date(program.startTime) >= now;
                    })
                    .slice(0, 2);


                let container;

                if (channel.title === "SRF 1") {
                    container = sf1;
                }

                if (channel.title === "SRF 2") {
                    container = sf2;
                }

                if (!container) return;


                programs.forEach(program => {

                    const start = new Date(program.startTime);

                    const time = start.toLocaleTimeString("de-CH", {
                        hour: "2-digit",
                        minute: "2-digit"
                    });


                    const li = document.createElement("li");

                    li.innerHTML = `
                        <span class="tv-time">${time}</span>
                        ${program.title}
                    `;

                    container.appendChild(li);

                });

            });

        })
        .catch(error => {
            console.error(error);
        });
}
