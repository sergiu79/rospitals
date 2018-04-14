
 function App() {
     this.init();
 }
 App.prototype = {
     
     init: function() {
         this.addListeners();
         this.loadView({});
     },
     
     loadView: function(event) {
         var moduleName = $(event.currentTarget).attr('class') || event.module || 'home';
         var modules = ['home', 'departments', 'doctors', 'contact', 'hospitals-list'];
         var paths = ['assets/views/home.html', 'assets/views/departments.html', 'assets/views/doctors.html',
         'assets/views/contact.html', 'assets/views/hospitals-list.html'];
         var path = paths[modules.indexOf(moduleName)];
         $('main').load(path, function(){
             switch(moduleName) {
                case 'home':
                     var homeView = new HomeView();
                     break;
                 case 'doctors':
                     break;
                 case 'departments':
                     break;
                 case 'contact':
                     break;
                 case 'hospitals-list':
                     var hospitalsListView = new HospitalsListView();
                     break;
                     
             }
         });
     },
     
     addListeners: function() {
         var navEl = $('nav');
         navEl.on('click', '.home, .departments, .doctors, .contact', this.loadView);
     }
     
 };

// GLOBAL APP CONTROLLER
/*
let controller = (function(){

    let setupEventListeners = function(){

        $('#get-hospitals').on('click', function(){
            
            $.getJSON('assets/data/hospitals.json', function(data){
                let output = `<table class="table">`;
                output += `<thead class="thead-light">
                <tr>
                  <th>Hospital Name</th>
                  <th>City</th>
                  <th>County</th>
                  <th>Address</th>
                  <th>Contact</th>
                </tr>
                </thead>
                <tbody>`;
                $.each(data, function(key,value){
            
                    output += `<tr>`;
                    output += `<td>${value.name}</td>`;
                    output += `<td>${value.city.name}</td>`;
                    output += `<td>${value.county.name}</td>`;
                    output += `<td>${value.address}</td>`;
                    output += `<td>${value.phone} <br> <a href="${value.website}">Go to website</a></td>`;
                    output += `</tr>`;
            
                })
                output += `</tbody>`;
    
                $('.hospitals-list').html(output);
                
            });

        });
    
    };

    return {
        init: function(){
            setupEventListeners();
        }
    }
    

}());

controller.init();

*/

