const tasks = document.querySelectorAll('.task')
const inputs = document.querySelectorAll('input')
const ticks = document.querySelectorAll('.tick')
const progressBar = document.querySelector('.progress-bar')
const progressText = document.querySelector('.progress-text')
const checkText = document.querySelector('.check-text')
const upperText = document.querySelector('.upper-text')
const motivationText = document.querySelector('.motivation-text')

let myInputs = JSON.parse(localStorage.getItem('myInputs')) || {}
let checkUpdates = JSON.parse(localStorage.getItem('checkUpdates')) || {}

inputs.forEach((input, index) => {
    if (myInputs[`task${index}`] !== undefined) {
        input.value = myInputs[`task${index}`]
    }
})


inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        myInputs[`task${index}`] = e.target.value
        localStorage.setItem('myInputs', JSON.stringify(myInputs))
    })
})


ticks.forEach(tick => {
    const img = tick.querySelector('img')
    tick.addEventListener('click', e => {
        const allFieldsFilled = [...inputs].every((input) => {
            return input.value
        })

        if (allFieldsFilled) {
            checkText.classList.add('hidden')
            img.classList.toggle('hidden')
            tick.classList.toggle('bg-green')
            tick.nextElementSibling.classList.toggle('line-through')
        } else {
            checkText.classList.remove('hidden')
        }

        updateProgress()
        checkTick()
    })
})


inputs.forEach((input) => {
    input.addEventListener('focus', () => {
        checkText.classList.add('hidden')
    })
})


function updateProgress() {
    let count = 0
    ticks.forEach(tick => {
        const img = tick.querySelector('img')
        if (img.classList.contains('hidden') == false) {
            count++
        }
        progressText.innerHTML = `${count}/3 complete`
        progressBar.style.width = `calc(100% * ${count} / 3)`
    })

    if (count == 2) {
        upperText.innerText = 'Just a step away, keep going!'
        motivationText.innerText = `“Keep Going, You’re making great progress!”`
    }

}

updateProgress()



function checkTick() {
    ticks.forEach((tick, index) => {
        const img = tick.querySelector('img')

        if (img.classList.contains('hidden')) {
            checkUpdates[`inputCheck${index}`] = true
            localStorage.setItem('checkUpdates', JSON.stringify(checkUpdates))
        } else {
            checkUpdates[`inputCheck${index}`] = false
            localStorage.setItem('checkUpdates', JSON.stringify(checkUpdates))
        }

    })

}


ticks.forEach((tick, index) => {
    const img = tick.querySelector('img')
    if (checkUpdates[`inputCheck${index}`] == false) {
        img.classList.remove('hidden')
        tick.classList.add('bg-green')
        tick.nextElementSibling.classList.add('line-through')
    }
    else if (checkUpdates[`inputCheck${index}`] == true) {
        img.classList.add('hidden')
        tick.classList.remove('bg-green')
        tick.nextElementSibling.classList.remove('line-through')
    }
    updateProgress()

})
