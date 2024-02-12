const express = require('express')
const app = express()
const path = require('path')
const PORT = 3000
const multer = require('multer');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const moment = require('moment');
const fs = require('fs');
const crypto = require('crypto');
const session = require('express-session');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './static/img/data');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });

const upload = multer({ storage: storage });

app.set('views', './views');
app.set('view engine', 'ejs');

// Set up static file serving
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static"));
app.use("/js", express.static(__dirname + "static/js"));
app.use("/css", express.static(__dirname + "static/css"));
app.use("/img", express.static(__dirname + "static/img"));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "finalweb01"
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/login`)
}) 

app.get("/home",(req,res)=>{
    if (req.session.user) {
        res.render('home',{name:req.session.user.userName})
      } else {
        res.send('Please <a href="/login">login</a>.');
      }
})

app.get("/admin",(req,res)=>{
    const query = "SELECT * FROM products INNER JOIN types ON products.typeID = types.typeID INNER JOIN stores ON products.storeID = stores.storeID "
    db.query(query,(err,data)=>{
        if(err) throw err
        res.render('admin',{items:data})
    })
    
})
app.get('/logout', (req, res) => {

    req.session.destroy(err => {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/login');
        }
    });
});
app.get("/login",(req,res)=>{
    res.render('login')
})

app.get("/home/pig",(req,res)=>{
    const query = "SELECT * FROM products INNER JOIN types ON products.typeID = types.typeID INNER JOIN stores ON products.storeID = stores.storeID WHERE products.typeID = '1'"
    db.query(query,(err,data)=>{
        if(err) throw err
        res.render('order',{items:data})
    }) 
})

app.get("/home/beef",(req,res)=>{
    const query = "SELECT * FROM products INNER JOIN types ON products.typeID = types.typeID INNER JOIN stores ON products.storeID = stores.storeID WHERE products.typeID = '2'"
    db.query(query,(err,data)=>{
        if(err) throw err
        res.render('order',{items:data})
    }) 
})

app.get("/home/chicken",(req,res)=>{
    const query = "SELECT * FROM products INNER JOIN types ON products.typeID = types.typeID INNER JOIN stores ON products.storeID = stores.storeID WHERE products.typeID = '3'"
    db.query(query,(err,data)=>{
        if(err) throw err
        res.render('order',{items:data})
    })
})

app.get("/home/vegetable",(req,res)=>{
    const query = "SELECT * FROM products INNER JOIN types ON products.typeID = types.typeID INNER JOIN stores ON products.storeID = stores.storeID WHERE products.typeID = '4'"
    db.query(query,(err,data)=>{
        if(err) throw err
        res.render('order',{items:data})
    })
})

app.get("/home/seafood",(req,res)=>{
    const query = "SELECT * FROM products INNER JOIN types ON products.typeID = types.typeID INNER JOIN stores ON products.storeID = stores.storeID WHERE products.typeID = '5'"
    db.query(query,(err,data)=>{
        if(err) throw err
        res.render('order',{items:data})
    })
})


app.get('/listuser',(req,res)=>{
    if(req.session.user){
        const name = req.session.user.userName
        const query = "SELECT * FROM orders INNER JOIN products ON orders.productID = products.productID INNER JOIN types ON products.typeID = types.typeID INNER JOIN stores ON stores.storeID = products.storeID WHERE orders.user_order = ?"
        db.query(query,name,(err,data)=>{
            if(err){
                throw err   
            }else{
                res.render('listuser',{items:data,name:req.session.user.userName})
            }
    
        })
    }else{
        res.send('Please <a href="/login">login</a>.');
    }
    
})

app.post('/delete/order/:id',(req,res)=>{
    if (req.session.user) {
        const id = req.params.id
        const query = "DELETE FROM orders WHERE orders.orderID = ? "
        db.query(query,id,(err)=>{
        if(err){
            throw err
        }else{
            res.redirect('/listuser')
        }
        })
        } else { 
        res.send('Please <a href="/login">login</a>.');
         }
})
    

app.post('/input/:id',(req,res)=>{
        if (req.session.user) {
            const kiloneed = req.body.kiloneed
            const ID = req.params.id
            const data = {
                kiloneed:kiloneed,
                user_order:req.session.user.userName,
                productID:ID
            }
            const sql = "INSERT INTO orders SET ?"
            db.query(sql,data,(err,result)=>{
                if(err) throw err
                console.log(result)
                res.redirect('/home')
            })
          } else { 
            res.send('Please <a href="/login">login</a>.');
          }
})

app.post('/menu/:id',(req,res)=>{
    if (req.session.user) {
    const query = "SELECT * FROM products WHERE products.productID = ?"
    const menu  = req.params.id
    db.query(query,menu,(error,data)=>{
        if(error){
            throw error
        }
        res.render('menu',{items:data})
    })
    } else { 
        res.send('Please <a href="/login">login</a>.');
    }
    
   
})



app.post('/admin/indata',upload.single('filename'),(req,res)=>{
    const datedata = moment(Date.now());
    const date = datedata.format('YYYY-MM-DD/HH:mm:ss')
    const imagePath = "/img/data/"+req.file.filename
    const storeID = req.body.storeID
    const typeID = req.body.typeID
    const productName = req.body.productName
    const kilogram = req.body.kilogram
    const price = req.body.price
    const data = {
        imagePath: imagePath,
        storeID: storeID,
        typeID: typeID,
        productName: productName,
        kilogram: kilogram,
        price: price,
        dateTime:date
      };
      const query = 'INSERT INTO products SET ?'; // Replace your_table with your actual table name

      
      db.query(query, data, (error, results, fields) => {
        if (error) {
          console.error('Error inserting data:', error);
          res.status(500).send('Internal Server Error');
          return;
        }
        console.log('Data inserted successfully:', results);
            res.redirect('/admin')
      })
})

app.post('/delete/:itemId/img/data/:imageID', (req, res) => {
    const itemId = req.params.itemId;
    const imageID = "./static/img/data/"+req.params.imageID;
   
    const sql = 'DELETE FROM products WHERE productID = ?';
    db.query(sql, [itemId], (err, result) => {
      if (err) {
        console.error('Error deleting item: ' + err.message);
        res.status(500).send('Error deleting item');
        return;
      }
        fs.unlinkSync(imageID, (err) => {
             if (err) {
             console.error(err);
            res.status(500).send('Error deleting file');
            return;
            }
            console.log('File deleted successfully');
        });
    res.redirect('/admin');
    })
});
    
app.post('/register', (req, res) => {
    const userName = req.body.user_register;
    const email = req.body.email_register;
    const password1 = req.body.password_register1;
    const password2 = req.body.password_register2;
    const md5password = crypto.createHash('md5').update(password1).digest('hex');
    if (password1 !== password2) {
        res.send("Password does not match");
        return;
    }

    const data = {
        userName: userName,
        email: email,
        password: md5password
    };

    const select = 'SELECT * FROM users WHERE userName = ?';
    db.query(select, userName, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }
        if (result.length > 0) {
            res.send("Username already exists");
            return;
        } else {
            const sql = 'INSERT INTO users SET ?';
            db.query(sql, data, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                    return;
                }
                console.log('User registered successfully');
                res.redirect('/login');
            });
        }
    });
});

app.post('/login', (req, res) => {
    const userName = req.body.username_account1;
    const password = req.body.password_account1;

    // ใช้ crypto module เพื่อเข้ารหัส password ด้วย MD5
    const md5password = crypto.createHash('md5').update(password).digest('hex');

    // ตรวจสอบข้อมูลผู้ใช้ในฐานข้อมูล
    const sql = 'SELECT * FROM users WHERE userName = ? AND password = ?';
    db.query(sql, [userName, md5password], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }
        if (result.length > 0) {
            req.session.user = result[0];
            console.log('User logged in successfully');
            res.redirect('/home');
        } else {
            res.send("Invalid username or password");
        }
    });
});

app.post('/buyitem',(req,res)=>{
    if (req.session.user) {
        const query = "UPDATE products INNER JOIN orders ON products.productID = orders.productID SET products.kilogram = products.kilogram - orders.kiloneed"
        db.query(query,(err)=>{
            if(err){
                throw err
            }else{
                const name = req.session.user.userName
                const sql = "DELETE FROM orders WHERE orders.user_order = ?"
                db.query(sql,name,(err)=>{
                    if(err){
                        throw err
                    }else{
                        const sql1 = "DELETE FROM products WHERE products.kilogram = '0'"
                        db.query(sql1,(err)=>{
                            if(err){
                                throw err
                            }else{
                                res.redirect('/listuser')
                            }
                        })
                        
                    }
                })
            }
        })
    } else { 
        res.send('Please <a href="/login">login</a>.');
    }
})
