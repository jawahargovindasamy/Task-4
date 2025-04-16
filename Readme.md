# Expense Tracker

A simple expense tracker application built using HTML, CSS, and JavaScript.

## Features

- Add new expense/income entries
- Edit existing entries
- Delete entries
- Filter entries by type (income/expense)
- Calculate total income, total expense, and total balance

## How to use

1. Clone the repository
2. Open the index.html file in a web browser
3. Add new entries by filling in the form and clicking the "Add Transaction" button
4. Edit existing entries by clicking on the "Edit" button next to the entry
5. Delete entries by clicking on the "Delete" button next to the entry
6. Filter entries by type (income/expense) by clicking on the corresponding radio button
7. See the total income, total expense, and total balance at the top of the page


## How it works

The application uses the LocalStorage API to store the data. When the user adds a new entry, the data is stored in LocalStorage. When the user edits or deletes an entry, the corresponding data is updated in LocalStorage. When the user filters the entries, the application retrieves the filtered data from LocalStorage and displays it in the table.

The application also uses the JavaScript Date object to get the current date and time when adding a new entry.

The total income, total expense, and total balance are calculated by iterating through the data stored in LocalStorage and adding up the amounts. The results are then displayed in the corresponding sections of the page.
