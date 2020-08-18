class Usuarios {
    constructor(){
        this.personas = [];
    }

    agregarPersona(id, nombre, sala){
        let persona = {id,nombre, sala}
        this.personas.push(persona);

        return this.personas;
    }

    obtenerPersonaPorId(id){
        let persona = this.personas.find(persona=>persona.id === id);
        return persona;
    }

    getPersonas(){
        return this.personas;
    }

    getPersonaPorSalas(sala){
        let personas = this.personas.filter(persona=>persona.sala === sala);
        return personas;
    }

    borrarPersona(id){
        let personaBorrada = this.obtenerPersonaPorId(id);
        this.personas = this.personas.filter(persona=>persona.id !== id);
        return personaBorrada;
    }

}

module.exports = {
    Usuarios
}