/// <reference path="../_references.js" />

function DeliveriesViewModel() {
    // Private
    var self = this;
    var dataSourceOptions = {
        providerParameters: {
            url: "/api/DataService",
            operationName: "GetDeliveriesForToday"
        },
        entityType: "Delivery:#MySinglePageApp.Models",
        bufferChanges: true,
        mapping: Delivery
    };

    // Public Properties
    self.dataSource = new upshot.RemoteDataSource(dataSourceOptions).refresh();

    // source: fetch the underlying data from the dataSource
    // autoRefresh: anytime the underlying data changes, change the local data as well
    self.localDataSource = upshot.LocalDataSource({ source: self.dataSource, autoRefresh: true });


    self.deliveries = self.localDataSource.getEntities();
    self.deliveriesForCustomer = self.deliveries.groupBy("Customer");
    self.excludeDelivered = ko.observable(false);

    // Operations
    self.saveAll = function () { self.dataSource.commitChanges(); }
    self.revertAll = function () { self.dataSource.revertChanges(); }

    self.excludeDelivered.subscribe(function (shouldExcludeDelivered) {
        var filterRule = shouldExcludeDelivered
            ? { property: "IsDelivered", operation: "==", value: false }
            : null;
        self.localDataSource.setFilter(filterRule);
        self.localDataSource.refresh();
    });
}

//function Customer(data) {
//    var self = this;

//    self.CustomerId = ko.observable(data.CustomerId);
//    self.Name = ko.observable(data.Name);
//    self.Address = ko.observable(data.Address);
//    upshot.addEntityProperties(self, "Customer:#MySinglePageApp.Models");
//}

function Delivery(data) {
    var self = this;

    self.DeliveryId = ko.observable(data.DeliveryId);
    self.CustomerId = ko.observable(data.CustomerId);
    self.Customer = ko.observable(data.Customer);
    self.Description = ko.observable(data.Description);
    self.IsDelivered = ko.observable(data.IsDelivered);
    upshot.addEntityProperties(self, "Delivery:#MySinglePageApp.Models");
}

function MobileDeliveriesViewModel() {
    // Inherit from DeliveriesViewModel
    var self = this;
    DeliveriesViewModel(self);

    // Data
    self.nav = new NavHistory({
        params: { view: "deliveries" } // Will be able to switch between multiple
    });

    // Operations
    self.showDeliveries = function () { self.nav.navigate({ view: 'deliveries' }); }
    self.showCustomers = function () { self.nav.navigate({ view: 'customers' }); }

    self.nav.initialize({ linkToUrl: true });
    
}