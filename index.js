/*
Вам необходимо написать js-скрипт, который работает с API системы amoCRM.
Скрипт должен для всех контактов без сделок создать новую задачу с текстом “Контакт без сделок”.
 */

const limit = 25;
let getContactsLeadsUrl = '/api/v4/leads'; //Получение кол-ва сделок у аккаунта
let getContactsListQueryUrl = '/api/v4/contacts'; //Получение списка контактов
let addTasksForContacts = '/api/v4/tasks'; //Добавление задачи для контакта

function getContacts() {
    $.ajax({
        url: getContactsListQueryUrl,
        method: 'GET',
        data: {
            limit: limit,
            with: 'leads',
            page: page
        }
    }).done(function(data) {
        if (!!data) {
            console.log(data)

        } else {
            console.log('Контактов нет');
            return false;
        }
    }).fail(function(data) {
        console.log('Что-то пошло не так c получением контактов');
        console.log(data);
        return false;
    })

    page++;
}

function addTasksForContacts() {
    $.ajax({
        url: addTasksForContacts,
        method: 'GET',
        data: {
            limit: limit,
            with: 'leads',
            page: page
        }
    }).done(function(data) {
        let text = prompt("Контакт без сделок");
        let complete_till = prompt("Введите дату для завершения задачи");
    }).fail(function(data) {
        console.log("Не удалось создать задачу");
        console.log(data);
        return false;
    })

page ++;
}

function getContactsLeads() {
    $.ajax({
        url: getContactsLeadsUrl,
        method: 'GET',
        data: {
            limit: limit,
            with: 'leads',
            page: page
        }
    }).done(function(data) {
        if(data.with == false) {
            console.log("Контакт без сделок");
            addTasksForContacts();
        }
    }).fail(function(data) {
        console.log("Не удалось получить кол-во сделок у контакта");
        console.log(data);
        return false;
    })
    page++;
}

getContacts();
getContactsLeads();
