let fs = require("fs")

let example = {
		text:"Savolni kiritig iltomos!:  ",
		A:"A: ",
		B:"B: ",
		C:"C: ",
		D:"D: ",
		answer:"answer: "
	}


function *geneExample(){
	for (let i in example){
		yield [i,example[i]]
	}
}

const rl = require('readline')

				const readline = rl.createInterface({
					input: process.stdin,
					output: process.stdout,
				})

function WorkStage(){

	fs.readFile("./data/question_data.json","utf8",(error,data)=>{

	data = data  ? JSON.parse(data):[]


let generator = geneExample()

let ques = generator.next().value
readline.setPrompt(ques[1])
readline.prompt()

let obj = {}
readline.on('line', (ans) => {
	if (!ans){
		readline.setPrompt(ques[1])
		readline.prompt()
		return
	}
	obj[ques[0]]= ans
	ques = generator.next().value
	if(!ques) {
		data.push(obj)
		writeFiles(data)
		readline.close()
		return 

	}

	readline.setPrompt(ques[1])
	readline.prompt()
})
			


})



}

WorkStage()


function writeFiles(obj) {
	let fs = require("fs")
	fs.writeFile("./data/question_data.json",JSON.stringify(obj,null,4),()=>{})
}