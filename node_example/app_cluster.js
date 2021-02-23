import cluster from "cluster";
import os from "os";


function startWorker() {
    let worker = cluster.fork();
    console.log("КЛАСТЕР: Исполнитель %d запущен", worker.id);
}
// Два режима выполнения
// cluster.isMaster - контекст основного приложения, при запуске `node app_cluster.js`
// cluster.isWorker - контекст кластерной системы Node, при запуске`cluster.fork`

if(cluster.isMaster){

    // Для каждого CPU в системе запустить worker
    os.cpus().forEach(function(){
        startWorker();
    });

    // Записываем в журнал всех отключившихся исполнителей;
    // Если исполнитель отключается, он должен затем
    // завершить работу, так что мы подождем
    // события завершения работы для порождения
    // нового исполнителя ему на замену

    cluster.on("disconnect", function(worker){
        console.log("КЛАСТЕР: Исполнитель %d отключился от кластера.", worker.id);
    });

    // В случае завершения работы исполнителя, мы создаем исполнителя ему на замену
    cluster.on("exit", function(worker, code, signal){
        console.log("КЛАСТЕР: Исполнитель %d завершил работу с кодом завершения %d (%s)", worker.id, code, signal);
        startWorker();
    });
    
}else{
    // cluster.isWorker
    // Запускаем наше приложение на исполнителе;
    let module = await import("./app.js");
    module.startServer();
}


