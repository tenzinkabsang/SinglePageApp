using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Data.EntityFramework;
using System.Web.Mvc;
using MySinglePageApp.Models;

namespace MySinglePageApp.Controllers
{
    public class DataServiceController : DbDataController<AppDbContext>
    {
        public IQueryable<Delivery> GetDeliveriesForToday()
        {
            return DbContext.Deliveries.Include("Customer").OrderBy(x => x.DeliveryId);
        }

        // Put your custom access control logic in these methods
        public void InsertDelivery(Delivery delivery)
        {
            InsertEntity(delivery);
        }
        public void UpdateDelivery(Delivery delivery)
        {
            UpdateEntity(delivery);
        }
        public void DeleteDelivery(Delivery delivery)
        {
            DeleteEntity(delivery);
        }
    }
}
