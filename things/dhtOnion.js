/* 
 * Copyright 2017 David "Fires" Stein <info@davidstein.cz at http://davidstein.cz>.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

module.exports = function (id,pin,type) {
    
    this.id = typeof id  !== 'undefined' ?  id  : '';
    this.pin = typeof pin  !== 'undefined' ?  pin  : 20;
    this.type = typeof type  !== 'undefined' ?  type  : "DHT11"; 
    this.temperature = 0;
    this.humidity = 0;


    this.cycle = function(){
        try{
            const execSync = require('child_process').execSync;
            var code = execSync("/root/checkHumidity/bin/checkHumidity "+this.pin+" "+this.type+" || true");
            var data=code.toString().split(/\r?\n/);
            this.temperature = data[1];
            this.humidity = data[0];
        }catch(ex){
            throw ex;
        }
    };

    this.getStatusObj = function(){
        var statusMessage = {
            'id' : this.id,
            'temperature' : this.temperature,
            'humidity' : this.humidity
        };
        return statusMessage;
    };

};