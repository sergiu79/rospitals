rospitals.views.departments.DepartmentsList = function departmentsList() {
    this.init();
};

rospitals.views.departments.DepartmentsList.prototype = {
    init: function () {
        this.attachListeners();
        this.loadData();
    },
    attachListeners: function () {
        $('.add-button').on('click', $.proxy(this.onAddButton, this));
    },
    
    onAddButton: function () {
        var record = $(".add-specialty").val();
        this.addDepartment(record);
     },
     
    addDepartment: function (record) {
        $.ajax({
            url: "http://localhost:3000/api/specialties/",
            type:'POST',
            data:{
                name: record
            },
            success: $.proxy(this.onDepartmentSuccessfullyAdded, this),
            error: $.proxy(this.onDepartmentNotSuccessfullyAdded, this)
        });
    },

    onDepartmentSuccessfullyAdded: function () {
        alert('Specialitatea a fost introdusa cu succes');
        //reloads departments list data from server
        this.grid.dataSource.read();
    },

    onDepartmentNotSuccessfullyAdded: function () {
        alert('Specialitatea NU a fost introdusa cu succes');
    },

    loadData: function () {

        this.grid = $('.departments-list').kendoGrid({
            dataSource: {
                dataType: "json",
                transport: {
                    read: "http://localhost:3000/api/specialties?_size=99"
                },
                schema: {
                    model: {
                        fields: {
                            id: {
                                type: "number"
                            },
                            name: {
                                type: "string"
                            }
                        }
                    }
                },
                pageSize: 20,
                serverPaging: false,
                serverFiltering: false,
                serverSorting: false
            },
            height: 550,
            filterable: true,
            sortable: true,
            pageable: true,
            columns: [{
                    field: "id",
                    width: 50,
                    filterable: false,
                    hidden: true
                },
                {
                    field: "name",
                    title: "Nume",
                    width: 400
                }
            ]
        }).data('kendoGrid');
    }
};