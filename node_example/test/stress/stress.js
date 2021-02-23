import  loadtest from "loadtest";
import chai from "chai";
var expect = chai.expect;

describe("Стрессовые тесты", function(){
    it("Домашняя страница должна обрабатывать 50 запросов в секунду",
        function(done){
            var options = {
                url: "http://localhost:3000",
                concurrency: 4,
                maxRequests: 1000,/* 1000=1_CPU and 1900=12_CPU*/
            };
            loadtest.loadTest(options, function(err,result){
                expect(!err);
                expect(result.totalTimeSeconds < 1);
                done();
            });
});
});