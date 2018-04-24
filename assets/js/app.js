
 function App() {
     this.init();
 }
 App.prototype = {
     
     init: function() {
         this.addListeners();
         this.loadView({});
     },
     
     loadView: function(event, config) {
         var moduleName = $(event.currentTarget).attr('class') || event.module || 'home';
         var modules = ['home', 'departments', 'doctors', 'contact', 'hospitals-list','hospital-detail'];
         var paths = ['assets/views/home.html', 'assets/views/departments.html', 'assets/views/doctors.html',
         'assets/views/contact.html', 'assets/views/hospitals-list.html', 'assets/views/hospital-detail.html'];
         var path = paths[modules.indexOf(moduleName)];
         $('main').load(path, function(){
             switch(moduleName) {
                case 'home':
                     var homeView = new HomeView();
                     break;
                 case 'doctors':
                     var doctorsView = new DoctorsList();
                     break;
                 case 'departments':
                     break;
                 case 'contact':
                     break;
                 case 'hospital-detail':
                    var hospitalDetailView = new HospitalDetailView(config);
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
