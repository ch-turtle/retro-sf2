function loadNews() {
    fetch("data/news.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load news.json");
            }

            return response.json();
        })
        .then(news => {
            const container = document.getElementById("news-container");

            news.slice(0, 8).forEach(article => {
                const date = new Date(article.pubDate);
                const time = date.toLocaleTimeString("de-CH", {
                    hour: "2-digit",
                    minute: "2-digit"
                });
                let table = container.querySelector("table");

                if (!table) {
                    table = document.createElement("table");
                    table.classList.add("ticker-table");
                    container.appendChild(table);
                }

                const row = document.createElement("tr");

                row.innerHTML = `
    <td class="ticker-time">${time}</td>
    <td class="ticker-title">
        <a href="${article.link}" target="_blank">
            ${article.title}
        </a>
    </td>
`;

                table.appendChild(row);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

function loadSport() {
    fetch("data/sport.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load sport.json");
            }

            return response.json();
        })
        .then(sport => {
            const container = document.getElementById("sport-container");

            // display first 8 sport headlines
            sport.slice(0, 4).forEach(article => {
                const date = new Date(article.pubDate);
                const time = date.toLocaleTimeString("de-CH", {
                    hour: "2-digit",
                    minute: "2-digit"
                });

                let table = container.querySelector("table");

                if (!table) {
                    table = document.createElement("table");
                    table.classList.add("ticker-table");
                    container.appendChild(table);
                }

                const row = document.createElement("tr");

                row.innerHTML = `
    <td class="ticker-time">${time}</td>
    <td class="ticker-title">
        <a href="${article.link}" target="_blank">
            ${article.title}
        </a>
    </td>
`;

                table.appendChild(row);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

function loadWeather() {
    fetch("data/wetter.json")
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

            const iconRow = document.createElement("tr");
            const dayRow = document.createElement("tr");
            const tempRow = document.createElement("tr");
            const minRow = document.createElement("tr");


            weather.forEach(day => {

                const symbol = day.locations.symbolCode;

                iconRow.innerHTML += `
                    <td>
                        <img src="images/weather/${symbol}.gif" 
                             alt="Weather">
                    </td>
                `;

                dayRow.innerHTML += `
                    <td class="weather-day">
                        ${day.titleShort.de}
                    </td>
                `;

            });


            table.appendChild(iconRow);
            table.appendChild(dayRow);
            container.appendChild(table);

        })
        .catch(error => {
            console.error(error);
        });
}

function loadTVGuide() {
    fetch("data/tv_guide.json")
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

            data.forEach(channelData => {

                const channelTitle = channelData.channel.title;

                let container;

                if (channelTitle === "SRF 1") {
                    container = sf1;
                }

                if (channelTitle === "SRF zwei") {
                    container = sf2;
                }

                if (!container) return;


                const programs = channelData.programList
                    .filter(program => {
                        const start = new Date(program.startTime);
                        const end = new Date(program.endTime);

                        // keep currently running + upcoming programs
                        return end >= now;
                    })
                    .slice(0, 2);


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
            console.error("TV Guide error:", error);
        });
}