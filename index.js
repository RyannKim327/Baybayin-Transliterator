// const baybay = {
// 	"A": 5888, "E": 5889, "O": 5890,
// 	"b": 5898, "k": 5891, "d": 5895,
// 	"g": 5892, "h": 5905, "l": 5902,
// 	"m": 5899, "n": 5896, "ng": 5893,
// 	"p": 5897, "s": 5904, "t": 5894,
// 	"w": 5903, "y": 5900,
// 	"e": 5906, "o": 5907, "a": 5908,
// 	".": 5942, ",": 5941
// }
// let toString = (code) => {
// 	return String.fromCharCode(code)
// }

// let toBaybayin = str => {
// 	str = str.toLowerCase().replace(/r/gi, "d").replace(/i/gi, "e").replace(/u/gi, "o").replace(/x|z/gi, "s").replace(/c|q/gi, "k").replace(/j/gi, "dy").replace(/f/gi, "p").replace(/v/gi, "b")
// 	let r = ""
// 	for(let c = 0; c < str.length; c++){
// 		if(c < str.length - 1){
// 			if(str.charAt(c) == 'a'){
// 				r += toString(baybay.A)
// 			}else if(str.charAt(c) == 'e'){
// 				r += toString(baybay.E)
// 			}else if(str.charAt(c) == 'o'){
// 				r += toString(baybay.O)
// 			}else if(str.charAt(c) == "n" && str.charAt(c + 1) == "g"){
// 				let d = str.charAt(c + 2)
// 				r += toString(baybay.ng)
// 				if(d == 'e' && d != 'a'){
// 					r += toString(baybay.e)
// 				}else if(d == 'o' && d != 'a'){
// 					r += toString(baybay.o)
// 				}else if(d != 'a'){
// 					r += toString(baybay.a)
// 					c--
// 				}
// 				c += 2
// 			}else if(baybay[str.charAt(c)] == undefined && str.charAt(c) != 'a'){
// 				r += str.charAt(c)
// 			}else{
// 				let d = str.charAt(c + 1)
// 				r += toString(baybay[str.charAt(c)])
// 				if(d == 'e' && d != 'a'){
// 					r += toString(baybay.e)
// 				}else if(d == 'o' && d != 'a'){
// 					r += toString(baybay.o)
// 				}else if(d != 'a'){
// 					r += toString(baybay.a)
// 					c--
// 				}
// 				c++
// 			}
// 		}else{
// 			if(str.charAt(c) == 'a'){
// 				r += toString(baybay.A)
// 			}else if(str.charAt(c) == 'e'){
// 				r += toString(baybay.E)
// 			}else if(str.charAt(c) == 'o'){
// 				r += toString(baybay.O)
// 			}else{
// 				r += toString(baybay[str.charAt(c)])
// 				const lists = [
// 					'b', 'k' ,'d', 'g', 'h',
// 					'l',' m', 'n', 'p', 's',
// 					't', 'w', 'y'
// 				]
// 				if(str.charAt(c).includes(lists)){
// 					r += toString(baybay.a)
// 				}
// 			}
// 		}
// 	}
// 	return r
// }

const baybayin = require("./process")

module.exports = (text) => {
	return baybayin(text)
}