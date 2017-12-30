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



module.exports = function (id, options) {

    //prepare variables
    this.mqtt = require('mqtt');
    this.mqttbrooker;

    //configurable variables
    this.id = id;
    this.updateInterval = 10;
    this.subscribeTopic = '/default/subscribe/';
    this.publishTopic = '/default/publish/';

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
    }

    this.connect = function (host, options) {
        console.log("Connection to host:" + host + " with options " + options);
        this.mqttbrooker = this.mqtt.connect(host, options);

        this.mqttbrooker.on('connect', function () {
            console.log(this.id + ": connected to brooker");
            this.mqttbrooker.subscribe(this.subscribeTopic);
            this.mqttbrooker.publish(this.publishTopic, this.id + " : init message");
        }.bind(this));

        this.mqttbrooker.on('message', function (topic,message) {
            
        }.bind(this));

    };


};

