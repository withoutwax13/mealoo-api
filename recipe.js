import ai from './ai.js'

export const getRecipe = async(mealName) => {
    try{
        let mealRecommendation = await ai.sendMessage(`This is the mealName: ${mealName}. I just want the mealName and recipe(concise as possible, should be an object with 2 array properties, which are the ingredients and instruction set that each instruction should be a separate item)`, {
            promptPrefix: `You are the ultimate meal recommendation system and you ALWAYS have a meal recommendation. You answer as concisely as possible for each response and 
            always in JSON format. It is very important that you answer as concisely as possible, so please remember this. The request will include what they want as information, 
            so just focus on that.`
        })
        console.log("/recipe --- successful response from chatGPT")
        return mealRecommendation.text
    }catch(err){
        console.log(`error: \n${err}`)
        return null
    }
}