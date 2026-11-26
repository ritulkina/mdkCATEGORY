const tickets = [
    {
        title: "Проектор не включается",
        room: "203",
        category: "Оборудование",
        done: false
    },
    {
        title: "Не закрывается окно",
        room: "105",
        category: "Аудитория",
        done: false
    },
    {
        title: "В коридоре не горит свет",
        room: "Коридор, 2-й этаж",
        category: "Другое",
        done: true
    }
]

const titleInput = document.getElementById("title") //метод поиска элемента по его уникальному идентификатору
const roomInput = document.getElementById("room")
const categoryS = document.getElementById("category")
const add = document.getElementById("addBtn")
const message = document.getElementById("message")

const Close = document.getElementById("Close")
const Open = document.getElementById("Open")
const Category = document.getElementById("Category")
const ticketsList = document.getElementById("ticketsList")

function renderTickets() {  //перерисовываеь список заявок на странице.
    ticketsList.innerHTML = ""

    if (tickets.length === 0) {
        const Item = document.createElement("li")
        Item.textContent = "Заявок пока нет"
        ticketsList.append(Item)
        return
    }

    let shownCount = 0

    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i]

        if (Open.checked && ticket.done) {
            continue
        }
        if (Close.checked && !ticket.done) {
            continue
        }

        if (Category.value !== "" && ticket.category !== Category.value) {
            continue
        }

        shownCount++

        const li = document.createElement("li")
        li.className = "ticketitem"

        const info = document.createElement("div")
        info.className = "ticketinfo"

        const titleEl = document.createElement("strong")
        titleEl.textContent = ticket.title

        const detailsEl = document.createElement("span")
        detailsEl.textContent = `Где: ${ticket.room} Категория: ${ticket.category}`

        const statusEl = document.createElement("span")
        if (ticket.done) {
            statusEl.textContent = "Выполнена"
            statusEl.className = "statusdone"
        } else {
            statusEl.textContent = "Открыта"
            statusEl.className = "statusopen"
        }

        info.append(titleEl, detailsEl, statusEl)

        const actions = document.createElement("div")
        actions.className = "ticketactions"

        if (!ticket.done) {
            const doneBtn = document.createElement("button")
            doneBtn.type = "button"
            doneBtn.className = "btndone"
            doneBtn.textContent = "Выполнить"
            doneBtn.addEventListener("click", function () {
                tickets[i].done = true
                renderTickets()
            })
            actions.append(doneBtn)
        }

        const deleteBtn = document.createElement("button")
        deleteBtn.type = "button"
        deleteBtn.className = "btndelete"
        deleteBtn.textContent = "Удалить"
        deleteBtn.addEventListener("click", function () {
            tickets.splice(i, 1)
            renderTickets()
        })
        actions.append(deleteBtn)

        li.append(info, actions)
        ticketsList.append(li)
    }

    if (shownCount === 0) {
        const nItem = document.createElement("li")
        if (Close.checked && !Open.checked) {
            nItem.textContent = "Выполненных заявок нет"
        } else if (Open.checked && !Close.checked) {
            nItem.textContent = "Открытых заявок нет"
        } else {
            nItem.textContent = "Нет заявок по выбранным фильтрам"
        }
        ticketsList.append(nItem)
    }

}

add.addEventListener('click', () => {
    const title = titleInput.value.trim()
    const room = roomInput.value.trim()
    const category = categoryS.value.trim()
    message.textContent = ""
    if (title === "" || room === "") {
        message.textContent = "Заполните все текстовые поля"
        return
    }
    if (category === "") {
        message.textContent = "Выберите категорию"
        return
    }
    const newTick = {
        title: title,
        room: room,
        category: category,
        done: false
    }
    tickets.push(newTick)
    titleInput.value = ""
    roomInput.value = ""
    categoryS.value = ""
    renderTickets()
})

Open.addEventListener("change", renderTickets)
Category.addEventListener("change", renderTickets)
Close.addEventListener("change", renderTickets)
renderTickets()