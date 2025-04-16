// Selecting all the elements
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const totalBalance = document.getElementById("total-balance");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const dateInput = document.getElementById("date");
const form = document.getElementById("form");
const filterInput = document.querySelectorAll("input[name='filter']");
const entries = document.getElementById("entries");
const msg = document.getElementById("msg");
const resetBtn = document.querySelector("button[type='reset']");

// Initial Values
let data = JSON.parse(localStorage.getItem("data")) || [];
let filter = "All";
let editIndex = null;

// Form Validation
const formValidation = () => {
  if (
    textInput.value === "" ||
    amountInput.value === "" ||
    typeInput.value === ""
  ) {
    msg.innerHTML = "Input Fields Cannot Be Empty 😞";
    setTimeout(() => {
      msg.innerHTML = "";
    }, 3000);
  } else {
    msg.innerHTML = "";
    addEntry();
  }
};

// Form Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

// Adding New Entry
const addEntry = () => {
  const newEntry = {
    text: textInput.value,
    amount: parseInt(amountInput.value),
    type: typeInput.value,
    date: dateInput.value || new Date().toISOString().split("T")[0],
  };
  if (editIndex !== null) {
    data[editIndex] = newEntry;
    editIndex = null;
  } else {
    data.push(newEntry);
  }
  localStorage.setItem("data", JSON.stringify(data));
  total();
  filterEntries();
  form.reset();
};

// Calculating Total
const total = () => {
  let income = 0;
  let expense = 0;

  data.forEach((item) => {
    if (item.type === "Income") {
      income += item.amount;
    } else if (item.type === "Expense") {
      expense += item.amount;
    }
  });

  const balance = income - expense;

  totalIncome.innerText = `₹ ${income}`;
  totalExpense.innerText = `₹ ${expense}`;
  totalBalance.innerText = `₹ ${balance}`;
};

// Filter
filterInput.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    if (e.target.checked) {
      filter = e.target.value;
      filterEntries();
    }
  });
});

const filterEntries = () => {
  let filteredData = data;
  if (filter === "income") {
    filteredData = data.filter((item) => item.type.toLowerCase() === "income");
  } else if (filter === "expense") {
    filteredData = data.filter((item) => item.type.toLowerCase() === "expense");
  }
  showEntries(filteredData);
};

// Displaying Entries
const showEntries = (data) => {
  entries.innerHTML = "";
  data.forEach((ele, y) => {
    return (entries.innerHTML += `
        <div id=${y} class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-4 px-4 my-4 bg-gray-300 mx-auto max-w-xl rounded-lg shadow-xl">
            <div class="flex-1 min-w-0">
                <p class="text-lg sm:text-xl break-words line-clamp-2">${ele.text}: ${ele.amount} (${ele.type})</p>
                <p class="text-sm sm:text-lg opacity-60">${ele.date}</p>
            </div>
            <div class="flex justify-end sm:justify-start gap-2">
                <button onclick="editEntries(${y})" class="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer py-2 px-4 rounded-md">Edit</button>
                <button onclick="deleteEntries(${y})" class="bg-red-500 hover:bg-red-600 text-white cursor-pointer py-2 px-4 rounded-md">Delete</button>
            </div>
        </div>
        `);
  });
};

// Reset
resetBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all entries?")) {
    localStorage.removeItem("data");
    data = [];
    filterEntries();
    total();
  }
});

// Edit
const editEntries = (e) => {
  const entry = data[e];
  textInput.value = entry.text;
  amountInput.value = entry.amount;
  typeInput.value = entry.type;
  dateInput.value = entry.date;
  editIndex = e;

  msg.innerHTML = "Editing entry ✏️";
  setTimeout(() => {
    msg.innerHTML = "";
  }, 3000);
};

// Delete
const deleteEntries = (e) => {
  data.splice(e, 1);
  localStorage.setItem("data", JSON.stringify(data));
  filterEntries();
  total();
};

// DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  total();
  filterEntries();
});
