import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your actual password
  database: 'crud',
});

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM employee';
  db.query(sql, (err, result) => {
    if(err) return res.json({ Message: 'Error inside server' });
    return res.json(result);
  });
});

app.post('/employee', (req, res) => {
  const sql = 'INSERT INTO employee (Name, Email) VALUES (?, ?)';
  const values = [
    req.body.name,
    req.body.email
  ];
  console.log(values);
  db.query(sql, values, (err, result) => {
    if(err) return res.json(err);
    return res.json(result);
  });
});

app.get('/read/:id', (req, res) => {
  const sql = 'SELECT * FROM employee WHERE ID = ?';
  const id = req.params.id;
  db.query(sql,[id], (err, result) => {
    if(err) return res.json({ Message: 'Error inside server' });
    return res.json(result);
  });
});

app.put('update/:id', (req, res) => {
  const sql = 'UPDATE employee SET `Name`=?, `Email`=? WHERE ID=?';
  const id = req.params.id;
  db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
    if(err) return res.json({ Message: 'Error inside server' });
    return res.json(result);
  })
})

app.delete('/delete/:id', (req, res) => {
  const sql ="DELETE FROM employee WHERE ID = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if(err) return res.json({ Message: 'Error inside server' });
    return res.json(result);
  })
})

app.listen(8081, () => {
  console.log('Listening');
});