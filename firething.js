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


module.exports = function (id, options) {

    //prepare variables
    this.mqtt = require('mqtt');
    this.mqttbrooker;
    this.iotTypes = new Array();

    //configurable variables
    this.id = id;
    this.updateInterval = 10;
    this.subscribeTopic = '/default/subscribe/';
    this.publishTopic = '/default/publish/';
    this.publishErrorTopic = '/default/error/';

    //process options
    if (options !== undefined) {
        if (options.updateInterval !== undefined) {
            this.updateInterval = options.updateInterval;
        }
        if (options.subscribeTopic !== undefined) {
            this.subscribeTopic = options.subscribeTopic;
        }
        if (options.publishTopic !== undefined) {
            this.publishTopic = options.publishTopic;
        }
        if (options.publishErrorTopic !== undefined) {
            this.publishErrorTopic = options.publishErrorTopic;
        }
    }

    this.connect = function (host, options) {
        console.log("Connecting to host:" + host + " with options " + options);
        this.mqttbrooker = this.mqtt.connect(host, options);

        this.mqttbrooker.on('connect', function () {
            console.log(this.id + ": connected to brooker");
            this.mqttbrooker.subscribe(this.subscribeTopic);
            this.publishMessage('init');
        }.bind(this));

        this.mqttbrooker.on('message', function (topic, message) {
            try {
                var command = JSON.parse(message);
                if (command.command === 'call') {
                    //todo add exceptions
                    this.publishMessage(this[command.commandData]());
                } else if (command.command === 'subCall') {
                    let parsedData = command.commandData.split(':');
                    var subIot = this.findIot(parsedData[0]);
                    this.publishMessage(subIot[parsedData[1]](command.commandParam));
                }
            } catch (ex) {
                this.publishErrorMessage(ex.message);
            }
        }.bind(this));

        this.cycle();
    };

    this.cycle = function () {
        this.publishMessage(this.cycleTypes());
        setTimeout(this.cycle, this.updateInterval);
    }.bind(this);

    this.cycleTypes = function () {
        var statusObj = new Array();
        for (let i = 0; i < this.iotTypes.length; i++) {
            try{
                this.iotTypes[i].cycle();
            }catch(ex){
                this.publishErrorMessage(ex.message);
            }
            try{
                statusObj.push(this.iotTypes[i].getStatusObj());
            }catch(ex){
                this.publishErrorMessage(ex.message);
            }
        }
        return statusObj;
    };

    this.addIotType = function (iotType) {
        this.iotTypes.push(iotType);
    };

    this.publishMessage = function (message,error) {
        var errorMsg = typeof error  !== 'undefined' ?  error  : false;
        var dataToSend = {
            "id": this.id,
            "timestamp": Date.now(),
            "message": message
        };
        if (errorMsg) {
            this.mqttbrooker.publish(this.publishErrorTopic, JSON.stringify(dataToSend));
        } else {
            this.mqttbrooker.publish(this.publishTopic, JSON.stringify(dataToSend));
    }
    }.bind(this);

    this.publishErrorMessage = function (message) {
        console.log(message);
        this.publishMessage(message,true);
    }.bind(this);

    this.report = function () {
        this.publishMessage("Report in !");
    };

    this.findIot = function (id) {
        for (let i = 0; i < this.iotTypes.length - 1; i++) {
            if (this.iotTypes[i].id === id)
                return this.iotTypes[i];
        }
        return null;
    };

};

