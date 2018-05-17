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
        $('.departments-list').on('click', '.delete-button', $.proxy(this.onDeleteButton, this));
    },
    onAddButton: function () {
        var record = $(".add-specialty").val();
        this.addDepartment(record);
    },
    addDepartment: function (record) {
        $.ajax({
            url: "http://localhost:3000/api/specialties/",
            type: 'POST',
            data: {
                name: record
            },
            success: $.proxy(this.onDepartmentSuccessfullyAdded, this),
            error: $.proxy(this.onDepartmentNotSuccessfullyAdded, this)
        });
    },
    onDepartmentSuccessfullyAdded: function () {
        alert('Specialitatea a fost introdusa cu succes');
        $('#addSpecialtyModal').modal('hide');
        //reloads departments list data from server
        this.grid.dataSource.read();
    },
    onDepartmentNotSuccessfullyAdded: function () {
        alert('Specialitatea nu a fost introdusa cu succes');
    },
    onDeleteButton: function (event) {
        if (confirm('Sunteti sigur ca vreti sa stergeti specialitatea?')) {
            var uid = $(event.currentTarget).closest('tr').data('uid');
            var record = this.grid.dataSource.getByUid(uid);
            //console.log(record);
            var id = record.id;
            this.removeDepartment(id);
        }
    },
    removeDepartment: function (id) {
        $.ajax({
            url: "http://localhost:3000/api/specialties/" + id,
            type: 'DELETE',
            success: $.proxy(this.onDepartmentSuccessfullyRemoved, this),
            error: $.proxy(this.onDepartmentNotSuccessfullyRemoved, this)
        });
    },
    onDepartmentSuccessfullyRemoved: function (result) {
        if (result && result.affectedRows > 0) {
            alert('Specialitatea a fost stearsa cu succes');
            this.grid.dataSource.read();
        } else {
            alert('The department cannot be removed');
        }
    },
    onDepartmentNotSuccessfullyRemoved: function (result) {
        alert('Specialitatea nu a putut fi stearsa cu succes');
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
                },
                {
                    title: "Actiuni",
                    template: '<button class="btn btn-primary delete-button">Sterge</button>'
                }
            ]
        }).data('kendoGrid');
    }
};