import Common from '../common.js'

var userDb = [];
var globalIdCount = 0;

class User 
{
    constructor({name, email, password}) 
    {
        this.setName(name);
        this.setEmail(email);
        this.setPassword(password);
    }

    clone()
    {
        return Object.assign(new User(this), this);
    }

    prepareSerialize()
    {
        delete this.id;
        delete this.password;
    }

    setName(name) 
    {
        if (name.length < 2 || name.length > 50)
            throw new Error("Name should be >= 2 and <= 50");

        this.name = name;
    }

    setEmail(email) 
    {
        if (!checkEmailRegex(email))
            throw new Error("Invalid email " + email);

        this.email = email;
    }

    setPassword(password) 
    {
        if (password.length < 8 || password.length > 500000)
            throw new Error("Password should be >= 8 and <= 500000");

        this.password = password;
    }

    comparePassword(password) 
    {
        return this.password == password;
    }


    static dbCreate(name, email, password)
    {
        if (userDb.find(u => u.email == email))
            throw new Error("Email already registered");

        var entry = new User({name, email, password});
        entry.id = globalIdCount++;

        userDb.push(entry);
        return entry.clone();
    }

    static dbFetchByEmail(email)
    {
        return Common.arrayGet(userDb, u => u.email == email).clone();
    }

    static dbFetchById(id)
    {
        return Common.arrayGet(userDb, u => u.id == id).clone();
    }

    static dbDelete(id)
    {
        Common.arrayDelete(userDb, u => u.id == id);
    }

}
function checkEmailRegex(email) 
{ 
    const REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // voodoo magic ChatGPT provided
    return REGEX.test(email);
}

export default User;
