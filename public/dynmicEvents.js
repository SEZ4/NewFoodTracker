document.addEventListener('DOMContentLoaded', function() {

    const addButton = document.getElementById('addform-button');
    const infoButton = document.getElementById('infoform-button');

    const addForm = document.querySelector('.addform-form');
    const infoForm = document.querySelector('.infoform-list');

    addButton.addEventListener('click', function(event){
        event.stopPropagation();
        addForm.classList.add('listOpen');
        infoForm.classList.remove('listOpen');
    })
    addForm.addEventListener('click', function(event){
        event.stopPropagation();
    })
    infoButton.addEventListener('click', function(event){
        event.stopPropagation();
        infoForm.classList.add('listOpen');
        addForm.classList.remove('listOpen');
    })
    infoForm.addEventListener('click', function(event){
        event.stopPropagation();
    })
    document.addEventListener('click', function(){
        addForm.classList.remove('listOpen');
        infoForm.classList.remove('listOpen');
    })
})