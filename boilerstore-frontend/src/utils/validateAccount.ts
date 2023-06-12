const accounts = [{name: "Jorge", email: "jorge@mail.com", password:"123"}, 
                      {name: "Ademir", email: "admin@mail.com", password:"admin"}]

export function validateAccount({task = "", name = "", email = "", password = ""}) {
    if (task == "login") {
        for (let account of accounts)
            // More secure algorythm will be used in later implementations
            if ((account.name === name || account.email === name) && account.password === password)
                return true

        return false;
    }

    else if (task == "signup") {
        for (let account of accounts)
            // More secure algorythm will be used in later implementations
            if (account.name === name || account.email === email)
                return false

        return true;
    }

    else if (task == "recovery") {
        for (let account of accounts)
            // More secure algorythm will be used in later implementations
            if (account.email === email)
                return true

        return false;
    }

    else 
        return false;
}