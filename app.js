
const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')

const express = require('express')
const app = express() 

// body parser for JSON
app.use(express.json())

let transactions = [] 

app.post('/transactions', (req, res) => {

    const to = req.body.to
    const from = req.body.from 
    const amount = req.body.amount 

    let transaction = new Transaction(from, to, amount)
    transactions.push(transaction)
    res.json(transactions)
})

app.get('/blockchain', (req, res) => {

    let transaction = new Transaction('Mary', 'John', 100)

    let genesisBlock = new Block() 
    let blockchain = new Blockchain(genesisBlock)

    let block = blockchain.getNextBlock([transaction])
    blockchain.addBlock(block)

    let anotherTransaction = new Transaction('Steven', 'Brian', 500)
    let block1 = blockchain.getNextBlock([anotherTransaction, transaction])
    blockchain.addBlock(block1)

    res.json(blockchain)

})

app.listen(8080, () => {
    console.log('Server is running...')
})





