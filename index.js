import express from 'express'
import ai from "./ai.js"

const app = express()
app.use(express.json())

app.get('/', (req, res)=>{
    res.send({
        message: "Welcome to Mealoo Server"
    })
})

app.get('/recipe', async(req, res)=>{
    if(req.body.mealName === undefined){ res.status(422).send("Missing a required body param")}
    let mealName = req.body.mealName
    try{
        let mealRecommendation = await ai.sendMessage(`This is the mealName: ${mealName}. I just want the mealName and recipe(concise as possible, should be an object with 2 array properties, which are the ingredients and instruction set that each instruction should be a separate item)`, {
            promptPrefix: `You are the ultimate meal recommendation system and you ALWAYS have a meal recommendation. You answer as concisely as possible for each response and 
            always in JSON format. It is very important that you answer as concisely as possible, so please remember this. The request will include what they want as information, 
            so just focus on that.`
        })
        console.log("/recipe --- successful response from chatGPT")
        res.status(200).send(JSON.parse(mealRecommendation.text))
    }catch(err){
        console.log(`error: ${err}`)
        res.status(500).send({message: "chatGPT Server issues. Please try again later."})
    }
})

app.get('/recommend_meal', async(req,res)=>{
    if(req.body.filters === undefined){ res.status(422).send("Missing a required body param")}
    let filters = req.body.filters
    try{
        let mealRecommendation = await ai.sendMessage(`I just want the mealName, 1 sentence concise description, nutritional values with unit, and the prepTime based on this filters: 
                ${filters.map(f=>`${f.filterName} = ${f.filterData},`)}.`, {
            promptPrefix: `You are the ultimate meal recommendation system and you ALWAYS have a meal recommendation. You answer as concisely as possible for each response and 
            always in JSON format. It is very important that you answer as concisely as possible, so please remember this. The request will include what they want as information, 
            so just focus on that.`
        })
        console.log("/recommend/meal --- successful response chatGPT")
        res.status(200).send(JSON.parse(mealRecommendation.text))
    }catch(err){
        console.log(`error: ${err}`)
        res.status(500).send({message: "chatGPT Server issues. Please try again later."})
    }
})

app.get('/recommend_meal/list', async(req,res)=>{
    if(req.body.mealList === undefined){ res.status(422).send("Missing a required body param")}
    let mealList = req.body.mealList
    try{
        let mealRecommendation = await ai.sendMessage(`Recommend a meal. I just want the mealName, 1 sentence concise description, nutritional values with unit, reason why you recommended it, and the prepTime based on this existing list: 
                ${mealList.map(f=>`${f.mealName},`)}. Make sure that you will recommend the most logical meal based on the other meals on the list. DO NOT RESPOND WITH a meal ALREADY in the list, this is important.`, {
            promptPrefix: `You are the ultimate meal recommendation system and you ALWAYS have a meal recommendation. You answer as concisely as possible for each response and 
            always in JSON format. It is very important that you answer as concisely as possible, so please remember this. The request will include what they want as information, 
            so just focus on that.`
        })
        console.log("/recommend/meal --- successful response chatGPT")
        res.status(200).send(JSON.parse(mealRecommendation.text))
    }catch(err){
        console.log(`error: ${err}`)
        res.status(500).send({message: "chatGPT Server issues. Please try again later."})
    }
})

app.listen(8080, ()=>{
    console.log("Mealoo Server running...")
})