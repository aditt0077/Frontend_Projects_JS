// logic to delete row from the table
const deletePasswords = (website) => {
    let data = localStorage.getItem('passwords')
    let arr = JSON.parse(data)
    arrUpdated = arr.filter((e) => {
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))
    alert('deleted Success')
    showPasswords()
}

//logic to copy text from the table rows 
async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        document.querySelector('#alert').style.display = 'inline'
        setTimeout(() => {
            document.querySelector('#alert').style.display = 'none'
        }, 2000);
    } catch (error) {
        console.error(error.message);
    }
}

// Password masking
function maskPassword(pass) {
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str += '*'
    }
    return str;
}

// logic to fill the table
const showPasswords = () => {
    let tb = document.querySelector('table')
    tb.innerHTML = ` <tr>
    <th>Website</th>
    <th>Username</th>
    <th>Password</th>
    <th>Delete</th>
    </tr>`
    let data = localStorage.getItem('passwords')

    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No data to show"
    }
    else {
        let arr = JSON.parse(data)
        let str = ""
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index]
            str += `
        <tr>
        <td>${element.website}<img onclick='copyText("${element.website}")' src="copy.svg" alt=""></td>
        <td>${element.username}<img onclick='copyText("${element.username}")' src="copy.svg" alt=""></td>
        <td>${maskPassword(element.password)}<img onclick='copyText("${element.password}")' src="copy.svg" alt=""></td>
        <td><button class="btnsm" onclick="deletePasswords('${element.website}')">Delete</button></td>
        </tr>
        `
        }
        tb.innerHTML = tb.innerHTML + str
    }
    website.value = ''
    username.value = ''
    password.value = ''
}


console.log('working');

showPasswords()
document.querySelector('.btn').addEventListener('click', (e) => {
    e.preventDefault()

    let passwords = localStorage.getItem('passwords')

    if (passwords == null) {
        let json = []
        json.push({ website: website.value, username: username.value, password: password.value })
        alert('saved')
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    else {
        let json = JSON.parse(localStorage.getItem('passwords'))
        json.push({ website: website.value, username: username.value, password: password.value })
        alert('saved')
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    showPasswords()
})



