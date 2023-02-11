import express from 'express'
import { generateMeal, generateSmartMeal } from './recommendation.js'
import { getRecipe } from './recipe.js'
import { generateSmartList } from './smartList.js'

const app = express()
app.use(express.json())

app.get('/', (req, res)=>{
    res.send({
        message: "Welcome to Mealoo Server"
        // documentation should be displayed here
    })
})

// get recipe of mealName
app.get('/recipe', async(req, res)=>{
    if(req.body.mealName === undefined){ res.status(422).send("Missing a required body param")}
    let mealName = req.body.mealName
    let recipe = await getRecipe(mealName)
    // continue to request for a recommendation if there's some issues
    while(recipe === null){
        recipe = await getRecipe(mealName)
    }
    res.status(200).send(JSON.parse(recipe))
})

// get {mealName, description, nutritionalValues, prepTime} based on each filter object item of filterName and filterData properties on an array on the client request
app.get('/recommend_meal', async(req,res)=>{
    if(req.body.filters === undefined){ res.status(422).send("Missing a required body param")}
    let filters = req.body.filters
    let newMeal = await generateMeal(filters)
    // continue to request for a recommendation if there's some issues
    while(newMeal === null){
        newMeal = await generateMeal(filters)
    }
    res.status(200).send(JSON.parse(newMeal))
})

// get a new meal recommendation based on a list of mealNames: {mealName, description, nutritionalValues, reasonForRecommendation, prepTime}
// future improvement: optionally give a hint to the general idea of the list so chatGPT can understand what should the new meal be like
app.get('/recommend_meal/list', async(req,res)=>{
    if(req.body.mealList === undefined){ res.status(422).send("Missing a required body param")}
    let mealList = req.body.mealList
    let newMeal = await generateSmartMeal(mealList)
    // continue to request for a recommendation if there's some issues
    while(newMeal === null){
        newMeal = await generateSmartMeal(mealList)
    }
    res.status(200).send(JSON.parse(newMeal))
})

// get a smartList with N number of meals based on a filter
app.get('/recommend_smartlist', async(req, res)=>{
    let filters = req.body.filters
    let mealNumber = req.body.mealNumber
    let smartList = await generateSmartList(filters, mealNumber)
    res.status(200).send(smartList)
})

app.listen(8080, ()=>{
    console.log("Mealoo Server running...")
})