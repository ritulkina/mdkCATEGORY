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

const titleInput = document.getElementById("title")
const roomInput = document.getElementById("room")
const categorySelect = document.getElementById("category")
const add = document.getElementById("add")
const message = document.getElementById("message")

const Open = document.getElementById("Open")
const Category = document.getElementById("Category")
const ticketsList = document.getElementById("ticketsList")

function renderTickets() {
    ticketsList.innerHTML = ""

    if (tickets.length === 0) {
        const Item = document.createElement("li")
        Item.textContent = "Заявок пока нет"
        ticketsList.append(Item)
        return
    }

    let shownCount = 0;

    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i]
        if (Open.checked && ticket.done) {
            continue
        }

        if (Category.value !== "" && ticket.category !== Category.value) {
            continue
        }

        shownCount++

        const li = document.createElement("li")
        li.className = "ticket-item"

        const info = document.createElement("div")
        info.className = "ticket-info"

        const titleEl = document.createElement("strong")
        titleEl.textContent = ticket.title

        const detailsEl = document.createElement("span")
        detailsEl.textContent = `Где: ${ticket.room} Категория: ${ticket.category}`

        const actions = document.createElement("div")
        actions.className = "ticket-actions"
    }
