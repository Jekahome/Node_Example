import chai from "chai";
import {fortune} from "./../_mod.js";
const assert = chai.assert;

describe("Fortune", function() {
    before(function() {
        // ...
    });

    describe("#getFortune()", function() {
        context("",function(){

            it("should return any string", function() {
                let str = fortune.getFortune();
                assert.isString(str, "not string");
            });
        });

    });
});