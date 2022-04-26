const express = require('express');
const app = express();
app.use(express.json())
const ideas = [
    {
    id:'1',
    createdBy:'zilan',
    createdDate:'26/04',
    title:'TODO',
    content: 'A todo app you can use easily',
    rating: 20,
},
    {
        id:'2',
        createdBy:'zilan',
        createdDate:'26/04',
        title:'TODO',
        content: 'A todo app you can use easily',
        rating: 20,
    }
]

app.get('/ideas',(req,res)=>{
    res.json(ideas);
})
app.get('/ideas/:id',(req,res)=>{
    const idea = ideas.find((item) => item.id ===req.params.id )
    if(!idea) {
        return res.status(404).send("not found")
    }
    res.json(idea);
})
app.post('/ideas',(req,res)=>{
    const body = {...req.body, id: `${ideas.length + 1}`};
    ideas.push(body);
    res.status(200).json(ideas);
})
app.put('/ideas/:id',(req,res)=>{
    const index = ideas.findIndex((item)=>item.id === req.params.id )
    if(index <= -1) {
       return res.status(404).send("not found");
    }
    ideas[index] = {
        ...ideas[index],
        ...req.body,
        id: ideas[index].id
    }
    res.json(ideas[index]);
})
app.delete('/ideas/:id', (req,res) =>{
    const index = ideas.findIndex((item)=>item.id === req.params.id )
    if(index <= -1) {
        return res.status(404).send("not found");
    }
    ideas.splice(index,1);
    res.status(202).send('success');
})
app.listen(3000);