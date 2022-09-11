function delRow() {
  const tbl = document.getElementById("tbl").lastChild;
  const n = tbl.children.length;

  if (n > 1) {
    for (let i = 1; i < n; i++) {
      const el = tbl.children[i];
      el.firstChild.innerText = `${i}`;
    }
  }
}

function addRow(txt) {
  const tbl = document.getElementById("tbl").lastChild;
  const n = Number(tbl.children[tbl.children.length - 1].id.split("_")[1]) + 1;

  const row = document.createElement("tr");
  row.id = `tr_${n}`;
  const temp = txt.split("//")[1];

  const linkurl = `<a href="${txt}" target="_blank">${temp}</a>`;
  const delbut = `<button id="delbut_${n}">Delete</button>`;

  row.innerHTML = `<td>${tbl.children.length}</td><td>${linkurl}</td><td>${delbut}</td>`;
  tbl.appendChild(row);

  const db = document.getElementById(`delbut_${n}`);
  db.addEventListener("click", () => {
    row.remove();
    delRow();
  });
}

const add_button = document.getElementById("add");
add_button.addEventListener("click", () => {
  const area = document.getElementById("input_area");
  const txt = area.value;
  const pattern = new RegExp("^http[s]{0,1}://.*?..*?");
  if (txt && pattern.test(txt)) {
    addRow(txt);
    area.value = "";
  } else {
    alert("Неверный юрл");
  }
});

document.addEventListener("keydown", function (event) {
  const area = document.getElementById("input_area");
  const txt = area.value;
  const pattern = new RegExp("^http[s]{0,1}://.*?..*?");
  if (event.code == "Enter") {
    if (txt && pattern.test(txt)) {
      addRow(txt);
      area.value = "";
    } else {
      alert("Неверный юрл");
    }
  }
});

const dict = {
  0: "https://yandex.ru/",
  // 1: "https://google.ru/",
  // 2: "https://yahoo.com/",
  // 3: "https://opera.ru/",
  // 4: "https://youtube.ru/",
};
for (let j = 0; j < 1; j++) {
  const area = document.getElementById("input_area");
  area.value = dict[j];
  console.log(area.value);
  add_button.click();
}

const open_button = document.getElementById("open");
let opened = {};
open_button.addEventListener("click", () => {
  const tbl = document.getElementById("tbl");
  const tbody = tbl.lastChild.children;
  const n = tbody.length;
  for (let j = 1; j < n; j++) {
    const url = String(tbody[j].children[1].innerHTML.split('"')[1]);
    if (!opened[url]) {
      const mywind = window.open(url);
      opened[url] = mywind;
    }
  }
  console.log(opened);
  // chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_CURRENT }, (tabs) => {
  //   chrome.tabs.move(tabs[3].id, { index: 0 });
  // });
});

let flag = false;
document.addEventListener("keydown", function (event) {
  if (event.code == "KeyD") {
    flag = true;
  } else if (flag && event.code == "KeyF") {
    open_button.click();
    flag = false;
  } else {
    flag = false;
  }
});

const close_button = document.getElementById("close");
close_button.addEventListener("click", () => {
  chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_CURRENT }, (tabs) => {
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].url === "https://yandex.ru/") {
        chrome.tabs.remove(tabs[i].id);
      }
    }
  });
});

let flag1 = false;
document.addEventListener("keydown", function (event) {
  if (event.code == "KeyD") {
    flag1 = true;
  } else if (flag1 && event.code == "KeyG") {
    close_button.click();
    flag1 = false;
  } else {
    flag1 = false;
  }
});
