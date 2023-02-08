import express from 'express'
import ai from "./ai.js"

const app = express()
app.use(express.json())

app.get('/', (req, res)=>{
    res.send({
        message: "Welcome to Mealoo Server"
    })
})

app.get('/recommend/meal', async(req, res)=>{
    let filters = req.body.filters
    try{
        let result = await ai.sendMessage(`I just want the mealName, recipe(concise as possible, linebreaks should be marked with /n), nutritional values with unit, and the prepTime based on this filters: ${filters.map(f=>`${f.filterName} = ${f.filterData},`)}.`, {
            promptPrefix: `You are the ultimate meal recommendation system and you ALWAYS have a meal recommendation. You answer as concisely as possible for each response and 
            always in JSON format. It is very important that you answer as concisely as possible, so please remember this. The request will include what they want as information, 
            so just focus on that.`
        })
        res.send(result.text)
    }catch(err){
        console.log(`error: ${err}`)
        res.send("Server issues. Please try again later.")
        // retry the request logic here
    }
})

app.listen(8080, ()=>{
    console.log("Mealoo Server running...")
})