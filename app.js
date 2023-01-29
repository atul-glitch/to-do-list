const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + "/date.js")

// console.log(date());

const app = express();
const items = [];
const workItem = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

app.get('/', function(req, res) {
  const day = date.getDate();

  res.render('list', {
    listTitle:"(i) "+ day +".\nTo Do List",
    newListItems: items
  });
});

app.post('/', function(req, res) {
  const item = req.body.newItem;
  if (req.body.list === "(ii)") {
    workItem.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  };
});

app.get('/work', function(req, res) {
  const days = date.getDate();
  res.render('list', {
    listTitle:"(ii) " +days + ".\nWork List",
    newListItems: workItem
  });
});

app.listen(3000, function() {
  console.log('server 3000');
});
