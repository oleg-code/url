const express = require("express");
const app = express();
const mongoose = require('mongoose');
const ShortURL = require('./models/url')


const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({ extended: false}));

app.get('/', async (req, res) => {
	const allData = await ShortURL.find()
	res.render('index', { shortUrls: allData })	
});

app.post('/short', async (req, res) => {
	const fullurl = req.body.fullUrl
	const record = new ShortURL({
		full: fullurl
	})
	await record.save()
	res.redirect('/')
});

app.get('/:shortid', async (req, res) => {
	const shortid = req.params.shortid
	const data = await ShortURL.findOne({ short: shortid }
		)

	await data.save()
	res.redirect(data.full)
	
})

const uri = 'mongodb+srv://newuser:NodeJs@cluster0.ldhhy.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {
		console.log('MongoDB Connected…')
	})
	.catch(err => console.log(err))




app.listen(port,() => {
	console.log('Listening at port 5000');

});