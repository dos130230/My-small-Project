let fs = require("fs")



function RendomArray(n) {
	let arr = []
	let store = []
	let i =0
	let sum =0
	for(let k=0;k<n;k++){
		arr.push(k)
	}

	while (sum!=arr.length){
		i= Math.random()*arr.length
		if(!store.includes(i|0)){
			store.push(i|0)
			sum++
		}

	}
	return store
}

function * generator(data){
	let arr = RendomArray(data.length)
	for (let i in arr){
		yield [data[arr[i]],+i+1]	}
}




if(!fs.readFileSync("./data/question_data.json","utf8"))  return console.log("Hali malumot yo'q!")

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function analizName(argument) {
	rl.question("Ismingizni kiriting: ",(answer)=>{
		if(!answer) analizName()
		else {
			rl.setPrompt("Qani testni boshladik!!!!!!!!")
			rl.prompt()
			RenderQuestion(answer)

		}
	})
}

analizName()



function RenderQuestion(answer) {
	let sum = 0
	fs.readFile("./data/question_data.json","utf8",(error,data)=>{
		if(data) {
			data = JSON.parse(data)
			let gen = generator(data)
			let ques = gen.next().value

			console.log(`
${ques[1]}) ${ques[0].text}

A: ${ques[0].A}
B: ${ques[0].B}
C: ${ques[0].C}
D: ${ques[0].D}
`)

let jav = ["A","B","C","D",]
rl.setPrompt("javob: ")
				rl.prompt()
			rl.on('line', (s) => {

				if(!jav.includes(s)) {
						rl.setPrompt("javob: ")
						rl.prompt()
						return
				}
				if(ques &&ques[0].answer==s) sum++
						ques = gen.next().value
				if(!ques) {
					rl.close()
					console.table([{
													"name":answer,
													"tureAnswer":sum,
													"falseAnswer":data.length-sum,
													"allTests":data.length
												}
						])
					WriteUser_data(answer,sum,data.length)
					return
				}
				else{

			console.log(`
${ques[1]}) ${ques[0].text}

A: ${ques[0].A}
B: ${ques[0].B}
C: ${ques[0].C}
D: ${ques[0].D}
`)

rl.setPrompt("javob: ")
				rl.prompt()

				}
				
			})




		}


		else console.log(error)
	})


}

function WriteUser_data(answer,sum,length) {
	let fs = require("fs")
	fs.readFile("./data/users_data.json","utf8",(error,data)=>{
		data = data?JSON.parse(data): []
		let obj = {
			"name":answer,
			"tureAnswer":sum,
			"falseAnswer":length-sum,
			"allTests":length
		}
		data.push(obj)

		fs.writeFile("./data/users_data.json",JSON.stringify(data,null,4),()=>{})

	})
}











