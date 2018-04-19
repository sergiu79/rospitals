function HospitalsListView() {
    this.init();
}

HospitalsListView.prototype = {
    init: function () {
        this.loadData();
    },
    attachListeners: function () {
        
    },
    loadData: function () {
       
            $('.hospitals-list').kendoGrid({
                dataSource: {
                    type: "json",
                    transport: {
                        read: "http://localhost:3000/api/hospitals"
                    },
                    schema: {
                        model: {
                            fields: {
                                id: { type: "number" },
                                name: { type: "string" },
                                county: { type: "string" },
                                city: { type: "string" },
                                type: {type: "string"}    
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
                        field:"id",
                        filterable: false
                    },
                    {
                        field: "name",
                        title: "Nume",
                        width: 400
                    }, 
                    {
                        field: "city",
                        title: "Oras",
                        width: 250
                    }, 
                    {
                        field: "county",
                        title: "Judet",
                        width: 200
                    },
                    {
                        field: "type",
                        title: "Tip"
                    }
                ]
            });

    }
};

