var result = require('./gm.js');
let json_test ={
	"title":"測試測試dasdasdasdsadasdadqewrfewrewrewrew",
	"text":'因為你沒有朋友嘻嘻\n所以你自己想像有朋友\n\n神奇的第三行ㄆㄆㄆㄏㄏㄏㄏ\ndasdasda\n\nlol',
	"author":'Gdasdasdas',
	'hash':'0x42ed4caa6826f98cb90c7b4596e428dc2c9a00f5',
	'pic_export':'./output/1.png'
}

const callback = ()=>{
	console.log('callback back');
}
result(json_test,callback);

