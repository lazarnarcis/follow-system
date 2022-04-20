let divUsers = document.querySelector("#users");
let users = localStorage.getItem("users") || [];

function parseJSON (element) {
    const elementReturned = JSON.parse(element);
    return elementReturned;
}

users = parseJSON(users);

function generateNumber (min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

function generateUser (text, userLength) {
    let randomText = "";
    for (let i = 1; i <= userLength; i++) {
        randomText += text[generateNumber(0, text.length)];
    }
    return randomText;
} 

function generateUsers () {
    let usersLength = document.querySelector("#usersLength").value;
    if (usersLength == "" || usersLength < 1 || usersLength > 10) {
        alert("Unaccepted value!");
        return;
    }
    let abc = 'qwertyuiopasdfghjklzxcvbnm1234567890';

    for (let i = 1; i <= usersLength; i++) {
        let username = generateUser(abc, 8);
        let user = userSyntax(username);
        users = [user, ...users];
        localStorage.setItem("users", JSON.stringify(users));
        showUsers();
    }
}

function showUsers () {
    divUsers.innerHTML = "";
    for (let i = 0; i < users.length; i++) {
        let divUser = document.createElement('div');
        divUser.id = "user";
        divUsers.appendChild(divUser);
        
        let h1 = document.createElement("h1");
        h1.innerHTML = users[i].name;
        h1.id = "name";
        divUser.appendChild(h1);
        
        let divOptions = document.createElement("div");
        divOptions.id = "options";
        divUser.appendChild(divOptions);
        
        let buttonFollow = document.createElement("button");
        buttonFollow.id = "follow";
        let followText = null;
        if (users[i].follow) {
            followText = "Unfollow";
        } else {
            followText = "Follow";
        }
        buttonFollow.innerHTML = followText;

        buttonFollow.addEventListener("click", () => {
            setFollow(i);
            localStorage.setItem("users", JSON.stringify(users));
            showUsers();
        });
        divOptions.appendChild(buttonFollow);
        
        let buttonDelete = document.createElement("button");
        buttonDelete.id = "delete";
        buttonDelete.innerHTML = "Delete User";
        buttonDelete.addEventListener("click", () => {
            users.splice(users.indexOf(users[i]), 1);
            localStorage.setItem("users", JSON.stringify(users));
            showUsers();
        });
        divOptions.appendChild(buttonDelete);
    }
}

function setFollow(i) {
    if (users[i].follow) {
        users[i].follow = false;
    } else {
        users[i].follow = true;
    }
}

function addUser () {
    let input = document.querySelector("#username");
    let inputValue = input.value;

    if (inputValue == "") {
        alert("Please enter a username!");
    } else {
        let user = userSyntax(inputValue);
        users = [user, ...users];
        localStorage.setItem("users", JSON.stringify(users));
        showUsers();
        input.value = "";
    }
}

function userSyntax(inputValue) {
    return {
        name: inputValue,
        follow: false
    };
}

showUsers();