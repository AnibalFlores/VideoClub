/*
  VIDEO CLUB - API RESTFUL 
  ENDPOINTS
  GET /usuarios
  POST /usuario
  GET /peliculas
  GET /pelicula/:id
  POST /pelicula
  PUT /pelicula/:id
  DELETE /pelicula/:id
  DELETE /usuario/:id
  
*/
const PORT = 3000
var express = require('express'); // npm i -- express

// multer es el multipart parser para los bodies con contenidos mixtos
var multer = require('multer'); // npm i --save multer

// lodash es una libreria estatica para operar con arrays
// todo más facil con la operacion unionBy permite utilizar el campo id para los post y put
const _ = require('lodash'); // npm i --save lodash
// File System
const fs = require('fs');

var upload = multer();

var app = express();

// Mis arrays de datos para el video club directamente copy-paste del db.json
usuarios = [];
peliculas = [];

default_usuarios = [{
    "id": 1,
    "nombre": "Mr. Video",
    "apellido": "Club",
    "usuario": "admin",
    "clave": "admin",
    "telefono": 3434272715,
    "correo": "admin@admins.org.net",
    "estado": true
  },
  {
    "id": 2,
    "nombre": "José",
    "apellido": "Carreras",
    "usuario": "user",
    "correo": "asdsdgfr@dfsdf.net",
    "estado": true,
    "clave": "user",
    "telefono": 234235
  },
  {
    "id": 3,
    "estado": false,
    "nombre": "Jorge",
    "apellido": "Fuentes",
    "usuario": "jorge",
    "correo": "jfuentes@arnet",
    "clave": "jorge",
    "telefono": 4576893
  }
]

default_peliculas = [{
    "id": 1,
    "titulo": "Lethal Weapon",
    "descripcion": "De muchos tiros en la ciudad. Año 1987",
    "imagen": "https://i1.wp.com/movienetworkpr.com/wp-content/uploads/2018/02/Lethal-Weapon-5-Production-Start-Close-Cast-Returning.jpg?resize=759%2C500&ssl=1",
    "genero": "Acción",
    "alquilada": true,
    "valoracion": 8.5,
    "cantidadAlquileres": 4
  }, {
    "id": 2,
    "titulo": "Rambo First Blood",
    "descripcion": "De muchos tiros en el bosque",
    "imagen": "https://brobible.files.wordpress.com/2018/05/sylvester-stallone-story-outfit-first-blood.jpg?quality=90&w=650",
    "genero": "Acción",
    "alquilada": true,
    "valoracion": 8.5,
    "cantidadAlquileres": 3
  },
  {
    "id": 3,
    "titulo": "Die Hard",
    "descripcion": "De muchos tiros en un edificio. Con Bruce Willis y gran elenco. Año 1988",
    "imagen": "https://d18lkz4dllo6v2.cloudfront.net/cumulus_uploads/entry/19848/Die%20Hard%20illustrative.jpg?w=660",
    "genero": "Acción",
    "alquilada": true,
    "valoracion": 8.25,
    "cantidadAlquileres": 3
  },
  {
    "id": 4,
    "titulo": "Predator",
    "descripcion": "De muchos tiros en la selva tropical",
    "imagen": "https://amp.businessinsider.com/images/5ba1327964dce839008b5e4d-750-457.jpg",
    "genero": "Acción",
    "alquilada": true,
    "valoracion": 9,
    "cantidadAlquileres": 3
  },
  {
    "id": 5,
    "titulo": "The Godfather",
    "descripcion": "Una propuesta que no podras rehusar. Con Marlon Brando. Año 1972",
    "imagen": "https://image.oregonlive.com/home/olive-media/width620/img/trending/photo/2018/02/28/godfathercoverjpg-f44bb80afc024abb.jpg",
    "genero": "Drama",
    "alquilada": false,
    "valoracion": 9,
    "cantidadAlquileres": 1
  },
  {
    "id": 6,
    "titulo": "Ghostbusters",
    "descripcion": "Si tienes problemas de fantasmas llamalos",
    "imagen": "https://cdn1.thr.com/sites/default/files/imagecache/landscape_928x523/2014/06/77_Ghostbusters.jpg",
    "genero": "Comedia",
    "alquilada": false,
    "valoracion": 9.8,
    "cantidadAlquileres": 0
  },
  {
    "id": 7,
    "titulo": "Midnight Express",
    "descripcion": "Atrapado a la medianoche en Estambul",
    "imagen": "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/05/16/14/midnight-express.jpg?w968h681",
    "genero": "Drama",
    "alquilada": false,
    "valoracion": 10,
    "cantidadAlquileres": 0
  },
  {
    "id": 8,
    "titulo": "Highlander",
    "descripcion": "Solo puede haber uno",
    "imagen": "https://m.media-amazon.com/images/M/MV5BODM1NDRjMmEtOWIzNy00ZDVkLWIwZDAtYmJjNTNiODdmZThjXkEyXkFqcGdeQXVyNTAyNDQ2NjI@._V1_.jpg",
    "genero": "Ciencia Ficción",
    "alquilada": false,
    "valoracion": 10,
    "cantidadAlquileres": 0
  },
  {
    "id": 9,
    "titulo": "Alien",
    "descripcion": "El octavo pasajero.",
    "imagen": "https://ep01.epimg.net/cultura/imagenes/2017/05/04/actualidad/1493891411_921141_1494270220_noticia_normal.jpg",
    "genero": "Ciencia Ficcion",
    "alquilada": false,
    "valoracion": 10,
    "cantidadAlquileres": 0
  },
  {
    "id": 10,
    "titulo": "Deer Hunter",
    "descripcion": "Ruleta rusa en Vietnam.",
    "imagen": "https://criticsroundup.com/wp-content/uploads/2014/07/the-deer-hunter-still-526x295.jpg",
    "genero": "Drama",
    "alquilada": false,
    "valoracion": 10,
    "cantidadAlquileres": 0
  },
  {
    "id": 11,
    "titulo": "The Fly",
    "descripcion": "Entra en el telepod.",
    "imagen": "https://m.media-amazon.com/images/M/MV5BMDEzYTBmMTYtMWRmNi00YmE1LWIzNTItMjlhODVlYmI4OTYwXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_CR0,45,480,270_AL_UX477_CR0,0,477,268_AL_.jpggit",
    "genero": "Ciencia Ficción",
    "alquilada": false,
    "valoracion": 8,
    "cantidadAlquileres": 1
  },
  {
    "id": 12,
    "titulo": "Butterfly Effect",
    "descripcion": "Un pequeño cambio por aquí.",
    "imagen": "https://thesoulborrower.files.wordpress.com/2009/12/the_butterfly_effect_-_evan_age_7-0-0-0x0-360x234.jpeg",
    "genero": "Ciencia Ficción",
    "alquilada": true,
    "valoracion": 10,
    "cantidadAlquileres": 1
  },
  {
    "id": 13,
    "titulo": "Valhalla Rising",
    "descripcion": "Un vikingo se enfrenta a todos solito a los hachazos. Año 2009",
    "imagen": "https://m.media-amazon.com/images/M/MV5BMTg4NTE0NjEwMF5BMl5BanBnXkFtZTcwNTM0MTU1Mw@@._V1_.jpg",
    "genero": "Acción",
    "valoracion": 10,
    "cantidadAlquileres": 0
  },
  {
    "id": 14,
    "titulo": "Bohemian Rhapsody",
    "descripcion": "La historia de Freddie Mercury (2018)",
    "imagen": "https://m.media-amazon.com/images/M/MV5BZjEwODQ3ZDAtYzM4Zi00YWQxLThmZDEtNzhjNGJhMzFkNThjXkEyXkFqcGdeQXVyNjc0NzQzNTM@._V1_.jpg",
    "genero": "Drama",
    "valoracion": 10,
    "cantidadAlquileres": 0
  }
]

// Inicia los datos del server leyendo del db.json

fs.open('db.json', 'r', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('Archivo DB no existe');
      // No esta el db.json asignamos los datos iniciales por defecto
      peliculas = default_peliculas;
      usuarios = default_usuarios;
      //creamos el db.json file
      saveDatos();
      // y seguimos con el programa
      return;
    }
    // el archivo DB existe pero hubo problema al abrir tiro error
    throw err;
  }
  // ok chequeos cargamos la DB
  loadDatos();
});

function saveDatos() {
  var cadena = []
  cadena.push(usuarios);
  cadena.push(peliculas);
  const content = JSON.stringify(cadena);
  fs.writeFileSync("db.json", content, 'utf8');

  /*fs.write("db.json", content, 'utf8', function (err) {
    if (err) {
      console.log(err);
      return false;
    } else {
      console.log("Datos guardados!");
      return true;
    }
    
  });*/
}

// Esto me costo intentar con callback no me funciona

function loadDatos() {
  const content = fs.readFileSync("db.json", 'utf8'); // lee archivo
  res = JSON.parse(content)
  usuarios = res[0];
  peliculas = res[1];
  console.log('Datos cargados OK');
  // console.log(test_usuarios);
}

// A partir de la version 4.16 de Express ya no se usa el body-Parser importado 
// directamente express ya lo incluye asi que `npm i body-parser` no se hace
// y se ponen estas
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Todos mis handlers juntos a partir de aca

// Root
app.get('/', function (req, res) {
  res.send('Video Club Server version 1.0');
  // res.sendfile('index.html');
});

app.get('/loaddata', function (req, res) {
  var resul = loadDatos();
  // res.json(result);
  // res.json(test_usuarios);
  // res.json(test_peliculas);
  res.send('Datos Cargados con exito')

});

app.get('/savedata', function (req, res) {
  var resul = saveDatos();
  res.send('Datos Guardados con exito')
});

// GETs
app.get('/usuarios', function (req, res) {
  res.json(usuarios);
});

app.get('/peliculas', function (req, res) {
  res.json(peliculas);
});

app.get('/usuario/:id', function (req, res) {
  res.json(usuarios[req.params.id]);
});

app.get('/pelicula/:id', function (req, res) {
  res.json(peliculas[req.params.id]);
});

// DELETEs
app.delete('/pelicula/:id', function (req, res) {
  res.json(peliculas.slice(req.params.id, 1));
});

app.delete('/usuario/:id', function (req, res) {
  res.json(usuarios.slice(req.params.id, 1));
});

// POSTs
app.post('/usuario', upload.array(), function (req, res, next) {
  var userupdate = req.body.usuarios;
  usuarios = _.unionBy([userupdate], usuarios, 'id'); // si esta lo actualiza sino lo agrega
  res.send('<p>Usuario añadido</p>');
  // res.json(usuarios);
});

app.post('/pelicula', upload.array(), function (req, res, next) {
  var peliupdate = req.body.peliculas;
  peliculas = _.unionBy([peliupdate], peliculas, 'id'); // si esta lo actualiza sino lo agrega
  res.send('<p>Pelicula añadida</p>');
  // res.json(usuarios);
});

// PUTs
app.put('/usuario/:id', function (req, res) {
  var userupdate = req.body.usuarios;
  usuarios = _.unionBy([userupdate], usuarios, 'id');
  res.send('<p>Usuario actualizado</p>');

});

app.put('/pelicula/:id', function (req, res) {
  var peliupdate = req.body.peliculas;
  peliculas = _.unionBy([peliupdate], peliculas, 'id');
  res.send('<p>Pelicula actualizada</p>');

});

/* TODO On Server Close
server.close(function () {
  saveDatos();
  console.log('Servidor finalizado & Datos guardados, adios');
*/

// Server Start
var server = app.listen(PORT, function () {
  console.log(`Servidor corriendo en port ${PORT}:`);
});