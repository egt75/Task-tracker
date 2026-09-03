const addTask = document.getElementById('addTask');
const taskPanel = document.getElementById('newTask');

const addFilter = document.getElementById('addFilter');
const filterPanel = document.getElementById('newFilter');

const mainContainer = document.getElementById('mainContainer');

const savefilterContainer = localStorage.getItem('newFilter');
let filterContainer = [];

const saveTaskContainer = localStorage.getItem('newTask');

const saveCalendarTask = localStorage.getItem('calendar');

let taskContainer = [];
let checkedMonth = [];

const task = document.getElementById('task');

const date = new Date();

if(saveCalendarTask !== null){
    checkedMonth = JSON.parse(saveCalendarTask);
}

if (savefilterContainer !== null){
    filterContainer = JSON.parse(savefilterContainer);
}
renderFilter();

if (saveTaskContainer !== null){
    taskContainer = JSON.parse(saveTaskContainer);
}
renderTask();

addFilter.onclick = function() {
    const filter ={
        nameValue: '',
        levelValue: 0
    }
    const overlay = document.createElement('div');
    const form = document.createElement('div');
    const controlPanel = document.createElement('div');
    const saveBtn = document.createElement('button');
    const closeBtn = document.createElement('button');
    const taskPanel = document.createElement('div');
    const name = document.createElement('input');
    const colomnForm = document.createElement('div');
    const description = document.createElement('input');

    taskForm(overlay, form, controlPanel, saveBtn, closeBtn, taskPanel, colomnForm, name, description);
    name.placeholder = 'Введите название фильтра';
    saveBtn.onclick = function() {
        if (name.value){
            filter.nameValue = name.value;
            filterContainer.push(filter);
            localStorage.setItem('newFilter', JSON.stringify(filterContainer));
        }
        renderFilter();
        overlay.remove();
        form.remove();
    }
}

function renderFilter(){
    filterPanel.innerHTML='';

    for (let i = 0; i < filterContainer.length; i ++){
        const filter = document.createElement('div');
        filter.className = 'filter';
        filterPanel.appendChild(filter)

        const newNote = document.createElement('div');
        newNote.className = 'filterName';
        newNote.textContent = filterContainer[i].nameValue;
        filter.appendChild(newNote);

        const level = document.createElement('div');
        level.className = 'levelPanel';
        filter.appendChild(level);
        for (let s = 0; s < 100; s ++){
            const separation = document.createElement('div');
            if (s == 0){
                separation.className = 'sep left-radius';
            }else if (s == 99){
                separation.className = 'sep right-radius';
            }else{
                separation.className = 'sep';
            }
            if (s < filterContainer[i].levelValue / 10){
                separation.id = 'sep-done';
            }
            level.appendChild(separation);
        }

        const procent = document.createElement('div');
        procent.className = 'procent';
        procent.textContent = filterContainer[i].levelValue/10 + '%';
        filter.append(procent);

        const delBtn = document.createElement('button');
        delBtn.className = 'delBtn';
        const screenWidth = window.innerWidth;
        if (screenWidth < 768){
            delBtn.textContent = 'Х';
        }else{
            delBtn.textContent = 'Удалить';
        }
        filter.appendChild(delBtn);

        delBtn.onclick = function(){
            filterContainer.splice(filterContainer[i], 1);
            localStorage.setItem('newFilter', JSON.stringify(filterContainer));
            renderFilter();
        }
    }
}

addTask.onclick = function() {

    const overlay = document.createElement('div');
    const form = document.createElement('div');
    const controlPanel = document.createElement('div');
    const saveBtn = document.createElement('button');
    const closeBtn = document.createElement('button');
    const taskPanel = document.createElement('div');
    const name = document.createElement('input');
    const colomnForm = document.createElement('div');
    const description = document.createElement('textarea');
    description.placeholder = 'Введите описание..';
    description.className = 'description';

    taskForm(overlay, form, controlPanel, saveBtn, closeBtn, taskPanel, colomnForm, name);
    colomnForm.appendChild(description);
    
    const taskSave ={
        id: taskContainer.length,
        nameValue: name.value,
        descriptionValue: description.value,
        dateValue: date.getDate(),
        levelValue: 0,
        filterValue: ''
    }

    if(filterContainer.length > 0){
        const select = document.createElement('select');
        select.className = 'taskSelect';
        for (let i = 0; i < filterContainer.length; i++){
            const option = document.createElement('option');
            option.value = filterContainer[i].nameValue;
            option.textContent = filterContainer[i].nameValue;
            select.appendChild(option);
            taskSave.filterValue = select.value;
        }
        name.oninput = function() {
            taskSave.nameValue = name.value;
        }
        description.oninput = function(){
            taskSave.descriptionValue = description.value;
        }
        select.oninput = function() {
            taskSave.filterValue = select.value;
        }
        taskPanel.appendChild(select);
    }   
    
    saveBtn.onclick = function() {
        if (name.value){
            taskContainer.push(taskSave);
            localStorage.setItem('newTask', JSON.stringify(taskContainer));
        }
        renderTask();
        form.remove();
        overlay.remove();
    }
}

function renderTask(){
    taskPanel.innerHTML='';
    for (let i = 0; i < taskContainer.length; i++){
        const newTask = document.createElement('div');
        newTask.className = 'task';
        newTask.id = 'task';
        taskPanel.appendChild(newTask);

        const taskName = document.createElement('div');
        taskName.className = 'taskName';
        taskName.textContent = taskContainer[i].nameValue;
        newTask.appendChild(taskName);

        const filterName = document.createElement('div');
        filterName.className = 'filterName';
        filterName.textContent = taskContainer[i].filterValue;
        newTask.appendChild(filterName);

        newTask.onclick = function() {
            const overlay = document.createElement('div');
            const form = document.createElement('div');
            const controlPanel = document.createElement('div');
            const saveBtn = document.createElement('button');
            const closeBtn = document.createElement('button');
            const taskPanel = document.createElement('div');
            const name = document.createElement('input');
            const colomnForm = document.createElement('div');
            const manipulatePanel = document.createElement('div');
            manipulatePanel.className = 'manipulatePanel';

            const description = document.createElement('textarea');
            description.className = 'description';
            description.placeholder = 'Введите описание..';

            const delBtn = document.createElement('button')
            delBtn.className = 'delBtn';
            delBtn.textContent = 'Удалить';

            taskForm(overlay, form, controlPanel, saveBtn, closeBtn, taskPanel, colomnForm, name);
            colomnForm.appendChild(description);
            const currentTask = taskContainer[i];

            name.value = currentTask.nameValue;
            description.value = currentTask.descriptionValue;
            colomnForm.appendChild(manipulatePanel);

            saveBtn.onclick = function() {
                if (name.value){
                    currentTask.nameValue = name.value;
                    currentTask.descriptionValue = description.value;
                    localStorage.setItem('newTask', JSON.stringify(taskContainer));
                }   
                overlay.remove();
                form.remove();
                renderTask();
            }

            const doneBtn = document.createElement('button');
            doneBtn.className = 'doneBtn';
            doneBtn.textContent = 'Выполнено';
            manipulatePanel.appendChild(delBtn);

            let currentDate = date.getMonth().toString() + date.getDate().toString() + date.getFullYear().toString();
            
            doneBtn.onclick = function() {

                const calendar = {
                    idTask: i,
                    month: date.getMonth(),
                    date: date.getDate(),
                    filter: taskContainer[i].filterValue,
                    fullDate: currentDate
                }
                currentTask.dateValue = date.getDate();
                const filter = filterContainer.find(f => f.nameValue === currentTask.filterValue);
                if (filter) {
                    filter.levelValue += 10;
                }
                checkedMonth.push(calendar);
                localStorage.setItem('calendar', JSON.stringify(checkedMonth));
                localStorage.setItem('newTask', JSON.stringify(taskContainer));
                localStorage.setItem('newFilter', JSON.stringify(filterContainer));
                overlay.remove();
                form.remove();
                renderFilter();
                renderTask();
            }
            manipulatePanel.append(doneBtn); 
            for (let t = 0; t < checkedMonth.length; t++){
                if(checkedMonth[t].idTask == i && checkedMonth[t].fullDate === currentDate){
                    doneBtn.remove();
                }
            }
            
            newCalendar(manipulatePanel, taskContainer[i].filterValue, i, taskContainer[i].id);
            delBtn.onclick = function(){
                taskContainer.splice(taskContainer[i], 1);
                localStorage.setItem('newTask', JSON.stringify(taskContainer));
                localStorage.setItem('newFilter', JSON.stringify(filterContainer));
                overlay.remove();
                form.remove()
                renderTask();
                renderFilter();
            }
        }
    }
}

function taskForm(overlay, form, controlPanel, saveBtn, closeBtn, taskPanel, colomnForm, name) {
    overlay.className = 'overlay';
    overlay.id = 'overlay';
    mainContainer.appendChild(overlay);

    form.className = 'form';
    form.id = 'form';
    overlay.appendChild(form);

    controlPanel.className = 'controlPanel';
    form.appendChild(controlPanel);

    saveBtn.className = 'saveBtn';
    saveBtn.textContent = 'Сохранить';
    saveBtn.id = 'saveBtn';
    controlPanel.appendChild(saveBtn);

    closeBtn.className = 'closeBtn';
    closeBtn.textContent = '✖';
    closeBtn.id = 'closeBtn';
    controlPanel.appendChild(closeBtn);

    closeBtn.onclick = function() {
        form.remove();
        overlay.remove();
    }

    taskPanel.className = 'taskPanel';
    form.appendChild(taskPanel);
    
    colomnForm.className = 'colomnForm';
    taskPanel.append(colomnForm);

    name.placeholder = 'Введите название привычки';
    name.className = 'name';
    name.id = 'name';
    colomnForm.appendChild(name);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            form.remove();
            overlay.remove();
        }
    });
}

let month = 0;

const week = ['ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'];
const monthName =['Январь','Февраль', 'Март','Апрель','Май','Июнь','Июль','Авгруст','Сентябрь','Октябрь','Ноябрь','Декабрь'] 
function calendarForm(panel, currentFilter) {

    const calendar = document.createElement('div');
    calendar.className = 'calendar';
    panel.append(calendar);

    const back = document.createElement('div');
    back.className = 'back';
    calendar.appendChild(back);
    const rowList = document.createElement('div');
    rowList.className = 'rowList';
    const colomnList = document.createElement('div');
    colomnList.className = 'colomnList';
    const name = document.createElement('div');
    name.textContent = monthName[date.getMonth()+month] + ' ' + date.getYear();
    back.append(name, rowList, colomnList);
    const controlPanel = document.createElement('div');
    controlPanel.className = 'controlPanel';
    back.appendChild(controlPanel);

    const nowDateMonth = new Date(date.getYear(), date.getMonth()+month, 1);

    const nextMonthBtn = document.createElement('button');
    nextMonthBtn.textContent = '>';
    nextMonthBtn.className = 'next';
    const previoseMonthBtn = document.createElement('button');
    previoseMonthBtn.textContent = '<';
    previoseMonthBtn.className = 'previose'
    const nowMonthBtn = document.createElement('button');
    nowMonthBtn.textContent = '_';
    nowMonthBtn.className = 'now';
    controlPanel.append(previoseMonthBtn, nowMonthBtn, nextMonthBtn);

    nextMonthBtn.onclick = function(){
        month += 1;
        calendar.remove();
        calendarForm(panel, currentFilter);
    }
    previoseMonthBtn.onclick = function(){
        month -= 1;
        calendar.remove();
        calendarForm(panel, currentFilter);
    }
    nowMonthBtn.onclick = function(){
        month = 0;
        calendar.remove();
        calendarForm(panel, currentFilter);
    }

    for (let i = 0; i < 7; i++){
        const row = document.createElement('div');
        row.className = 'row';
        row.textContent = week[new Date(2025, 0, i-1).getDay()];
        rowList.appendChild(row);
        const colomnLine = document.createElement('div');
        colomnLine.className = 'colomnLine';
        colomnList.append(colomnLine);
        colomnLine.append(row);
        let n = 0;
        for (let j = 0; j < 6; j++){
            const colomn = document.createElement('div');
            let currentMonth = new Date(date.getYear(), date.getMonth()+month, i+j*7-nowDateMonth.getDay()).getMonth(); 
            let currentDate = new Date(date.getYear(), date.getMonth()+month, i+j*7-nowDateMonth.getDay()).getDate();
            colomn.className = 'colomnDate';
            if (date.getMonth()+month == currentMonth){
                colomn.textContent = currentDate;
                for (let m = 0; m < checkedMonth.length; m ++){
                    if (checkedMonth[m].date == currentDate && checkedMonth[m].month == date.getMonth()+month & checkedMonth[m].filter == currentFilter){
                        colomn.className = 'colomnDateCheck';
                    }
                }
            }else{
                colomn.textContent = '';
            }
            colomnLine.appendChild(colomn);
        }
    }
}

let weekChange = 0;
let indicatorDate = 0;
function newCalendar(panel, filter, taskID){
    const calendarPanel = document.createElement('div');
    calendarPanel.className = 'date-nav-and-indicators';
    panel.append(calendarPanel);

    const dateNavContainer = document.createElement('div');
    dateNavContainer.className = 'date-nav-container';
    calendarPanel.appendChild(dateNavContainer);

    let regDay = date.getDay();
    if (regDay > 0){
        regDay = -regDay;
    }
    for(let calendarDay = 0; calendarDay < 7; calendarDay++){
        const dayItem = document.createElement('div');
        dayItem.className = 'day-item';
        dateNavContainer.append(dayItem);

        let currentDate = new Date(date.getYear(), date.getMonth(), date.getDate()+regDay+weekChange).getDate();

        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = currentDate;
        const dayName = document.createElement('div');  
        dayName.className = 'day-name';
        for (let m = 0; m < checkedMonth.length; m ++){
            if (currentDate == checkedMonth[m].date & checkedMonth[m].filter == filter & taskID == checkedMonth[m].idTask){
                dayItem.className = 'day-item day-active';
            }
        }
        dayName.textContent = week[calendarDay];
        regDay=regDay+1;
        dayItem.append(dayNumber, dayName);
    }

    const indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'indicator-container';
    calendarPanel.appendChild(indicatorContainer);

    const indicatorLine = document.createElement('div');
    indicatorLine.className = 'indicator-line';
    indicatorContainer.appendChild(indicatorLine);

    const dotPreBtn = document.createElement('div');
    dotPreBtn.className = 'indicator-dot';
    const dotNowBtn = document.createElement('div');
    dotNowBtn.className = 'indicator-dot';
    const dotNextBtn = document.createElement('div');
    dotNextBtn.className = 'indicator-dot';

    if(indicatorDate == -1){
        dotPreBtn.className = 'indicator-dot press';
    }else if(indicatorDate == 0){
        dotNowBtn.className = 'indicator-dot press';
    }else if(indicatorDate == 1){
        dotNextBtn.className = 'indicator-dot press';
    }

    dotPreBtn.onclick = function(){
        calendarPanel.remove();
        newCalendar(panel, filter, taskID);
        indicatorDate = -1;
        weekChange = -7;
    }
    dotNowBtn.onclick = function(){
        calendarPanel.remove();
        newCalendar(panel, filter, taskID);
        indicatorDate = 0;
        weekChange = 0;
    }
    dotNextBtn.onclick = function(){
        calendarPanel.remove();
        newCalendar(panel, filter, taskID);
        indicatorDate = 1;
        weekChange = 7;
    }
    indicatorLine.append(dotPreBtn, dotNowBtn, dotNextBtn);
}
