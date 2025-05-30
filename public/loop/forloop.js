const person = {
    name: "latha",
    age: 30,
}

// for(let key in person){
//     if(person.hasOwnProperty(key)) {

//         console.log(key, person[key]);
//     }
//     }


// const person = {
//         name: "latha",
//         age: 30,
//     }
//     for(let key in person){
//         console.log(key, person[key]);
//     }
//  console.log(Object.keys(person))
//  console.log(Object.values(person))
//  console.log(Object.entries(person))
//  console.dir(person)

const animal = {
    eats: true,
    walk() {
      console.log("Animal walks");
    }
  };
  
  // Create a new object that inherits from animal
  const dog = Object.create(animal);
  
  console.log(dog.eats); // true (inherited)
  dog.walk();            // "Animal walks"
  console.dir(dog)
  


