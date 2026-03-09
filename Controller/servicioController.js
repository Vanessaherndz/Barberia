const Servicio = require('../Model/servicio');

function create(req, res){
    const servicio = new Servicio({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        duracion: req.body.duracion
    });

    servicio.save()
        .then(() => res.redirect('/servicios'))
        .catch(err => res.status(500).send({err}));
}

function show(req,res){

    Servicio.find({})
    .then(servicios=>{
        res.json(servicios)
    })
}


function update(req, res){
    const id = req.body.id_editar;

    Servicio.findByIdAndUpdate(id, {
        nombre: req.body.nombre_editar,
        descripcion: req.body.descripcion_editar,
        precio: req.body.precio_editar,
        duracion: req.body.duracion_editar
    })
    .then(() => res.redirect('/servicios'))
    .catch(err => res.status(500).send({err}));
}

function deleted(req, res){
    const id = req.params.id;

    Servicio.findByIdAndDelete(id)
        .then(() => res.redirect('/servicios'))
        .catch(err => res.status(500).send({err}));
}

module.exports = {
    create,
    show,
    update,
    deleted
};
