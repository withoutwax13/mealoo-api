import ai from './ai.js'
import { generateMeal, generateSmartMeal } from './recommendation.js'

export const generateSmartList = async(filters, numberOfMeals) => {
    try{
        let currentMealList = []
        while(currentMealList.length !== numberOfMeals){
            if(currentMealList.length < 1){
                let newMeal = await generateMeal(filters)
                // continue to request for a recommendation if there's some issues
                while(newMeal === null){
                    newMeal = await generateMeal(filters)
                }
                currentMealList.push(JSON.parse(newMeal))
            }
            else{
                let newMeal = await generateSmartMeal(currentMealList)
                // continue to request for a recommendation if there's some issues
                while(newMeal === null || newMeal === undefined){
                    newMeal = await generateSmartMeal(currentMealList)
                }
                currentMealList.push(JSON.parse(newMeal))
            }
        }
        console.log("/smart list generated --- successful response chatGPT")
        return currentMealList
    }catch(err){
        console.log(`error: \n${err}`)
        return generateSmartList(filters, numberOfMeals)
    }
}