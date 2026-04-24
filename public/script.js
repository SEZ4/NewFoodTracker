document.addEventListener('DOMContentLoaded', function() {

    const dailyCalorie = document.getElementById('daily-calorieCount');
    const currentWeight = document.getElementById('curent-weightCount');

    let firstMealList = Array.from(document.getElementById('firstMealList').children);
    let secondMealList = Array.from(document.getElementById('secondMealList').children);
    let mealCalorieList = Array.from(document.getElementById('mealCalorieList').children);

    fetchGeneralInfo = function(){
        fetch('/api/generalinfo')
            .then(function(responce){
                return responce.json();
            })
            .then(function(generalinfo){
                generalinfoHandelr(generalinfo);
            })
            .catch(function(error){
                console.error('Error Fetching "General Info".')
            })
    }
    fetchGeneralInfo();

    fetchWeekList = function(){
        fetch('/api/weekinfo')
            .then(function(responce){
                return responce.json();
            })
            .then(function(weekinfo){
                weekinfoHandler(weekinfo)
            })
    }
    fetchWeekList();

    function generalinfoHandelr(info){
        if(info[0].current_weight == null){
            window.alert('Please enter weight');
        } else{
            currentWeight.innerHTML = `${info[0].current_weight} KG`;
        } if(info[0].daily_calorie == null){
            window.alert('Please enter Daily Calorie');
        } else{
            dailyCalorie.innerHTML = `${info[0].daily_calorie} Ca`;
        }
    }
    function weekinfoHandler(info){
        firstMealList.slice(1).forEach((element, index) => {
            element.innerHTML = info[index + 1].first_meal;
        })
        secondMealList.slice(1).forEach((element, index) => {
            element.innerHTML = info[index + 1].second_meal;
        })
        mealCalorieList.slice(1).forEach((element, index) => {
            element.innerHTML = info[index + 1].day_calorie;
        })
    }
    
}) 