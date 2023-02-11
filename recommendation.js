import ai from './ai.js'

export const generateMeal = async(filters) => {
    try{
        let mealRecommendation = await ai.sendMessage(`I just want the mealName, 1 sentence concise description, nutritional values with unit, and the prepTime based on this filters: 
                ${filters.map(f=>`${f.filterName} = ${f.filterData},`)}.`, {
            promptPrefix: `You are the ultimate meal recommendation system and you ALWAYS have a meal recommendation. You answer as concisely as possible for each response and 
            always in JSON format. It is very important that you answer as concisely as possible, so please remember this. The request will include what they want as information, 
            so just focus on that.`
        })
        console.log("/meal generated --- successful response chatGPT")
        return mealRecommendation.text
    }catch(err){
        console.log(`error: \n${err}`)
        return null
    }
}

export const generateSmartMeal = async(mealList) => {
    try{
        let mealRecommendation = await ai.sendMessage(`Recommend a new meal based on the list. AVOID recommedning a meal with the same mealName in the list, this is important so please remember this. 
                I just want the mealName, 1 sentence concise description, nutritional values with unit, reason why you recommended it, and the prepTime based on this existing list: 
                ${mealList.map(f=>`${f.mealName},`)}. Make sure that you will recommend the most logical meal based on the other meals on the list.`, {
            promptPrefix: `You are the ultimate meal recommendation system and you ALWAYS have a meal recommendation. You answer as concisely as possible for each response and 
            always in JSON format. It is very important that you answer as concisely as possible, so please remember this. The request will include what they want as information, 
            so just focus on that.`
        })
        console.log("/smart meal generated --- successful response chatGPT")
        return mealRecommendation.text
    }catch(err){
        console.log(`error: \n${err}`)
        return null
    }
}