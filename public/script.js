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
            element.innerHTML = info[index].first_meal;
        })
        secondMealList.slice(1).forEach((element, index) => {
            element.innerHTML = info[index].second_meal;
        })
        mealCalorieList.slice(1).forEach((element, index) => {
            element.innerHTML = info[index].day_calorie;
        })
    }

    let editForms = Array.from(document.querySelector('.editform-form').children);

    updateGeneralInfo = function(value, place){
        fetch('/api/updategeneralinfo', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value, place }),
        })
            .then(function(responce){
                if(!response.ok){
                    throw new Error('Failed to update General info');
                }
            })
            .catch(function(error){
                console.error('Error Updating General info');
            })
    }

    editForms.forEach((element) => {
        element.addEventListener('submit', function(e) {
            e.preventDefault();
            let inputValue = String(element.children[0].value);
            let inputName = String(element.children[0].name);

            updateGeneralInfo(inputValue, inputName);
            setTimeout(() => {
                fetchGeneralInfo();
            }, 500)
        })
    })

    let addForm = document.getElementById('addform');


    updateWeekInfo = function(firstMeal, secondMeal, calorie, place){
        fetch('/api/updateweekinfo', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstMeal, secondMeal, calorie, place}),
        })
            .then(function(responce){
                if(!response.ok){
                    throw new Error('Failed to update Week info');
                }
            })
            .catch(function(error){
                console.error('Error Updating Week info');
            })

    }

    addForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let firstMealValue = String(addForm.children[0].value);
        let secondMealValue = String(addForm.children[1].value);
        let mealCalorieValue = String(addForm.children[2].value);
        let mealPlace = String(addForm.children[3].value);

        updateWeekInfo(firstMealValue, secondMealValue, mealCalorieValue, mealPlace);
        setTimeout(() => {
            fetchWeekList();
        }, 500)
    })

    let deleteButton = document.getElementById('deleteButton');
    let clickCounter = 0;
    
    deleteButton.addEventListener('click', function(){
        clickCounter++;
        if(clickCounter === 1){
            deleteButton.style.backgroundColor = '#e2492d';
            deleteButton.style.transition = 'color 250ms ease-in-out'
            deleteButton.style.color = '#FFF'
            deleteButton.innerHTML = 'are u Sure?'
        } else if(clickCounter === 2){
            deleteButton.attributeStyleMap.clear();
            deleteButton.innerHTML = 'Clear content';

            fetch('/api/delteweekinfo', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            })
                .then( response => response.json())
                .then(data => {

                })
            clickCounter = 0
            setTimeout(() => {
                fetchWeekList();
            }, 500)
        }
    })
    
}) 