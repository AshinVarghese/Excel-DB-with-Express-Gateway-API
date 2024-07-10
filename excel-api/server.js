const express = require('express');
const xlsx = require('xlsx');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;
const dataFilePath = 'your_excel_file.xlsx'; // Replace with your file path

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Read Excel data (you can optimize this to read once and cache)
function readExcelData() {
  const workbook = xlsx.readFile(dataFilePath);
  const sheetNameList = workbook.SheetNames;
  return xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
}

// Write data back to Excel
function writeExcelData(data) {
  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  xlsx.writeFile(workbook, dataFilePath);
}

// API endpoints
app.get('/api/data', (req, res) => {
  const data = readExcelData(); 
  res.json(data);
});

// GET specific data (e.g., by ID)
app.get('/api/data/:id', (req, res) => {
  const data = readExcelData();
  const id = parseInt(req.params.id, 10);
  const item = data.find(d => d.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Data not found');
  }
});

// POST (add new data)
app.post('/api/data', (req, res) => {
  const newData = req.body;
  const data = readExcelData();
  const maxId = data.length > 0 ? Math.max(...data.map(d => d.id)) : 0;
  newData.id = maxId + 1; // Assuming 'id' is numeric and unique
  data.push(newData);
  writeExcelData(data);
  res.status(201).json(newData);
});

// PUT (update existing data)
app.put('/api/data/:id', (req, res) => {
  const data = readExcelData();
  const id = parseInt(req.params.id, 10);
  const index = data.findIndex(d => d.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeExcelData(data);
    res.json(data[index]);
  } else {
    res.status(404).send('Data not found');
  }
});

// DELETE (remove data)
app.delete('/api/data/:id', (req, res) => {
  const data = readExcelData();
  const id = parseInt(req.params.id, 10);
  const newData = data.filter(d => d.id !== id);
  if (newData.length !== data.length) {
    writeExcelData(newData);
    res.status(204).send();
  } else {
    res.status(404).send('Data not found');
  }
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
