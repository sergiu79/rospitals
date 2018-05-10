rospitals.views.departments.DepartmentsList = function departmentsList() {
  this.init();
}

rospitals.views.departments.DepartmentsList.prototype = {
  init: function () {
    this.loadData();
  },
  attachListeners: function () {

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