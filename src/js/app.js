const dataInitial = [
  {
    id: 26,
    title: "Побег из Шоушенка",
    imdb: 9.3,
    year: 1994,
  },
  {
    id: 25,
    title: "Крёстный отец",
    imdb: 9.2,
    year: 1972,
  },
  {
    id: 27,
    title: "Крёстный отец 2",
    imdb: 9.0,
    year: 1974,
  },
  {
    id: 1047,
    title: "Тёмный рыцарь",
    imdb: 9.0,
    year: 2008,
  },
  {
    id: 223,
    title: "Криминальное чтиво",
    imdb: 8.9,
    year: 1994,
  },
];
const thead = document.getElementById("thead");
const tbody = document.getElementById("tbody");

function compareFunc(field, flag) {
  if (flag) {
    switch (field) {
      case "id":
      case "year":
      case "imdb":
        return (a, b) => (+a[field] > +b[field] ? 1 : -1);
      case "title":
        return (a, b) => (a[field] > b[field] ? 1 : -1);
      default:
        break;
    }
  } else {
    switch (field) {
      case "id":
      case "year":
      case "imdb":
        return (a, b) => (+a[field] < +b[field] ? 1 : -1);
      case "title":
        return (a, b) => (a[field] < b[field] ? 1 : -1);
      default:
        break;
    }
  }
}

function draw(data, flag = true, field = "id") {
  const arrow = flag ? "↑" : "↓";
  thead.innerHTML = `
  <tr>
    <th class="col">id</th>
    <th class="col">Title</th>
    <th class="col">Year</th>
    <th class="col">IMDB</th>
  </tr>
  `;
  thead.querySelectorAll(".col").forEach((it) => {
    if (it.textContent.toLowerCase() === field) {
      it.textContent += arrow;
    }
  });
  tbody.innerHTML = "";
  data.forEach((item) => {
    const elTr = document.createElement("tr");
    elTr.classList.add("row");
    elTr.dataset.id = item.id;
    elTr.dataset.title = item.title;
    elTr.dataset.year = item.year;
    elTr.dataset.imdb = item.imdb;
    tbody.append(elTr);

    const elTd1 = document.createElement("td");
    elTd1.textContent = item.id;
    elTr.append(elTd1);

    const elTd2 = document.createElement("td");
    elTd2.textContent = item.title;
    elTr.append(elTd2);

    const elTd3 = document.createElement("td");
    elTd3.textContent = item.year;
    elTr.append(elTd3);

    const elTd4 = document.createElement("td");
    elTd4.textContent = ((+item.imdb * 100) / 100).toFixed(2);
    elTr.append(elTd4);
  });
}

draw(dataInitial);
const dataFromDom = [];
const arrTr = document.querySelectorAll(".row");
arrTr.forEach((item) => {
  dataFromDom.push({ ...item.dataset });
});

let i = 0;
const rez = {};
let directionSort = true;
const allFields = Object.keys(dataFromDom[1]);

function sortedData() {
  rez.arr = [...dataFromDom.sort(compareFunc(allFields[i], directionSort))];
  rez.flag = directionSort;
  rez.field = allFields[i];
  directionSort = !directionSort;
  if (directionSort) {
    i = i === allFields.length - 1 ? 0 : i + 1;
  }
  return rez;
}

setInterval(() => {
  const { arr, field, flag } = sortedData();
  draw(arr, flag, field);
}, 3000);
