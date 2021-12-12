using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MaintenanceApp.Web.ViewModels
{
    public class UpdateTicketViewModel
    {
        public int Id { get; set; }
        public string Issue { get; set; }
        public string RoomLocation { get; set; }
        public int LocationId { get; set; }
    }
}
