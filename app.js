let divUsers = document.querySelector("#users");

let users = [];

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
            if (users[i].follow) {
                users[i].follow = false;
            } else {
                users[i].follow = true;
            }
            showUsers();
        });
        divOptions.appendChild(buttonFollow);
        
        let buttonDelete = document.createElement("button");
        buttonDelete.id = "delete";
        buttonDelete.innerHTML = "Delete User";
        buttonDelete.addEventListener("click", () => {
            users.splice(users.indexOf(users[i]), 1);
            showUsers();
        });
        divOptions.appendChild(buttonDelete);
    }
}

function addUser () {
    let input = document.querySelector("#username");
    let inputValue = input.value;

    if (inputValue == "") {
        alert("Please enter a username!");
    } else {
        let user = {
            name: inputValue,
            follow: false
        };
        users = [user, ...users];
        showUsers();
        input.value = "";
    }
}