let user = {
  name: 'Michael Jordan',
  team: 'Chicago Bulls',
  retired: true,
  age: 58
}

user.retired = false
user.championships = 6

delete user.team

const sayHi = () => {
  console.log("Hello World")
  return 100
}

let result = sayHi()

console.log(result)
