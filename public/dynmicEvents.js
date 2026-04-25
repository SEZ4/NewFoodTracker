document.addEventListener('DOMContentLoaded', function() {

    const addButton = document.getElementById('addform-button');
    const infoButton = document.getElementById('infoform-button');
    const editButton = document.getElementById('editform-button');

    const addForm = document.querySelector('.addform-form');
    const infoForm = document.querySelector('.infoform-list');
    const editForm = document.querySelector('.editform-form');

    addButton.addEventListener('click', function(event){
        event.stopPropagation();
        addForm.classList.add('listOpen');
        infoForm.classList.remove('listOpen');
        editForm.classList.remove('listOpen');
    })
    addForm.addEventListener('click', function(event){
        event.stopPropagation();
    })
    addForm.children[0].addEventListener('submit', function(e){
        e.preventDefault();
        addForm.classList.remove('listOpen');
    })
    infoButton.addEventListener('click', function(event){
        event.stopPropagation();
        infoForm.classList.add('listOpen');
        addForm.classList.remove('listOpen');
        editForm.classList.remove('listOpen');
    })
    infoForm.addEventListener('click', function(event){
        event.stopPropagation();
    })
    editButton.addEventListener('click', function(event){
        event.stopPropagation();
        editForm.classList.add('listOpen');
        addForm.classList.remove('listOpen');
        infoForm.classList.remove('listOpen');
    })
    editForm.addEventListener('click', function(event){
        event.stopPropagation();
    })
    document.addEventListener('click', function(){
        addForm.classList.remove('listOpen');
        infoForm.classList.remove('listOpen');
        editForm.classList.remove('listOpen');
    })

})