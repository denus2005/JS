function loadHome() {
  document.getElementById("content").innerHTML = "<h2>Головна сторінка</h2>";
}

function loadCatalog() {
  fetch("data/categories.json")
    .then(response => response.json())
    .then(data => {
      let html = "<h2>Категорії</h2>";

      data.forEach(cat => {
        html += `
          <p>
            <a href="#" onclick="loadCategory('${cat.shortname}')">
              ${cat.name}
            </a>
          </p>
        `;
      });

      html += `<p><a href="#" onclick="loadRandom()">Specials</a></p>`;

      document.getElementById("content").innerHTML = html;
    })
    .catch(error => console.error("Помилка:", error));
}

function loadCategory(name) {
  fetch(`data/${name}.json`)
    .then(response => response.json())
    .then(data => {
      let html = `<h2>${data.categoryName}</h2>`;

      data.items.forEach(item => {
        html += `
          <div class="card">
            <img src="https://placehold.co/200x200">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <b>${item.price} грн</b>
          </div>
        `;
      });

      document.getElementById("content").innerHTML = html;
    })
    .catch(error => console.error("Помилка:", error));
}

function loadRandom() {
  fetch("data/categories.json")
    .then(response => response.json())
    .then(data => {
      const random = data[Math.floor(Math.random() * data.length)];
      loadCategory(random.shortname);
    });
}