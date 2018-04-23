function DoctorsList() {
    this.init();
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getBoolean(str) {
    if ("true".startsWith(str)) {
        return true;
    } else if ("false".startsWith(str)) {
        return false;
    } else {
        return null;
    }
}

DoctorsList.prototype = {
    init: function () {
        this.loadData();
    },
    attachListeners: function () {

    },
    loadData: function () {

        $('.doctors-list').kendoGrid({
            dataSource: {
                type: "json",
                transport: {
                    read: "http://localhost:3000/api/xjoin?_join=d.doctors,_j,s.specialties&_on1=(d.specialty_id,eq,s.id)&_fields=d.id,d.fullname,d.title,d.rating,d.doctor_rank,s.name,d.specialty_id"
                },
                schema: {
                    model: {
                        fields: {
                            d_id: {type: "number"},
                            d_fullname: {type: "string"},
                            d_doctor_rank: {type: "string"},
                            s_name: {type: "string"}
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
                    field: "d_id",
                    filterable: false
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
                    title: "specialitate"
                }
            ]
        });


        //https://docs.telerik.com/kendo-ui/knowledge-base/filter-all-columns-with-one-textbox
        $('#filter').on('input', function (e) {
            var grid = $('.doctors-list').data('kendoGrid');
            
            //direct filter doesn't work
//            grid.dataSource.filter('name', $(this).val());
            
            var columns = grid.columns;
            var filter = {logic: 'or', filters: []};
            columns.forEach(function (x) {
                if (x.field) {
                    var type = grid.dataSource.options.schema.model.fields[x.field].type;
                    if (type == 'string') {
                        filter.filters.push({
                            field: x.field,
                            operator: 'contains',
                            value: e.target.value
                        })
                    } else if (type == 'number') {
                        if (isNumeric(e.target.value)) {
                            filter.filters.push({
                                field: x.field,
                                operator: 'eq',
                                value: e.target.value
                            });
                        }

                    } else if (type == 'date') {
                        var data = grid.dataSource.data();
                        for (var i = 0; i < data.length; i++) {
                            var dateStr = kendo.format(x.format, data[i][x.field]);
                            // change to includes() if you wish to filter that way https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
                            if (dateStr.startsWith(e.target.value)) {
                                filter.filters.push({
                                    field: x.field,
                                    operator: 'eq',
                                    value: data[i][x.field]
                                })
                            }
                        }
                    } else if (type == 'boolean' && getBoolean(e.target.value) !== null) {
                        var bool = getBoolean(e.target.value);
                        filter.filters.push({
                            field: x.field,
                            operator: 'eq',
                            value: bool
                        });
                    }
                }
            });

            grid.dataSource.filter(filter);
        });


    }
};

