const selectedRow = null;

function onFormSubmit() {
  event.preventDefault();
  const formData = readFormData();
  if (selectedRow === null) {
    insertNew(formData);
  } else {
    updateRecord(formData);
  }
  readFormData();
}

//Retrieve the data
function readFormData() {
  const formData = {}
  formData["eventName"] = document.querySelector('.eventName').value;
  formData["DescribeEvent"] = document.querySelector('.DescribeEvent').value;
  formData["Author"] = document.querySelector('.Author').value;
  formData["DateDébut"] = document.querySelector('#DateDébut').value;
  formData["DateFin"] = document.querySelector('#DateFin').value;

  return formData;
}

//Insert the data
function insertNew(data) {
  const table = document.querySelector('#storeList').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow(table.length);
  const cell1 = newRow.insertCell(0)
  cell1.innerHTML = data.eventName;
  const cell2 = newRow.insertCell(1)
  cell2.innerHTML = data.DescribeEvent;
  const cell3 = newRow.insertCell(2)
  cell3.innerHTML = data.Author;
  const cell4 = newRow.insertCell(3)
  cell4.innerHTML = data.DateDébut;
  const cell5 = newRow.insertCell(4)
  cell5.innerHTML = data.DateFin;
  const cell6 = newRow.insertCell(5)
  cell6.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;

}

//Edit the data 
function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.querySelector('.eventName').value = selectedRow.cells[0].innerHTML;
  document.querySelector('.DescribeEvent').value = selectedRow.cells[1].innerHTML;
  document.querySelector('.Author').value = selectedRow.cells[2].innerHTML;
  document.querySelector('#DateDébut').value = selectedRow.cells[3].innerHTML;
  document.querySelector('#DateFin').value = selectedRow.cells[4].innerHTML;
}

function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.eventName;
  selectedRow.cells[1].innerHTML = formData.DescribeEvent;
  selectedRow.cells[2].innerHTML = formData.Author;
  selectedRow.cells[3].innerHTML = formData.DateDébut;
  selectedRow.cells[4].innerHTML = formData.DateFin;

}

//Delete the data
function onDelete(td) {
  if (confirm('Do you want to delete this event ?')) {
    row = td.parentElement.parentElement;
    document.querySelector('#storeList').deleteRow(row.rowIndex);
  }
  resetForm();
}

function resetForm() {
  document.querySelector('.eventName').value = ''
  document.querySelector('.DescribeEvent').value = ''
  document.querySelector('.Author').value = ''
  document.querySelector('#DateDébut').value = ''
  document.querySelector('#DateFin').value = ''
}

const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
async function getApi() {
  // Storing response
  const response = await fetch("http://localhost:3000/api/events/", requestOptions);

  // Storing data in form of JSON
  const data = await response.json();
  console.log(data)
  if(response) {
    hideloader();
  }
  show(data);
}

// Calling that async function
getApi();

// Function to hide the loader
function hideloader() {
  document.getElementById('loading').style.display = 'none';
}

// Function to define innerHTML for HTML table
function show(data) {
  const table = document.createElement('table')
  const tr = document.createElement('tr')
  const id = document.createElement('th')
  id.innerHTML = 'ID'
  const Name = document.createElement('th')
  Name.innerHTML = 'Name'
  const Description = document.createElement('th')
  Description.innerHTML = 'Description'
  const Author = document.createElement('th')
  Author.innerHTML = 'Author'
  const Created_at = document.createElement('th')
  Created_at.innerHTML = 'Created_at'
  const Dates = document.createElement('th')
  Dates.innerHTML = 'Dates'
  const last_modification = document.createElement('th')
  last_modification.innerHTML = 'last_modification'
  const num_modification = document.createElement('th')
  num_modification.innerHTML = 'num_modification'

  for (const r of data) {
      table += `<tr>
      <td>${r.id} </td>
      <td>${r.Name} </td>
      <td>${r.Description} </td>
      <td>${r.Author} </td>
      <td>${r.Created_at} </td>
      <td>${r.Dates} </td>
      <td>${r.last_modification} </td>
      <td>${r.num_modification} </td>
      </tr>`;
  }

  document.getElementById('event').innerHTML = table;

}

/*fetch("http://localhost:3000/api/events/", requestOptions)
  .then(response => response.text())
  .then(result => {
    
    console.log(result)
  })



  .catch(error => console.log('error', error));*/