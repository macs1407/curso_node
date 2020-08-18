const argv = require('yargs')
                            .command('crear', 'Crear una tarea', {
                                descripcion:{
                                    demand:true,
                                    alias:'d',
                                    desc:'Descripcion de la tarea por crear'
                                }
                            })
                            .command('eliminar', 'Eliminar una tarea', {
                                descripcion:{
                                    demand:true,
                                    alias:'d',
                                    desc:'Descripcion de la tarea por eliminar'
                                }
                            })
                            .command('actualizar', 'actualizar un elemento', {
                                descripcion:{
                                    demand:true,
                                    alias:'d',
                                    desc:'Descripcion de la tarea por actualizar'
                                },
                                completado:{
                                    default:true,
                                    alias:'c',
                                    desc:'Descripcion de la tarea pendiente'
                                }
                            })
                            .help()
                            .argv;

module.exports = {
    argv
}
