rospitals.App = function () {
    this.init();
}
rospitals.App.prototype = {

    init: function () {
        this.addListeners();
        this.loadView({});
        this.checkLoginState();
    },
    
    checkLoginState() {
      if (localStorage.getItem('isLoggedIn')) {
          // Hide login form
            $('#login-form').addClass('hide');
            // show Welcome admin
           $('#user-profile').find('span').text('Welcome ' + JSON.parse(localStorage.getItem('username')).first);
            $('#user-profile').removeClass('hide');
      } else {
           $('#login-form').removeClass('hide');
      }
    },
        
    loadView: function (event, config) {
        var moduleName = $(event.currentTarget).attr('class') || event.module || 'home';
        var modules = ['home', 'departments', 'doctors', 'contact', 'hospitals-list', 'hospital-detail'];
        var paths = ['assets/views/home.html', 'assets/views/departments.html', 'assets/views/doctors.html',
            'assets/views/contact.html', 'assets/views/hospitals-list.html', 'assets/views/hospital-detail.html'];
        var path = paths[modules.indexOf(moduleName)];
        $('main').load(path, function () {
            switch (moduleName) {
                case 'home':
                    var homeView = new rospitals.views.hospitals.HomeView();
                    break;
                case 'doctors':
                    var doctorsView = new rospitals.views.doctors.DoctorsList();
                    break;
               case 'departments':
                    var departmentsList = new rospitals.views.departments.DepartmentsList();
                    break;
                case 'contact':
                    break;
                case 'hospital-detail':
                    var hospitalDetailView = new rospitals.views.hospitals.HospitalDetailView(config);
                case 'hospitals-list':
                    var hospitalsListView = new rospitals.views.hospitals.HospitalsListView();
                    break;

            }
        });
    },

    doLogin: function (event) {
        event.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();
        if (email === 'admin@rospitals.ro' && password === 'password') {
            // store login state in localstorage
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('isAdmin', true);
            localStorage.setItem('email', 'admin@rospitals.ro');
            localStorage.setItem('username', JSON.stringify({first:'Administrator', last:''}));
            $.cookie('isLoggedIn', true, { expires: 7, path: '/' });
            // Hide login form
            $('#login-form').addClass('hide');

            // show Welcome admin
            $('#user-profile').find('span').text('Welcome ' + JSON.parse(localStorage.getItem('username')).first);
            $('#user-profile').removeClass('hide');
        } else {
            // show bootstrap notification - invalid credentials
        }

    },

    doLogout: function (event) {
        event.preventDefault();
        localStorage.removeItem('username');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('email');
         $.removeCookie('isLoggedIn');
        // hide Welcome admin
        $('#user-profile').addClass('hide');
        $('#user-profile').find('span').empty();
        // show login
        $('#login-form').find('form')[0].reset();
        $('#login-form').removeClass('hide');
    },

    addListeners: function () {
        var navEl = $('nav');
        navEl.on('click', '.home, .departments, .doctors, .contact', this.loadView);
        $('#login').on('click', this.doLogin);
        $('#logout').on('click', this.doLogout);
    }

};