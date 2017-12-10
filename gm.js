var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});

let font_ch = './font/NotoSansCJKtc-Medium.otf';
let font_en = './font/OCRAEXT.TTF';
const write=(pic_import,text,pic_export,position={x:50,y:50},font_size=56,font_language,processing=null)=>{
	let font = '';
	if(font_language == 'ch'){
		font = font_ch;
	}
	else if(font_language=='en'){
		font = font_en;
	}

		gm(pic_import)
		.font(font)
		.fill('#ffffff') 
		.fontSize(font_size)
		.drawText(position.x,position.y,text)
		.write(pic_export,(e)=>{
	//		console.log('write'+e);
			if (processing!=null){
				processing();
			}
		})
};

const append=(pic_import,append_pic,processing=null)=>{
//		console.log(pic_import);
		gm(pic_import)
		.append(append_pic)
		.write(pic_import,(e)=>{
//			console.log('append'+e);
			if(!e){
	//			console.log('done');
			}
			if(processing!=null){
				processing();
			}
		})
};
	


function result(title,hash,author,text,pic_export){
	let list = ['./img/botton.png','./img/center.png','./img/top.png'];

	const title_gen = ()=>{
		write('./img/top.png',title,pic_export,{x:125,y:80},56,'ch',()=>{
			write(pic_export,hash,pic_export,{x:55,y:120},24,'en',()=>{
				write(pic_export,'塊作者:'+author,pic_export,{x:800,y:80},48,'ch',()=>{
					post();
				});
			});
		});
	}
	title_gen();

	const post = ()=>{
		text = text.split("\n");
		for(let i=0;i<text.length;i++){
			let pic_post = pic_export+'_post' + i;
			if(i==text.length-1){
				write('./img/center.png',text[i],pic_post,{x:55,y:85},72,'ch',()=>{
					post_appned();
				});
			}
			else{
				write('./img/center.png',text[i],pic_post,{x:55,y:85},72,'ch');
			}
		}

		const post_appned=(i=0)=>{
			i++;
			let pic_post = pic_export+'_post' + i;
			if(i==text.length){
				append_all();
			}
			if(i<text.length){
				append(pic_export+'_post'+0,pic_post,()=>{
					post_appned(i);
					fs.unlink(pic_post,()=>{
						console.log('rm_file:'+pic_post);
					})

				})
			}
		}

	}

	const append_all  = ()=>{
		append(pic_export,pic_export+'_post0',()=>{
			append(pic_export,'./img/botton.png',()=>{
				fs.unlink(pic_export+'_post0',()=>{
					console.log('rm_file:'+pic_export+'_post0');
				})
			});
		})
	};
}

let title =  "測試測試";
let text = '因為你沒有朋友嘻嘻\n所以你自己想像有朋友\n神奇的第三行';
let author = '目達目達';
let hash = '0x42ed4caa6826f98cb90c7b4596e428dc2c9a00f5';
let pic_export ='./generate/0.png';

result(title,hash,author,text,pic_export);
