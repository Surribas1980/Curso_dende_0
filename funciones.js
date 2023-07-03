const path = require("path");
const {selectRows} = require("../Datos/listData")
const unPostExemploReqQueryFunction = function(req,res){
    const {parametroEnviado} = req.query;
    console.log('req.query: ',parametroEnviado)
    let hola = {
        saludo: 'hola'
    }
    console.log('entrando en enlace2.. ',req.body)
    //res.json(hola)
    res.send({
        status:"ok",
        data:{
            hola,
        }
    });
}
const unPostExemploReqBodyFunction = function(req,res){
    
    let hola = {
        saludo: 'hola'
    }
    console.log('entrando en enlace3.. ',req.body)
    //res.json(hola)
    res.send({
        status:"ok",
        data:{
            hola,
        }
    });
}

const unGetExemploFrecha = (req,res)=> {
		const hola = "boas é un texto dende o back";
    //res.json('hola desde res.json');
    res.send({
        status:"ok",
        data:{
            hola,
        }
    });
	//selectRows(req,res)
}
const FormGet = (req,res)=> {
		const hola = "boas FormGet";
    //res.json('hola desde res.json');
		console.log(req.body,req.query)
    /*res.send({
        status:"ok",
    });*/
		//res.redirect('/');
		
		const elfichero = 'envio.html';
		res.sendFile(elfichero,{root: path.join(__dirname,"../static")})
	//selectRows(req,res)
}

const unGetExemploFrechaWithNextIntroducindoDatoEnReq = (req,res,next)=>{
		const hola = "boas é un texto dende o back dende a primeira funcion";
		req.maisInfoParaEnviar = hola;
    //res.json('hola desde res.json');
    next()
    }

const unGetExemploRecollendoDatoDeReq = (req,res,next)=>{
		const hola = "boas é un texto dende o back";
		const infoInsertada = req.maisInfoParaEnviar;
	console.log('inserto para enviar : ', infoInsertada)
    //res.json('hola desde res.json');
    res.send({
        status:"ok",
        data:{
            hola,
						infoInsertada,
        }
    });
}
const messageServerOn = function () {
 console.log("Server running");
}

module.exports = {
	unPostExemploReqQueryFunction,
	unPostExemploReqBodyFunction,
	unGetExemploFrecha,
	unGetExemploFrechaWithNextIntroducindoDatoEnReq,
	unGetExemploRecollendoDatoDeReq,
	messageServerOn,
	FormGet,
}