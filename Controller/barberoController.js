const Barbero = require('../Model/barbero');

// CREATE
function create(req, res){
    const barbero = new Barbero({
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        especialidad: req.body.especialidad
    });

    barbero.save()
        .then(() => res.redirect('/barberos'))
        .catch(err => res.status(500).send({err}));
}


// READ
function show(req,res){

    Barbero.find({})
    .then(barberos=>{
        res.json(barberos)
    })
}


// UPDATE
function update(req, res){
    const id = req.body.id_editar;

    Barbero.findByIdAndUpdate(id, {
        nombre: req.body.nombre_editar,
        especialidad: req.body.especialidad_editar
    })
    .then(() => res.redirect('/barberos'))
    .catch(err => res.status(500).send({err}));
}

// DELETE
function deleted(req, res){
    const id = req.params.id;

    Barbero.findByIdAndDelete(id)
        .then(() => res.redirect('/barberos'))
        .catch(err => res.status(500).send({err}));
}

module.exports = {
    create,
    show,
    update,
    deleted
};
