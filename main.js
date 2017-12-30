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

var fireThing = require('./firething');

var fireThingObj = new fireThing("fireplantbox", {
    updateInterval: 3000,
    subscribeTopic: '/firehouse/fireplantbox/commands/',
    publishTopic: '/firehouse/fireplantbox/status/',
});

fireThingObj.connect('mqtt://192.168.50.4');

function mainloop() {

    //LOOP
    setTimeout(mainloop, this.updateInterval);
}

// boot up the first call
mainloop();