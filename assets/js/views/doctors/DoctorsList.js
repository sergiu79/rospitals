rospitals.views.doctors.DoctorsList = function () {
    this.init();
}

rospitals.views.doctors.DoctorsList.prototype = {
    init: function () {
        this.attachListeners();
        this.loadData();
    },

    attachListeners: function () {
        //https://docs.telerik.com/kendo-ui/knowledge-base/filter-all-columns-with-one-textbox
        $('#filter').on('input', $.proxy(this.onSearchInput, this));
    },
    onSearchInput: function (e) {
        // cacheing
        var keyword = $(e.currentTarget).val();
        var columns = this.grid.columns;
        var filter = {
            logic: 'or',
            filters: []
        };
        var dataSource = this.grid.dataSource;
        columns.forEach(function (x) {
            if (x.field) {
                var type = dataSource.options.schema.model.fields[x.field].type;
                if (type === 'string') {
                    filter.filters.push({
                        field: x.field,
                        operator: 'contains',
                        value: keyword
                    });
                } else if (type === 'number') {
                    if (rospitals.Utils.isNumeric(keyword)) {
                        filter.filters.push({
                            field: x.field,
                            operator: 'eq',
                            value: keyword
                        });
                    }
                } else if (type === 'date') {
                    var data = dataSource.data();
                    for (var i = 0; i < data.length; i++) {
                        var dateStr = kendo.format(x.format, data[i][x.field]);
                        // change to includes() if you wish to filter that way https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
                        if (dateStr.startsWith(keyword)) {
                            filter.filters.push({
                                field: x.field,
                                operator: 'eq',
                                value: data[i][x.field]
                            });
                        }
                    }
                } else if (type === 'boolean' && rospitals.Utils.getBoolean(keyword) !== null) {
                    var bool = getBoolean(keyword);
                    filter.filters.push({
                        field: x.field,
                        operator: 'eq',
                        value: bool
                    });
                }
            }
        });
        dataSource.filter(filter);
    },
    loadData: function () {
        this.grid = $('.doctors-list').kendoGrid({
            dataSource: {
                type: "json",
                transport: {
                    read: "http://localhost:3000/api/xjoin?_join=d.doctors,_j,s.specialties&_on1=(d.specialty_id,eq,s.id)&_fields=d.id,d.fullname,d.title,d.rating,d.doctor_rank,s.name,d.specialty_id"
                },
                schema: {
                    model: {
                        fields: {
                            d_id: {
                                type: "number"
                            },
                            d_fullname: {
                                type: "string"
                            },
                            d_doctor_rank: {
                                type: "string"
                            },
                            s_name: {
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
            navigatable: true,
            filterable: true,
            sortable: true,
            pageable: true,
            columns: [{
                    field: "d_id",
                    filterable: false,
                    hidden: true
                },
                {
                    field: "d_fullname",
                    title: "Nume",
                    width: 400
                },
                {
                    field: "d_doctor_rank",
                    title: "Tip"
                },
                {
                    field: "s_name",
                    title: "Specialitate"
                }
            ]
        }).data('kendoGrid');
    }
};