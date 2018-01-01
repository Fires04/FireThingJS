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

module.exports = function (id) {
    
    this.id = typeof id  !== 'undefined' ?  id  : '';

    this.cycle = function(){
        //here will be normal rutine for component
        return null;
    };

    this.getStatusObj = function(){
        var statusMessage = {
            'id' : this.id
        };
        return statusMessage;
    };

    this.setId = function(newId){
      this.id = newId; 
    };
    
};