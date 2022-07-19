const notyf = new Notyf({
    duration: 10000,
    position: {
        x: 'left',
        y: 'top',
    },
    dismissible: true,
    ripple: false,
    types: [
        {
            type: 'info',
            background: 'rgba(65, 105, 225)',
        },
    ]
});

let inRandomProgress = false

let question = [
    {
        "content": "ถ้าคุณรวยแบบนายอีลอน มักส์ คุณจะใช้เงินนั้นทำอะไรบ้าง"
    },
    {
        "content": "คุณคิดยังไงกับชายคนนี้"
    },
    {
        "content": "ถ้าคุณประสบความสำเร็จแบบนายอีลอน มักส์ คุณจะทำอะไรบ้างในชีวิตของคุณ"
    },
    {
        "content": "คุณอยากทำงานบริษัทในเครือของอีลอนไหม เพราะเหตุใด"
    },
    {
        "content": ""
    },
    {
        "content": ""
    },
    {
        "content": ""
    },
    {
        "content": ""
    },
    {
        "content": ""
    },
    {
        "content": ""
    },
]

var luckyCardInner = document.querySelectorAll(".lucky-card-inner")
var luckyCardContent = document.querySelectorAll(".lucky-card-content")
var luckyCardItem = document.querySelector(".lucky-card-item")
var luckyNumber = document.querySelectorAll(".lucky-number")
var luckyCard = document.querySelector(".lucky-card")

var questionScriptItem = document.querySelector(".question-script-item")
var questionScript = document.querySelector(".question-script")

var contentItem = document.querySelector(".content-item")

var navigateToCard = document.getElementById("navigate-to-card")
var navigateToScript = document.getElementById("q-script")

var modal = document.querySelector(".modal")
var modalItem = document.querySelector(".modal-item")
var closeModalBtn = document.querySelector(".close-modal-btn")

var randomNumber = document.querySelector(".random-number")
var number = document.getElementById("number")

const endCredit = document.querySelector(".end-credits")
const endCreditsID = document.getElementById("end-credits")

endCreditsID.stop()

luckyNumber.forEach((number, index) => number.innerHTML = `<span class="index" data-number="${index + 1}">${index + 1}</span>`)

luckyCardInner.forEach((card, index) => {
    card.addEventListener("click", (e) => {
        const x = [...luckyCardInner].filter((value) => {
            return value.classList.contains("flip")
        })
        
        if (card.classList.contains("flip")) return card.classList.remove("flip")
        card.classList.add("flip")
        
        if (x.length === 9) {
            notyf.open({
                type: "info",
                message: "การ์ดหมดแล้วในอีก 2 นาทีจะนำคุณไปสู่หน้า End Credits"
            })
            navigateToEndCredits()
        }
    })
})

for (let i = 0; i < question.length; i++) {
    luckyCardContent[i].innerHTML = `<span>${question[i].content}</span>`
    questionScriptItem.innerHTML += `<div class="script-item">
    <span class="index">${i + 1}.</span>
    <span>${question[i].content}</span>
</div>`
}

function hiddenAttribute(element, action) {
    if (action == true) return element.setAttribute("hidden", "")
    element.removeAttribute("hidden")
}

function randomNumberElement(value) {
    inRandomProgress = true
    let numbers = parseInt(number.innerText)
    randomNumber.innerHTML = `<span class="progress">กำลังทำการสุ่มตัวเลข ...<span>`
    const randomInterval = setInterval(() => {
        numbers = Math.floor((Math.random() * value) + 1)
    }, 15);

    setTimeout(() => {
        inRandomProgress = false
        clearInterval(randomInterval)
        randomNumber.innerHTML = `<h1 class="number" id="number">${numbers}</h1>`
    }, 2000);
}

function navigateToEndCredits() {
    setTimeout(() => {
        hiddenAttribute(luckyCard, true)
        hiddenAttribute(endCredit, false)
        endCreditsID.start()
    }, 120000);
}

navigateToScript.onclick = () => {
    hiddenAttribute(contentItem, true)
    hiddenAttribute(questionScript, false)
}

navigateToCard.onclick = () => {
    AOS.init({
        startEvent: "click"
    });
    hiddenAttribute(contentItem, true)
    hiddenAttribute(luckyCard, false)
}

const setup = () => {
    hiddenAttribute(luckyCard, true)
    hiddenAttribute(questionScript, true)
    hiddenAttribute(contentItem, false)
    hiddenAttribute(modal, true)
    hiddenAttribute(endCredit, true)
}

closeModalBtn.onclick = () => {
    return hiddenAttribute(modal, true)
}

randomNumber.onclick = () => {
    if (!inRandomProgress) return randomNumberElement(41)
}

window.addEventListener("keydown", (e) => {
    if (e.metaKey && e.shiftKey && e.key == "x") {
        return hiddenAttribute(modal, false)
    }

    else if (e.ctrlKey && e.shiftKey && e.key == "X") {
        return hiddenAttribute(modal, false)
    }

    else if (!modal.getAttribute("hidden")) {
        if (e.key == "Enter") {
            if (!inRandomProgress) return randomNumberElement(41)
        }
        else if (e.key == "Escape") return hiddenAttribute(modal, true)
    }
})

setup()