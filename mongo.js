const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("give password as argument")
    process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://FSOpen:${password}@cluster0.5ze7j.mongodb.net/PhonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set("strictQuery", false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: String,
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length > 3) {
    const person = new Person({
        name: newName,
        number: newNumber,
    })

    person.save()
        .then(() => {
            console.log(`added ${person.name} number ${person.number} to phonebook`)
            mongoose.connection.close()
        })
        .catch(error => {
            console.error("Error adding person:", error.message);
            mongoose.connection.close(); 
        });
}

if (process.argv.length === 3) {
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}







